import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
     await mongoose.connect(`${config.database_url}`);
    console.log("server is connected to mongoDB ");
  } catch (err) {
    console.log("MongoDB connection error", err);
  }
};

export default connectDB;