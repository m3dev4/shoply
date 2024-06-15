import React, { useState } from "react";
import {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./adminMenu";
import CategoryForm from "../../components/categoryForm";
import Modal from "../../components/modal";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectCategory, setSelectCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [moadalVisible, setModalVisible] = useState(false);

  const { data: categories } = useFetchCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Le nom du catégorie est requise");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} est crée.`);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creation du catégorie échouéé. Veuillez réessayé...");
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Le nom du catégorie est requise");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} est mettre à jour`);
        setSelectCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("La mise à jour a échouée veuillez réeassyer");
    }
  };
  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} est supprimé`);
        setSelectCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("La suppression du catégorie est échoué. Veuillez réessayer");
    }
  };

  return (
    <div className="ml-[10rem] mt-10 flex flex-col md:flex-row">
      <AdminMenu />
      <h5 className="h-12 text-white">Gerer les catégories</h5>
      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmitCategory={handleCreateCategory}
      />
      <br />
      <hr />

      <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              className="bg-black border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              onClick={() => {
                setModalVisible(true);
                setSelectCategory(category);
                setUpdatingName(category.name);
              }}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={moadalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm
          value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleSubmitCategory={handleUpdateCategory}
          buttonText="Mise à jour"
          handleDelete={handleDeleteCategory}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;
