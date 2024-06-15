import express from "express"
import { createUser, deleteUserById, getAllUser, getCurrentUserProfile, getUserById, loginUser, logoutUser, updateUserById, updateUserProfile } from "../controllers/userController.js"

import { authentificate, authorizedAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

router
    .route("/")
    .post(createUser)
    .get(authentificate, authorizedAdmin, getAllUser)


router.post("/auth", loginUser)
router.post("/logout", logoutUser)

router
    .route("/profile")
    .get(authentificate, getCurrentUserProfile)
    .put(authentificate, updateUserProfile)

router
    .route("/:id")
    .get(authentificate, authorizedAdmin, getUserById)
    .put(authentificate, authorizedAdmin, updateUserById)
    .delete(authentificate, authorizedAdmin, deleteUserById)



export default router