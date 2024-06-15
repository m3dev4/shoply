import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "./smallProduct";
import ProductCaroussel from "./productCaroussel";

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <h1>Erreur</h1>;

  if (!data) return <div>No data available</div>;

  return (
    <div className="flex justify-between">
      <div className="xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-col-2">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <ProductCaroussel />
    </div>
  );
};

export default Header;
