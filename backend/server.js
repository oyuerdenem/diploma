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
import cuisineTypeRoutes from "./routes/cuisineTypes/cuisineTypes.routes.js";
import userRoutes from "./routes/user/user.routes.js";
import tableRoutes from "./routes/table/table.routes.js";
import tableqrRoutes from "./routes/qr/tableqr.routes.js";
import categoryRoutes from "./routes/category/category.routes.js";
import menuItemRoutes from "./routes/menuItem/menuItem.routes.js";
import orderRoutes from "./routes/order/order.routes.js";
import orderItemRoutes from "./routes/orderItem/orderItem.routes.js";
import { WebSocketServer } from "ws";
import http from "http"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server }); 

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.use("/api/products", authenticateToken, productRoutes);
app.use("/api/branches", authenticateToken, branchRoutes);
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/cuisinetype", authenticateToken, cuisineTypeRoutes);
app.use("/api/restaurants", authenticateToken, restaurantRoutes);
app.use("/api/menuitem", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderitems", orderItemRoutes);
app.use("/api/cuisines", authenticateToken, cuisineRoutes);
app.use("/api/categories", authenticateToken, categoryRoutes);
app.use("/api/staffs", authenticateToken, staffRoutes);
app.use("/api/tables", authenticateToken, tableRoutes);
app.use("/api/tableqrs", authenticateToken, tableqrRoutes);
app.use("/api/login", authRouter);
app.use("/api/logout", authRouter);

app.get("/:universalURL", (req, res) => {
  res.status(404).send("404 URL NOT FOUND");
});

server.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

// const ws = new WebSocket("ws://localhost:8000");
// ws.onopen = () => {
//   console.log("Connected to WebSocket server");
//   ws.send("Hello Server!");
// };
// ws.onmessage = (message) => {
//   console.log("Message from server:", message.data);
// };
// ws.onclose = () => {
//   console.log("WebSocket connection closed");
// };

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");

  // Send a welcome message to the client
  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

  // Listen for incoming messages from the client
  ws.on("message", (data) => {
    console.log("Received message:", data);

    // Echo the message back to the client
    ws.send(JSON.stringify({ message: "Echo: " + data }));
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});
