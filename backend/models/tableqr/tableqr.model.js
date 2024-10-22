import mongoose from "mongoose";

const tableQrSchema = new mongoose.Schema(
  {
    qrId: {
      type: Number,
      required: [true, "QR ID is required"],
      unique: true,
      min: [1, "QR ID must be a positive integer"],
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: [true, "Table ID is required"],
    },
    qrCodeData: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "QR Code data is required"],
      validate: {
        validator: function (v) {
          return typeof v === "object" && v !== null && !Array.isArray(v);
        },
        message: "QR Code data must be a valid JSON object.",
      },
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TableQr = mongoose.model("TableQr", tableQrSchema);

export default TableQr;
