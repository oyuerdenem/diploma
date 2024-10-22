import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import Table from '../../models/table/table.model';
import TableQr from '../../models/tableqr/tableqr.model';

// Create a new table and generate a QR code for it
export const createTable = async (req, res) => {
  const { tableId, branchId, tableNumber, seats, status } = req.body;

  try {
    // Create the new table
    const newTable = await Table.create({ tableId, branchId, tableNumber, seats, status });

    // Create a unique QR code for the new table
    const qrCodeData = {
      tableId: newTable._id, // Reference to the table
      tableNumber: newTable.tableNumber,
      branchId: newTable.branchId,
      createdAt: newTable.createdAt,
    };

    // Generate the QR code
    const qrCodeImage = await QRCode.toDataURL(JSON.stringify(qrCodeData));

    // Save the QR code image to the filesystem
    const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, '');
    const qrCodeFileName = `qrcode_${newTable.tableId}.png`; // You can customize the filename
    const qrCodeFilePath = path.join(__dirname, 'qrcodes', qrCodeFileName); // Specify the directory where you want to save

    // Create the directory if it doesn't exist
    fs.mkdirSync(path.join(__dirname, 'qrcodes'), { recursive: true });

    // Write the image file
    fs.writeFileSync(qrCodeFilePath, base64Data, 'base64');

    // Create the QR entry in the database
    const newTableQr = await TableQr.create({
      qrId: newTable.tableId, // You can change this logic to generate unique IDs if necessary
      tableId: newTable._id,
      qrCodeData: qrCodeData,
      creationDate: new Date(),
    });

    return res.status(201).json({
      message: 'Table created successfully',
      table: newTable,
      qrCodeImagePath: qrCodeFilePath, // Send the saved QR code image path back to the client
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating table', error });
  }
};

// Add more controllers as needed, e.g., getTable, updateTable, deleteTable, etc.
