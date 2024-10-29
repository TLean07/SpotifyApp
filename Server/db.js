import mongoose from "mongoose";

export default async function connectDb() {
  mongoose.connect(
    "mongodb+srv://admin:4ayxrH9Rt6X9cV4Q@cluster0.8mgmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  return mongoose.connection;
}
