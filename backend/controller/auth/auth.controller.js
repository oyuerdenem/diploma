// controller/auth.controller.js
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

    res.status(200).json({ success: true, token: `Bearer ${token}`, userType: user.role});
  } catch (error) {
    console.error("Error on staff login:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
