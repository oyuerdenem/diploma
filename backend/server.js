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
import categoryRoutes from "./routes/category/category.routes.js";
import { WebSocketServer } from "ws";
import http from "http"; // Import http to create the server

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Create an HTTP server and pass the Express app to it
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); // Attach WebSocket server to HTTP server

app.use(cors());
app.use(express.json());

// Uncomment these lines if authentication is required for the routes
app.use("/api/products", authenticateToken, productRoutes);
app.use("/api/branches", authenticateToken, branchRoutes);

app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/cuisinetype", authenticateToken, cuisineTypeRoutes);
app.use("/api/restaurants", authenticateToken, restaurantRoutes);

app.use("/api/cuisines", authenticateToken, cuisineRoutes);
app.use("/api/categories", authenticateToken, categoryRoutes);
app.use("/api/staffs", authenticateToken, staffRoutes);
app.use("/api/tables", authenticateToken, tableRoutes);
app.use("/api/login", authRouter);
app.use("/api/logout", authRouter);

// app.use("/api/products", productRoutes);
// app.use("/api/branches", branchRoutes);
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/cuisines", cuisineRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/staffs", staffRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/tables", tableRoutes);
// app.use("/api/login", authRouter);
// app.use("/api/logout", authRouter);

app.get("/:universalURL", (req, res) => {
  res.status(404).send("404 URL NOT FOUND");
});

// Start the server and connect to the database
server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
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
