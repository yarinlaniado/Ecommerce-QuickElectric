import mongoose from "mongoose";

export const initmongoose = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  mongoose.set("strictQuery", false);
  return await mongoose.connect(process.env.MONGODB_URL);
};
