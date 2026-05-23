import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "projectmanagement",
    });
    console.log("MongoDB Connected  — Balle Balle");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
