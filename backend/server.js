import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product/product.routes.js";
import branchRoutes from "./routes/branch/branch.routes.js";
import restaurantRoutes from "./routes/restaurant/restaurant.routes.js";
import cuisineRoutes from "./routes/cuisine/cuisine.routes.js";
import staffRoutes from "./routes/staff/staff.routes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import authRouter from "./routes/auth/auth.route.js";
import userRoutes from "./routes/user/user.routes.js";
import tableRoutes from "./routes/table/table.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); 
app.use(express.json());

// app.use("/api/products", authenticateToken, productRoutes);
// app.use("/api/branches", authenticateToken, branchRoutes);
// app.use("/api/restaurants", authenticateToken, restaurantRoutes);
// app.use("/api/cuisines", authenticateToken, cuisineRoutes);
// app.use("/api/staffs", authenticateToken, staffRoutes);
// app.use("/api/users", authenticateToken, userRoutes);
// app.use('/api/tables', authenticateToken, tableRoutes);

app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/users", userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/login', authRouter); 
app.use('/api/logout', authRouter); 

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:" + PORT);
});
