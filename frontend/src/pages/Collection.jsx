import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const categoryToSubCategoryMapping = {
    "NATIONAL TEAMS": [
      "Argentina",
      "Brazil",
      "England",
      "France",
      "Portugal",
      "Spain",
    ],
    "PRIMER LEAGUE": [
      "Arsenal",
      "Manchester City",
      "Tottenham Hotspur",
      "Manchester United",
    ],
    "LA LIGA": ["Barcelona", "Real Madrid"],
    "SERIE A": ["Ac milan", "Juventus"],
    BUNDESLIGA: ["Borussia Dourtmund", "Bayern Munich"],
    "LIGUE 1": ["Paris Saint Germain"],
    RETRO: ["Manchester United", "Arsenal", "Real Madrid"],
  };

  const toggleCategory = (e) => {
    const selected = e.target.value;

    // If the category is already selected, deselect it
    if (selectedCategory === selected) {
      setSelectedCategory("");
      setSubCategory([]);
    } else {
      setSelectedCategory(selected);
      setSubCategory([]); // Reset subcategories on category change
    }
  };

  const toggleSubCategory = (e) => {
    const sub = e.target.value;

    if (subCategory.includes(sub)) {
      setSubCategory((prev) => prev.filter((item) => item !== sub));
    } else {
      setSubCategory((prev) => [...prev, sub]);
    }
  };

  const applyFilter = () => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(categoryToSubCategoryMapping).map((cat) => (
              <p className='flex gap-2' key={cat}>
                <input
                  onChange={toggleCategory}
                  className='flex gap-2'
                  type='checkbox'
                  value={cat}
                  checked={selectedCategory === cat}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>Clubs</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {selectedCategory &&
              categoryToSubCategoryMapping[selectedCategory].map((club) => (
                <p className='flex gap-2' key={club}>
                  <input
                    onChange={toggleSubCategory}
                    className='flex gap-2'
                    type='checkbox'
                    value={club}
                    checked={subCategory.includes(club)}
                  />
                  {club}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
