import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./heartIcon"

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[50%] ml-8 p-3">
      <div>
        <div className="relative">
          <img
            src={product.image}
            alt={product.image}
            className="h-auto rounded"
          />
          <HeartIcon product={product} />
        </div>
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center text-white">
              {product.name}
            </h2>
          </Link>
          <span
            className=" 
          bg-pink-800 text-xs font-medium mr-2 px-2.5 
         py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-3
          "
          >
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
