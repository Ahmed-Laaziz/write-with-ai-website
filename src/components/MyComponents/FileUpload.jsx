import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function FileUploadPage() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
  return (
    <div>
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          hoverTitle="Drop Here"
        >
          <MKBox sx={{ p: 2, border: "1px dashed darkBlue" }} position="relative" width="500px">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
            <CloudUploadIcon fontSize="large" justifyContent="center" alignItems="center" sx={{alignItems:"center", position:"center"}}/>
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
            <MKButton type="button" color="dark">
              Browse a file
            </MKButton>
            </Grid>

          </MKBox>
        </FileUploader>
        <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
      </MKBox>
    </div>
  );
}
