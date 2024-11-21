import TableQr from "../../models/tableqr/tableqr.model.js";

export const getTableQrs = async (req, res) => {
  try {
    const tableQrs = await TableQr.find({});
    res.status(200).json({ success: true, data: tableQrs });
  } catch (error) {
    console.error("Error on Get table QR codes:", error.message);
    res
      .status(404)
      .json({ success: false, error: "Failed to fetch table QR codes" });
  }
};

export const getTableQrById = async (req, res) => {
  const { id } = req.params;
  try {
    const tableQr = await TableQr.findById(id);
    
    if (!tableQr) {
      return res.status(404).json({ success: false, error: "Table QR not found" });
    }

    res.status(200).json({ success: true, data: tableQr });
  } catch (error) {
    console.error("Error on Get table QR by ID:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch table QR by ID" });
  }
};
