import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning"; 

export default function SimpleAlert({
  message,
  severity = "success",
  icon = null,
}) {
  const defaultIcon =
    severity === "success" ? (
      <CheckIcon fontSize="inherit" />
    ) : severity === "error" ? (
      <ErrorIcon fontSize="inherit" />
    ) : severity === "warning" ? (
      <WarningIcon fontSize="inherit" />
    ) : (
      icon
    );

  return (
    <Alert icon={icon || defaultIcon} severity={severity} className="flex-row items-center">
      <div className="text-xs">
        {message ||
          "Here is a gentle confirmation that your action was successful."}
      </div>
    </Alert>
  );
}
