import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import InputField from "../Components/InputField";
import { dummyPurchageSeiBuysData } from "../utilities/Data"; // Import the new data

const fields = [
  { label: "Payment Terms", name: "paymentTerms", type: "text" },
  { label: "Quality", name: "quality", type: "text" },
  { label: "Notes", name: "notes", type: "text" },
  { label: "Measurements", name: "measurements", type: "dropdown" },
  { label: "Broker", name: "broker", type: "dropdown" },
  { label: "Credit", name: "credit", type: "dropdown" },
];

const measurementsOptions = ["METRE TICKET", "GALLON TICKET", "LITRE TICKET"];
const brokerOptions = ["ABC Brokerage", "XYZ Brokerage", "123 Brokerage"];
const creditOptions = ["Pending", "Approved", "Rejected"];

const PurchagePaymentDetails = ({
  formData,
  handleInputChange,
  purchase,
  updateFormData,
}) => {
  useEffect(() => {
    const selectedPurchaseValue = dummyPurchageSeiBuysData.find(
      (item) => item.purchase === purchase && item.type === "seibuys"
    );

    if (selectedPurchaseValue) {
      const updatedFormData = {
        ...formData,
        paymentTerms:
          selectedPurchaseValue.purchagePaymentDetails.paymentTerms || formData.paymentTerms,
        quality: selectedPurchaseValue.purchagePaymentDetails.quality || formData.quality,
        notes: selectedPurchaseValue.purchagePaymentDetails.notes || formData.notes,
        measurements:
          selectedPurchaseValue.purchagePaymentDetails.measurements.selected || formData.measurements,
        credit:
          selectedPurchaseValue.purchagePaymentDetails.credit.selected || formData.credit,
        broker:
          selectedPurchaseValue.purchagePaymentDetails.broker.selected || formData.broker,
      };
      
      updateFormData(updatedFormData);
    }
    console.log("PurchagePaymentDetails+++++++++++++++++++",formData, "formdata");
  }, [formData]);

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body1">Table Name</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TextField
                size="small"
                id="table-name"
                variant="outlined"
                fullWidth
              />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
              <TextField
                id="table-name"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                placeholder=""
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h6">Purchase Payment Details</Typography>
      </Box>

      <Grid container spacing={2}>
        {fields.map((field) => {
          if (field.type === "dropdown") {
            let options;
            switch (field.name) {
              case "measurements":
                options = measurementsOptions;
                break;
              case "broker":
                options = brokerOptions;
                break;
              case "credit":
                options = creditOptions;
                break;
              default:
                options = [];
            }

            return (
              <Grid item xs={3} key={field.name}>
                <FormControl size="small" style={{ width: "210px", margin: "3px" }}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    label={field.label}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange(field.name)}
                  >
                    {options.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          }

          // Render other input fields as normal
          return (
            <Grid item xs={3} key={field.name}>
              <InputField
                label={field.label}
                type={field.type}
                value={formData[field.name]}
                onChange={handleInputChange(field.name)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default React.memo(PurchagePaymentDetails);
