import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const { DB_URI } = process.env;

mongoose.connect(DB_URI);

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });
  