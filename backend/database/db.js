import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Mongodb conection failed ", error);
  }
};

export default connectDb;
