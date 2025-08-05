import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.error("Error connecting to MONGODB", err);
  }
};
