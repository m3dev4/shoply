import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/header";
import Loader from "../../components/Loader";
import Message from "../../components/message";
import Product from "../products/product";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    );
  }

  return (
    <>
      {!keyword && <Header />}
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-white mt-16 md:mt-24 px-4 md:px-0">
        <h1 className="text-center md:text-left md:ml-20 text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0">
          Produits spéciaux
        </h1>
        <Link
          to="/shop"
          className="bg-pink-600 font-bold rounded-full py-2 px-6 md:px-10 text-sm md:text-base lg:text-lg"
        >
          Boutique
        </Link>
      </div>
      <div className="flex justify-between flex-1 flex-wrap mt-8 md:mt-12 px-4 md:px-0 text-white">
        {data?.products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
