import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
