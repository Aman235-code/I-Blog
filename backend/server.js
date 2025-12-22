import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
