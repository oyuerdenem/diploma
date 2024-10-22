import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    console.log("Token not found");
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" }); 
    }
    req.user = user;
    next();
  });
};
