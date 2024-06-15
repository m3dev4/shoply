import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Veuillez remplir les champs ci-desous");
  }

  const userExist = await User.findOne({
    email,
  });

  if (userExist) {
    res.status(400).send("L'utilisateur est deja disponible");
  }
  const salt = await bcrypt.genSalt(10)
  const cacheMotdePasse = await bcrypt.hash(password, salt)
  const newUser = new User({ username, email, password: cacheMotdePasse });

  try {
    await newUser.save();
    createToken(res, newUser._id)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send("Les données sont invalides");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password)

    if (isMatch) {
      createToken(res, existingUser._id)
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      })
    }
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "La déonnection s'est fait avec succéss " })
})

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  } else {
    res.status(404)
    throw new Error("Utilisateur non trouvé")
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      const cacheMotdePasse = await bcrypt.hash(req.body.password, salt)
      user.password = cacheMotdePasse
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error("Utilisateur non trouvé")
  }
})

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(404)
      throw new Error("L'administrateur, ne peut pas être supprimé")
    }
    await User.deleteMany({ _id: user._id })
    res.json({ message: "Utilisateur supprimer" })
  } else {
    res.status(404)
    throw new Error("Utilisateur non trouvé")
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("Utilisateur non trouvé")
  }
})

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updateUserId = await user.save()
    res.json({
      _id: updateUserId._id,
      username: updateUserId.username,
      email: updateUserId.email,
      isAdmin: updateUserId.isAdmin
    })
  } else {
    res.status(404)
    throw new Error("Utilisateur non trouvé")
  }
})


export {
  createUser,
  loginUser,
  logoutUser,
  getAllUser,
  getCurrentUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById

}