import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(8000, () => {
  connectDB();
  console.log("Server is running on port http://localhost:8000");
});
