import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import Category from "../../models/category/category.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find({});
    res.status(200).json({ success: true, data: cuisines });
  } catch (error) {
    console.error("Error on Get cuisines:", error.message);
    res.status(404).json({ success: false, error: "Failed to fetch cuisines" });
  }
};

// const upload = multer({
//   dest: "uploads/", // Temporary directory for uploads
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extName = allowedTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimeType = allowedTypes.test(file.mimetype);
//     if (extName && mimeType) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only .png, .jpg, and .jpeg formats allowed!"));
//     }
//   },
// });

export const createCuisine = async (req, res) => {
  const { categoryId, name, description } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }
    const lastCuisine = await Cuisine.findOne().sort({ cuisineId: -1 });
    const newCuisineId = lastCuisine ? lastCuisine.cuisineId + 1 : 1;

    const newCuisine = new Cuisine({
      categoryId: categoryId,
      cuisineId: newCuisineId,
      name,
      description
    });

    await newCuisine.save();
    res.status(201).json({ success: true, data: newCuisine });
  } catch (error) {
    console.error("Error on Create cuisine:", error.message);
    res.status(400).json({ success: false, error: "Failed to create cuisine" });
  }
};

// export const createCuisine = async (req, res) => {
//   upload.single("image"),
//     async (req, res) => {
//       const { categoryId, name, description, image } = req.body;
//       const imageFile = req.file;

//       try {
//         const category = await Category.findById(categoryId);
//         if (!category) {
//           return res
//             .status(404)
//             .json({ success: false, message: "Category not found." });
//         }
//         const lastCuisine = await Cuisine.findOne().sort({ cuisineId: -1 });
//         const newCuisineId = lastCuisine ? lastCuisine.cuisineId + 1 : 1;

//         let imagePath = null;

//         if (imageFile) {
//           const newFileName = `menu_${newCuisineId}_${name.replace(/\s+/g, "_")}${path.extname(imageFile.originalname)}`;
//           const menuImagesDir = path.join(__dirname, "..", "menu_images");
  
//           fs.mkdirSync(menuImagesDir, { recursive: true });
  
//           const finalPath = path.join(menuImagesDir, newFileName);
//           fs.renameSync(imageFile.path, finalPath);
  
//           imagePath = path.relative(path.join(__dirname, ".."), finalPath);
//         }

//         const newCuisine = new Cuisine({
//           categoryId: categoryId,
//           cuisineId: newCuisineId,
//           name,
//           description,
//           image: imagePath,
//         });

//         await newCuisine.save();
//         res.status(201).json({ success: true, data: newCuisine });
//       } catch (error) {
//         console.error("Error on Create cuisine:", error.message);
//         res
//           .status(400)
//           .json({ success: false, error: "Failed to create cuisine" });
//       }
//     };
// };

export const updateCuisine = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid cuisine ID" });
  }

  try {
    const updatedCuisine = await Cuisine.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCuisine });
  } catch (error) {
    console.error("Error on Update cuisine:", error.message);
    res.status(500).json({ success: false, error: "Failed to update cuisine" });
  }
};

export const deleteCuisine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid cuisine ID" });
  }

  try {
    await Cuisine.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Cuisine deleted successfully" });
  } catch (error) {
    console.error("Error on Delete cuisine:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete cuisine" });
  }
};
