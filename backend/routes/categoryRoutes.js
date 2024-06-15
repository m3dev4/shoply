import express from "express";
import {
  createCategory,
  listCategory,
  readCategory,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authentificate, authorizedAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authentificate, authorizedAdmin, createCategory);
router.route("/:categoryId").put(authentificate, authorizedAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authentificate, authorizedAdmin, removeCategory);

  router.route("/categories").get(listCategory);
  router.route("/:id").get(readCategory);

export default router;