import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, Breadcrumbs, Link } from "@mui/material";
import {
  HomeRepairServiceOutlined,
  InsertDriveFile,
  OpenInNew,
} from "@mui/icons-material";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import Dropdown from "../Components/DropDown";
import SelectionGroup from "../RadioButtons/RadioGroup";
import SEIBuys from "../RadioButtons/SeiBuys";
import SEISells from "../RadioButtons/SeiSells";
import CheckboxGroup from "../CheckboxGroup/Checkbox";
import DeliveryType from "../CheckboxGroup/DeliveryType";
import PipelineLocation from "../CheckboxGroup/PipeLineLocation";

import {
  purchageData,
  salesData,
  idData,
  dummyContractData,
  dummyPurchageSeiBuysData,
} from "../utilities/Data";
import PurchagePaymentDetails from "../CheckboxGroup/PurchagePaymentDetails";
import ContractPrinoutInfo from "../CheckboxGroup/ContractPrinoutInfo";
import Layout from "../Layouts/Layout";
import { IconButtonWithTooltip } from "../RadioButtons/IconButtonWithTooltip";
import { initialState } from "../utilities/constants";

const ContractScreen = () => {
  // console.log("dummyContractData.purchase", dummyContractData[0].purchase);
  
  const [purchase, setPurchase] = useState(dummyPurchageSeiBuysData[0].purchase);
  const [sale, setSale] = useState("");
  const [id, setId] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("SEIbuys");
  const [checkedCycle, setCheckedCycle] = useState([]);
  const [checkedPipelineNames, setCheckedPipelineNames] = useState([]);
  const [checkedDeliveryType, setCheckedDeliveryType] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [purchasePaymentFormData, setPurchasePaymentFormData] = useState(initialState);
  const [contractPrintoutFormData, setContractPrintoutFormData] = useState(initialState);

  const isDisabled = !(purchase || sale);
console.log("Iam parent")
  const handlePurchaseChange = (event) => {
    setPurchase(event.target.value);
    setSale("");
    setId("");
  };

  const handleSalesChange = (event) => {
    setSale(event.target.value);
    setPurchase("");
    setId("");
  };
  const handleIdChange = (event) => setId(event.target.value);

  const handleLayoutChange = (event) => {
    // console.log("Selected layout:", event.target.value);
    setSelectedLayout(event.target.value);
  };

  const handleInputChange = (field) => (event) => {
    console.log("value", field, event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value || "",
    }));
  };

  const updateFormData = useCallback((updatedData) => {
    setFormData((prev) => ({ ...prev, ...updatedData }));
  }, []);
  
  const updatePurchasePaymentFormData = (updatedData) => {
    console.log("setPurchasePaymentFormData",purchasePaymentFormData)
    setPurchasePaymentFormData(updatedData);
  };

  const updateContractPrinoutInfoFormData = (updatedData) => {
    console.log("setContractPrintoutFormData",contractPrintoutFormData)
    setContractPrintoutFormData(updatedData);
  };


  const updatedPepline = (updatedPepline) => {
    setCheckedPipelineNames(updatedPepline);
  };
  const updatedDelivery = (updatedDelivery) => {
    setCheckedDeliveryType(updatedDelivery);
  };

  const handleCheckedCycleChange = (names) => setCheckedCycle(names);
  const handleCheckedPipelineChange = (names) => {
    // console.log("names==================================", names);
    setCheckedPipelineNames(names);
  };
  const handleCheckedDeliveryTypeChange = (names) =>
    setCheckedDeliveryType(names);

 

      const handleDownloadWord = () => {
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                                text: `Contract ${formData.id} Details`,
                                heading: "Heading1",
                              }),
                              new Paragraph({ text: ` ` }),
              new Paragraph({
                children: [
                  new TextRun({ text: "TO:", bold: true, color: "0000FF" }), // Blue color
                  new TextRun(` ${formData.trader}`),
                ],
                spacing: { after: 600 }, // Add spacing after
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "EMAIL:", bold: true, color: "0000FF" }), // Blue color
                  new TextRun(`\nEMAIL: ${formData.email}`),
                ],
                spacing: { after: 600 }, // Add spacing after
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "FROM:", bold: true, color: "0000FF" }),
                  new TextRun("\nSEI FUEL SERVICES"),
                  new TextRun("\nJOHN BEST"),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "DATE:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${formData.date}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "CONTRACT NO:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${formData.contact}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun("This stands to confirm the transaction between CHRIS SHEARON of EXXON MOBIL"),
                  new TextRun("\nand an agreement between JOHN BEST of SEI FUEL SERVICES on 10/17/2024 and"),
                  new TextRun("\nwherein the following terms and conditions apply:"),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "SELLER:", bold: true, color: "0000FF" }),
                  new TextRun("\nEXXON MOBIL"),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "BUYER:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${formData.fromCompany}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "QUALITY:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.quality}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "MEASUREMENT:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.measurements}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "NOTES:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.notes}`),
                ],
                spacing: { after: 600 },
              }),
              
              new Paragraph({
                children: [
                  new TextRun({ text: "CREDIT:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.credit}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "BROKER:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.broker}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "PAYMENT TERMS:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${purchasePaymentFormData.paymentterms}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "PRODUCT:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${contractPrintoutFormData.product}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "QUANTITY:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${contractPrintoutFormData.quantity}`),
                ],
                spacing: { after: 600 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "TERMS:", bold: true, color: "0000FF" }),
                  new TextRun(`\n${contractPrintoutFormData.terms}`),
                ],
                spacing: { after: 600 },
              }),
            ],
          }],
        });
      
        Packer.toBlob(doc).then((blob) => {
          saveAs(blob, `${purchase}.docx`);
        });
      };

      const selectedID = dummyPurchageSeiBuysData.find(
        (item) => item.purchase === purchase
      );
      
  useEffect(() => {
    
        if (selectedID) {
          const updatedID = {
            ...formData,
            id: selectedID.id,
            purchage: selectedID.purchage,
          };
          console.log(
            "updatedID+++++++++++++++++++++++++__________________________",
            updatedID
          );
          setFormData(updatedID);
        }
      }, [purchase, selectedID]);


  //   const doc = new Document();

  //   // Adding the title
  //   doc.addSection({
  //     children: [
  //       new Paragraph({
  //         text: "Contract Details",
  //         heading: "Heading1",
  //       }),
  //       new Paragraph({
  //         text: `Date: ${formData.date}`,
  //       }),
  //       new Paragraph({
  //         text: `Trader: ${formData.trader}`,
  //       }),
  //       new Paragraph({
  //         text: `From Company: ${formData.fromCompany}`,
  //       }),
  //       new Paragraph({
  //         text: `Contact: ${formData.contact}`,
  //       }),
  //       new Paragraph({
  //         text: `Phone: ${formData.phone}`,
  //       }),
  //       new Paragraph({
  //         text: `Fax: ${formData.fax}`,
  //       }),
  //       new Paragraph({
  //         text: `Email: ${formData.email}`,
  //       }),
  //       new Paragraph({
  //         text: `Other Input: ${formData.otherInput}`,
  //       }),
  //       new Paragraph({
  //         text: `Measurements: ${formData.measurements}`,
  //       }),
  //       new Paragraph({
  //         text: `Payment Terms: ${formData.paymentterms}`,
  //       }),
  //       new Paragraph({
  //         text: `Notes: ${formData.notes}`,
  //       }),
  //       new Paragraph({
  //         text: `Broker: ${formData.broker}`,
  //       }),
  //       new Paragraph({
  //         text: `Credit: ${formData.credit}`,
  //       }),
  //       new Paragraph({
  //         text: `Quantity: ${formData.quantity}`,
  //       }),
  //       new Paragraph({
  //         text: `ID: ${formData.id}`,
  //       }),
  //       new Paragraph({
  //         text: `Purchase: ${formData.purchage}`,
  //       }),
  //     ],
  //   });

  //   // Create a blob and save it
  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, "contract.docx");
  //   });
  // };
