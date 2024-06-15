import express from "express";
import formidable from "express-formidable";
import {
  addProduct,
  addProductReviews,
  fetchAllProduct,
  fetchNewProducts,
  fetchProduct,
  fetchProductById,
  fetchTopProducts,
  filterProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authentificate, authorizedAdmin } from '../middleware/authMiddleware.js'
import checkId  from "../middleware/checkId.js"

const router = express.Router();

router
  .route("/")
  .get(fetchProduct)
  .post(authentificate, authorizedAdmin, formidable(), addProduct);

router.route("/allProducts").get(fetchAllProduct);
router.route("/id/reviews").post(authentificate, checkId, addProductReviews);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authentificate, authorizedAdmin, formidable(), updateProduct)
  .delete(authentificate, authorizedAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;