import React, { useEffect, useState } from "react";
import AdminMenu from "./adminMenu";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery();

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  const { data: categories } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image téléchargée avec succès", {});
      setImage(res.image);
    } catch (err) {
      toast.error("Erreur lors du téléchargement de l'image", {});
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("quantity", quantity);
      formData.append("countInStock", stock); // Correction de la faute de frappe

      const data = await updateProduct({
        productId: params._id,
        formData,
      }).unwrap();

      if (data?.error) {
        toast.error(data.error, {});
      } else {
        toast.success(`Mise à jour du produit avec succès`, {});
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Mise à jour du produit échouée. Veuillez réessayer", {});
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce produit ?"
      );
      if (!answer) return;

      const data = await deleteProduct(params._id).unwrap();
      toast.success(`"${data.name}" a été supprimé`, {});
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Suppression échouée. Veuillez réessayer", {});
    }
  };

  return (
    <>
    <div className="container mx-auto px-4 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-3">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-3">
          <div className="h-12">Mettre à jour / Supprimer</div>
  
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="mx-auto w-full max-h-96 object-contain"
              />
            </div>
          )}
  
          <div className="mb-3 text-white">
            <label className="text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-white"
              />
            </label>
          </div>
  
          <div className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="name" className="block">
                  Prix
                </label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="name" className="block">
                  Quantité
                </label>
                <input
                  type="number"
                  min="1"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="name" className="block">
                  Marque
                </label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
  
            <label htmlFor="" className="my-5 block">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block">
                  Stock
                </label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="" className="block">
                  Catégorie
                </label>
                <select
                  placeholder="Choose Category"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="flex justify-between mt-5">
              <button
                onClick={handleSubmitFile}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-green-600"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProductUpdate;
