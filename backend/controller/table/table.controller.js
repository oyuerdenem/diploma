import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Table from "../../models/table/table.model.js";
import TableQr from "../../models/tableqr/tableqr.model.js";
import Branch from "../../models/branch/branch.model.js";

// Get all tables
export const getTables = async (req, res) => {
  try {
    // Retrieve all tables from the database
    const tables = await Table.find().populate("branchId"); // Populate branchId if you want to include branch details

    return res.status(200).json({
      message: "All tables retrieved successfully",
      tables,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving tables", error });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new table and generate a QR code for it
export const createTable = async (req, res) => {
  const { tableId, branchId, tableNumber, seats, status } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    // Create the new table
    const lastTable = await Table.findOne().sort({ tableId: -1 });
    const newTableId = lastTable ? lastTable.tableId + 1 : 1;

    const newTable = await Table.create({
      tableId: newTableId,
      branchId: branchId,
      tableNumber,
      seats,
      status,
    });
    const publicUrl = 'https://1234abcd.ngrok.io';
    // Create a unique QR code for the new table
    const qrCodeData = {
      tableId: newTable._id, // Reference to the table
      tableNumber: newTable.tableNumber,
      branchId: newTable.branchId,
      createdAt: newTable.createdAt,
      link: `${publicUrl}/api/tables` // Update this path to match your app's routing
    };

    // Generate the QR code
    const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrCodeData));

    // Save the QR code image to the filesystem
    const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
    const qrCodeFileName = `qrcode_${newTable.tableId}.png`; // You can customize the filename
    const qrCodeFilePath = path.join(__dirname, "qrcodes", qrCodeFileName);

    // Create the directory if it doesn't exist
    fs.mkdirSync(path.join(__dirname, "qrcodes"), { recursive: true });

    // Write the image file
    fs.writeFileSync(qrCodeFilePath, base64Data, "base64");

    // Create the QR entry in the database
    const newTableQr = await TableQr.create({
      qrId: newTable.tableId, // You can change this logic to generate unique IDs if necessary
      tableId: newTable._id,
      qrCodeData: qrCodeData,
      creationDate: new Date(),
    });

    return res.status(201).json({
      message: "Table created successfully",
      table: newTable,
      qrCodeImagePath: qrCodeFilePath, // Send the saved QR code image path back to the client
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating table", error });
  }
};

// Add more controllers as needed, e.g., getTable, updateTable, deleteTable, etc.
