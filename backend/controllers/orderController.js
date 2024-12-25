import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import fetch from "node-fetch"; // Import fetch for API requests
import Stripe from "stripe"; // Ensure you have configured Stripe
const stripeInstance = Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Validate input data
    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Prepare line items for Stripe Checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: "ETB", // Replace with your currency
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a line item
    line_items.push({
      price_data: {
        currency: "ETB", // Replace with your currency
        product_data: {
          name: "Delivery fee",
        },
        unit_amount: 500, // Example delivery fee in cents
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await orderModel.findByIdAndUpdate;
      userId, { cartData: {} };
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Order with Chapa (existing)
const placeOrderChapa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Chapa",
      payment: false,
      date: Date.now(),
    };

    // Save the order in the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const origin = req.headers.origin;

    // Prepare headers and body for Chapa API
    const myHeaders = {
      Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      amount,
      currency: "ETB",
      email: req.body.email, // Pass user's email for payment
      first_name: req.body.firstName, // User's first name
      last_name: req.body.lastName, // User's last name
      phone_number: req.body.phoneNumber, // User's phone number
      tx_ref: `chewatatest-${Date.now()}`,
      callback_url: `${origin}/api/chapa/callback`,
      return_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      "customization[title]": "User Order Payment",
      "customization[description]": "Payment for items purchased",
    });

    const response = await fetch(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        method: "POST",
        headers: myHeaders,
        body,
      }
    );

    const data = await response.json();
    console.log("Chapa API Response:", data); // Log the full response

    if (response.ok) {
      res.status(200).json({
        success: true,
        message: "Payment Initialized",
        data: data, // Send the Chapa response to the frontend
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Payment initialization failed",
        data,
      });
    }
  } catch (error) {
    console.log("Chapa Payment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// For admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderChapa,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderStripe,
  verifyStripe,
};
