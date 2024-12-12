import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface CustomDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: (action: string) => void;
  boldText: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  description,
  onClose,
  boldText,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose("closed")}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-container": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        "& .MuiPaper-root": {
          width: "30%",
          fontSize: "0.875rem",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: "1rem",
          color: "#4B5563",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontWeight: "light",
            fontSize: "0.875rem",
            color: "#4B5563",
          }}
        >
          {description}{" "}
          <strong style={{ fontWeight: "bold", color: "#086A69" }}>
            {boldText}
          </strong>{" "}
          төлөвт шилжүүлэх үү?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose("disagree")}
          sx={{
            color: "#086A69",
            fontSize: "0.875rem",
          }}
        >
          Цуцлах
        </Button>
        <Button
          onClick={() => onClose("agree")}
          sx={{
            color: "#086A69",
            fontSize: "0.875rem",
          }}
          autoFocus
        >
          Зөвшөөрөх
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
