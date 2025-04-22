import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV === "development") {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  if (process.env.NODE_ENV === "development") {
    console.log("MongoDB connection closed");
  }
});
