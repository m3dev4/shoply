import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import Message from "../../components/message";
import HeartIcon from "../../components/heartIcon"

const Products = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery();

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem] "
        >
          Retourner
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative justify-between mt-[2rem] ml-[10rem] ">
            <div>
              <img
                src={Products.image}
                alt={Products.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mt-[2rem]"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p
                className="my-4 xl:w-[35rem] 
              lg:w-[35rem] md:[30rem] 
              text-[#B0B0B0]"
              >
                {product.description}
              </p>
              <p className="text-5xl my-4 font-semibold">{product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand [" "]
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="mr-2 text-white" /> Added [" "]
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews [" "]
                    {product.numReviews}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStart className="mr-2 text-white" />
                    Ratings [rating]
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" />
                    Quantity [rating]
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2 text-white" />
                    In Stock [rating]
                    {product.countInStock}
                  </h1>
                </div>
              </div>
              <div className="flex flex-between flex-wrap">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-24 rounded-lg text-white"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  onClick={addToCartHnadler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 rounded-lg mt-4
               md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]"></div>
        </>
      )}
    </>
  );
};

export default Products;
