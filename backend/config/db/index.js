import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("La connection avec la base de données est rétablie");
  } catch (error) {
    console.log("Erreur du connection avec la base de donnée");
    process.exit(1)
  }
};

export default connectDb;
