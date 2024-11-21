import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user/user.model.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 10 * 60 * 60 * 1000, 
    });

    res.status(200).json({ success: true, token: `Bearer ${token}`, message: "Login successful", userType: user.role, branchId: user.branchId });
  } catch (error) {
    console.error("Error on login:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Error clearing session" });
        }
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
