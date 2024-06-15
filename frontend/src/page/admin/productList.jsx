import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./adminMenu";

const ProductList = () => {
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const result = await createProduct(productData).unwrap();

      toast.success(`${result.name} est crée`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Creation du produit échouée. Veuillez réessayer");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container text-white sm:mx-[0]">
      <AdminMenu />
      <div className="flex justify-center align-center flex-col md:w-full p-10">
        <h3 className="h-12 text-center text-white">Creer un produit 📦</h3>
        {image && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="flex justify-center align-center mb-3">
          <label
            className="border text-white px-4 block w-[50%]  
          text-center rounded-lg cursor-pointer font-bold py-11 sm:py-11"
          >
            {image ? image.name : "Upload image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <div className="p-3">
          <div className="flex flex-wrap justify-center align-center gap-6">
            <div className="one">
              <label htmlFor="name" className="text-white">
                Name
              </label>{" "}
              <br />
              <input
                type="text"
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two">
              <label htmlFor="price" className="text-white">
                Prix
              </label>{" "}
              <br />
              <input
                type="number"
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center align-center gap-6">
            <div className="one">
              <label htmlFor="quantity" className="text-white">
                Quantité
              </label>{" "}
              <br />
              <input
                type="number"
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="two">
              <label htmlFor="brand" className="text-white">
                Marque
              </label>{" "}
              <br />
              <input
                type="text"
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center align-center gap-6">
            <div className="one">
              <label htmlFor="description" className="text-white">
                Description
              </label>{" "}
              <br />
              <textarea
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="two">
              <label htmlFor="stock" className="text-white">
                En stocke
              </label>{" "}
              <br />
              <input
                type="number"
                className="mb-3 p-4 w-[20rem] border rounded-lg bg-[#1a1a1b]"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center align-center">
            <label className="p-4 text-white">Catégorie</label>
            <select
              placeholder="Choose Category"
              className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#282829] text-white"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmitFile}
            className="py-4 px-10 ml-7 mt-5 rounded-lg text-lg font-bold bg-pink-700"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
