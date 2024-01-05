import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;

// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     console.log("Connected to the database..d.");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