// function handleSeiBuy(seiData){
//         updateFormData(seiData)
// }
  return (
    <Layout>
      <Box sx={{ marginLeft: 30, marginTop: 2 }}>
        <Paper sx={{ padding: 0.5, marginBottom: 0.5, boxShadow: "none" }}>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: 0.2 }}>
            Contract
          </Typography>
          <Breadcrumbs sx={{ marginTop: 0 }}>
            <Link
              underline="hover"
              color="inherit"
              href="/home" //path
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeRepairServiceOutlined sx={{ mr: 0.5, fontSize: 20 }} />
              Home
            </Link>
            <Typography color="textPrimary">Contract</Typography>
          </Breadcrumbs>
        </Paper>

        <Box
          sx={{
            paddingTop: 0.3,
            paddingLeft: 2,
            margin: -1,
            backgroundColor: "rgb(245,245,245)",
          }}
        >
          <Paper sx={{ padding: 1, marginBottom: 0.3, boxShadow: "none" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" padding="0" width="700px" gap={1.5}>
                <Dropdown
                  label="Search Purchase"
                  value={purchase}
                  handleChange={handlePurchaseChange}
                  options={purchageData}
                  size="small"
                />
                <Dropdown
                  label="Search Sale"
                  value={sale}
                  handleChange={()=>handleSalesChange}
                  options={salesData}
                  size="small"
                />
                <Dropdown
                  label="Search Id"
                  value={formData.id}
                  handleChange={()=>handleIdChange}
                  options={idData}
                  size="small"
                />
              </Box>

              <Box display="flex" gap={2}>
                <IconButtonWithTooltip
                  title="Open Contracts in Word"
                  icon={<InsertDriveFile sx={{ fontSize: 20 }} />}
                  isDisabled={isDisabled}
                   onClick={()=>handleDownloadWord}
                />
                <IconButtonWithTooltip
                  title="Go to Contract Record"
                  icon={<OpenInNew sx={{ fontSize: 20 }} />}
                  isDisabled={isDisabled}
                  // onClick={() => {}}
                />
              </Box>
            </Box>
          </Paper>

          {sale && (
            <Paper
              sx={{
                paddingTop: 0.5,
                paddingLeft: 2,
                marginBottom: 1,
                boxShadow: "none",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 15 }}
                  variant="body1"
                  color="textSecondary"
                >
                  Select Category
                </Typography>
                <SelectionGroup
                  value={selectedLayout}
                  handleChange={()=>handleLayoutChange}
                />
              </Box>
            </Paper>
          )}

          {sale && selectedLayout === "SEIbuys" && (
            <SEISells
              title="SEI Buys"
              contracttypetitle="Sale Contract Number"
              type={sale}
              id={id}
            />
          )}

          {sale && selectedLayout === "SEIsells" && (
            <SEISells
              title="SEIsells"
              contracttypetitle="Sale Contract Number"
              type={sale}
              id={id}
            />
          )}

          {sale &&
            (selectedLayout === "SEIbuys"("constant") ||
              selectedLayout === "SEIsells") && (
              <Paper sx={{ padding: 2, marginBottom: 1, boxShadow: "none" }}>
                <SEIBuys
                  purchase={purchase}
                  formData={formData}
                  updateFormData={()=>updateFormData}
                  handleInputChange={()=>handleInputChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <CheckboxGroup
                      onCheckedCycleChange={()=>handleCheckedCycleChange}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <PipelineLocation
                      purchase={purchase}
                      onCheckedPipeLineChange={()=>handleCheckedPipelineChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <DeliveryType
                      OnCheckedDeliveryType={()=>handleCheckedDeliveryTypeChange}
                    />
                  </Grid>
                </Grid>
                <PurchagePaymentDetails
                  purchase={purchase}
                  formData={formData}
                  updateFormData={()=>updateFormData}
                  handleInputChange={()=>handleInputChange}
                />
                <ContractPrinoutInfo />
              </Paper>
            )}

          {purchase ? (
            <Paper
              sx={{
                paddingTop: 0.5,
                paddingLeft: 2,
                marginBottom: 1,
                boxShadow: "none",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 15 }}
                  variant="body1"
                  color="textSecondary"
                >
                  Select Category
                </Typography>
                <SelectionGroup
                  value={selectedLayout}
                  handleChange={()=>handleLayoutChange}
                />
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ height: "100vh", width: "100%" }} />
          )}

          {purchase && selectedLayout === "SEIbuys" && (
            <SEISells
              title="SEI Buy"
              contracttypetitle="Purchase Contract Number"
              type={purchase}
              id={formData.id}
            />
          )}

          {purchase && selectedLayout === "SEIsells" && (
            <SEISells
              title="SEI Sells"
              contracttypetitle="Purchase Contract Number"
              type={purchase}
              id={formData.id}
            />
          )}

          {purchase &&
            (selectedLayout === "SEIbuys" || selectedLayout === "SEIsells") && (
              <Paper sx={{ padding: 2, marginBottom: 1, boxShadow: "none" }}>
                <SEIBuys
                  purchase={purchase}
                  formData={formData}
                  updateFormData={updateFormData}
                  handleInputChange={()=>handleInputChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <CheckboxGroup
                      onCheckedCycleChange={()=>handleCheckedCycleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <PipelineLocation
                      updatedPepline={()=>updatedPepline}
                      purchase={purchase}
                      onCheckedPipeLineChange={()=>handleCheckedPipelineChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <DeliveryType
                      updatedDelivery={()=>updatedDelivery}
                      purchase={purchase}
                      OnCheckedDeliveryType={()=>handleCheckedDeliveryTypeChange}
                    />
                  </Grid>
                </Grid>
                <PurchagePaymentDetails
                  purchase={purchase}
                  formData={purchasePaymentFormData}
                  updateFormData={updatePurchasePaymentFormData}
                  handleInputChange={()=>handleInputChange}
                />
                <ContractPrinoutInfo
                 purchase={purchase}
                 formData={contractPrintoutFormData}
                 updateFormData={(updatedData)=>updateContractPrinoutInfoFormData(updatedData)}
                 handleInputChange={()=>handleInputChange}
                />
              </Paper>
            )}
        </Box>
      </Box>
    </Layout>
  );
};

export default React.memo(ContractScreen);

