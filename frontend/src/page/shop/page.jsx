import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import React, { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "../../redux/api/productApiSlice";
import { setProducts } from "../../redux/features/auth/shopSlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  )
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });
  useEffect(() => {
    if (!checked.length && !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filteredProducts = filteredProductQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
          dispatch(setProducts(filteredProducts));
        });
      }
    }
  }, [
    checked,
    radio,
    priceFilter,
    filteredProductQuery.data,
    dispatch,
    priceFilter,
  ]);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#1a022b] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 text-white bg-black rounded-full mb-2">
              Filtrer par catégorie
            </h2>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ShopPage;
