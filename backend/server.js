import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import cuisineRoutes from "./routes/cuisine.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cuisines", cuisineRoutes);

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
