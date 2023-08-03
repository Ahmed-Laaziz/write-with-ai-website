import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadIcon from 'assets/images/pdf-logos/upload.svg';
import PdfLogo from 'assets/images/pdf-logos/pdf_img.svg'
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';


const fileTypes = ["PDF"];

export default function FileUploadPage() {
    const [file, setFile] = useState(null);
    
    const handleChange = (file) => {
      setFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // `event.target.result` contains the data as a base64 encoded string
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveClick = () => {
      setFile(null);
    }
  return (
    
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          hoverTitle="Drop Here"
        >
          <MKBox sx={{ p: 2, border: "1px dashed lightBlue" }} position="relative">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
            <img  src={UploadIcon} width={"20%"} height={"20%"}/>
            </Grid>

            <Grid>&nbsp;</Grid>

            <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
            <MKTypography>Drag and Drop your PDF File Here</MKTypography>
            </Grid>

            <Grid>&nbsp;</Grid>

            <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <MKTypography fontWeight="light" >OR</MKTypography>
            </Grid>

            <Grid>&nbsp;</Grid>

            <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
            <MKButton type="button" color="info">
              Browse a file
            </MKButton>
            </Grid>

          </MKBox>
        </FileUploader>
        <p>{file ? 
        <>
        <MKBox 
        sx={{
          backgroundColor: '#E2EEFF',
          borderRadius: '10px'
        }}
        marginTop="2%"
        >
        <Stack direction="row" spacing={2}>
        
        <Grid item xs={2} paddingTop={"3%"}>
          <img src={PdfLogo} alt="PDF file" width={"100%"} height={"80%"}/>
        </Grid>
        <Grid item xs={6} paddingTop={"7%"}>
          <MKTypography verticalAlign="sub" sx={{fontSize:"15px"}}>{file.name}</MKTypography>
        </Grid>
        <Grid item xs={2} paddingTop={"7%"}>
          <MKTypography verticalAlign="sub" sx={{fontSize:"15px"}}>{file.size}</MKTypography>
        </Grid>
        <Grid item xs={2} paddingTop={"6%"}>
          <MKButton variant="gradient" type="button" color="dark" onClick={handleRemoveClick} size="medium" iconOnly={true} circular={true}><DeleteIcon/></MKButton>
        </Grid>
        
        </Stack>
        </MKBox>
        <MKBox display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="2%"
                >
        <MKButton fullWidth={true} variant ="gradient" type="button" color="light" size="large" width="100%">Submit</MKButton>
        </MKBox>
        </>
        
          : <div></div>
        }</p>
      </MKBox>
  );
}
