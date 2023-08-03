/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import FileUploadPage from "components/MyComponents/FileUpload";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Dots from "assets/images/pdf-logos/dots.svg"
import AiFile from "assets/images/pdf-logos/ai-file.svg"

// Images
import bgImage from "assets/images/bg-coworking.jpeg";

function HeaderOne() {
  return (
    <MKBox component="header" position="relative" height="100%">
      <MKBox>
        <Container>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" fullWidth={true} height="100%" flexItem sx={{ bgcolor: "secondary.dark" }}></Divider>}
          spacing={2}
        >

              <MKBox sx={{ p: 2, border: "1px dashed lightBlue" }} width="100%">
              <center><img src={AiFile} alt="Ai File" width="20%" height="20%"/>
                <p>Write you research paper with our assistant for free!</p></center>
              </MKBox>

             <MKBox width = "10%">
              <img src = {Dots} width ="80%" height="60%"/>
             </MKBox>

              <FileUploadPage width="100%"/>
        </Stack>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderOne;
