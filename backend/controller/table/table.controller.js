import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Table from "../../models/table/table.model.js";
import TableQr from "../../models/tableqr/tableqr.model.js";
import Branch from "../../models/branch/branch.model.js";

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().populate("branchId"); 

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

export const createTable = async (req, res) => {
  const { tableId, branchId, tableNumber, seats, status } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    const lastTable = await Table.findOne().sort({ tableId: -1 });
    const newTableId = lastTable ? lastTable.tableId + 1 : 1;

    const newTable = await Table.create({
      tableId: newTableId,
      branchId: branchId,
      tableNumber,
      seats,
      status,
    });
    const publicUrl = "http://172.20.10.4:3000";
    const qrCodeData = {
      tableId: newTable._id, 
      tableNumber: newTable.tableNumber,
      branchId: newTable.branchId,
      createdAt: newTable.createdAt,
      link: `${publicUrl}/home`,
    };

    const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrCodeData));

    const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
    const qrCodeFileName = `qrcode_${newTable.tableId}.png`; 
    const qrCodeFilePath = path.join(__dirname, "qrcodes", qrCodeFileName);

    fs.mkdirSync(path.join(__dirname, "qrcodes"), { recursive: true });

    fs.writeFileSync(qrCodeFilePath, base64Data, "base64");

    const newTableQr = await TableQr.create({
      qrId: newTable.tableId, 
      tableId: newTable._id,
      qrCodeData: qrCodeData,
      creationDate: new Date(),
    });

    return res.status(201).json({
      message: "Table created successfully",
      table: newTable,
      qrCodeImagePath: qrCodeFilePath, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating table", error });
  }
};