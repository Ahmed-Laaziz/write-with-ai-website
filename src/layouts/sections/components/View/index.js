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

import { useState, useEffect } from "react";
import React, {createContext} from "react";


// prop-types is a library for type checking of props
import PropTypes from "prop-types";

// react-copy-to-clipboard components
import { CopyToClipboard } from "react-copy-to-clipboard";

// react-syntax-highlighter components
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

// @mui material components
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slide from "@mui/material/Slide";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAlert from "components/MKAlert";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React base styles
import colors from "assets/theme/base/colors";

import DynamicPDFViewer from "components/MyComponents/Pdf/PdfViewer";

function View({ abstractItem, introductionItem, bodyItem, conclusionItem, code, title, height,rp_id, ...rest }) {
  const { grey } = colors;

  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <MKBox
      width="100%"
      position="relative"
      borderRadius="xl"
      shadow="lg"
      mb={12}
      sx={{ overflow: "hidden" }}
      {...rest}
    >
      <MKBox
        px={3}
        sx={{
          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
            `${borderWidth[1]} solid ${borderColor}`,
        }}
      >
        <Grid container spacing={2} justifyContent="space-between" py={1}>
          <Grid item xs={12} lg={12}>
            <AppBar position="static">
              <Tabs value={activeTab} onChange={handleTabType}>
                <Tab
                  icon={
                    <MKBox
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="fas fa-pen"
                    />
                  }
                  label="Abstract"
                />
                <Tab
                  icon={
                    <MKBox
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="far fa-bookmark"
                    />
                  }
                  label="Introduction"
                />
                <Tab
                  icon={
                    <MKBox
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="fas fa-book"
                    />
                  }
                  label="Body"
                />
                <Tab
                  icon={
                    <MKBox
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="	far fa-edit"
                    />
                  }
                  label="Conclusion"
                />
                <Tab
                  icon={
                    <MKBox
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="fas fa-desktop"
                    />
                  }
                  label="Preview"
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </MKBox>

      <MKBox display={activeTab === 0 ? "block" : "none"} p={4}>
        <MKBox width="100%" p={3}>
          <MKBox
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden"}}
          >
            {abstractItem}
          </MKBox>
        </MKBox>
      </MKBox>


      <MKBox display={activeTab === 1 ? "block" : "none"} p={4}>
        <MKBox width="100%" p={3}>
          <MKBox
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden"}}
          >
            {introductionItem}
          </MKBox>
        </MKBox>
      </MKBox>

      <MKBox display={activeTab === 2 ? "block" : "none"} p={4}>
        <MKBox width="100%" p={3}>
          <MKBox
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden"}}
          >
            {bodyItem}
          </MKBox>
        </MKBox>
      </MKBox>


      <MKBox display={activeTab === 3 ? "block" : "none"} p={4}>
        <MKBox width="100%" p={3}>
          <MKBox
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: "hidden"}}
          >
            {conclusionItem}
          </MKBox>
        </MKBox>
      </MKBox>


      <MKBox display={activeTab === 4 ? "block" : "none"} p={3}>
        <MKBox
          bgColor="grey-100"
          position="relative"
          width="100%"
          borderRadius="xl"
          sx={{ overflow: "hidden" }}
        >
          {/* <CopyToClipboard text={code}>
            <MKButton
              variant="gradient"
              color="dark"
              size="small"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
              onClick={() => setSuccess(true)}
            >
              <MKBox color="white" mr={0.5} className="fas fa-copy" /> Copy
            </MKButton>
          </CopyToClipboard>
          <Slide direction="down" in={success} unmountOnExit>
            <MKBox position="absolute" top="0.5rem" left={0} width="100%">
              <MKAlert
                width="25%"
                mx="auto"
                color="success"
                sx={{ minHeight: "2.5rem !important", py: 1, justifyContent: "center" }}
              >
                <MKTypography variant="body2" color="white" fontWeight="regular">
                  Code successfully copied!
                </MKTypography>
              </MKAlert>
            </MKBox>
          </Slide>
          <SyntaxHighlighter
            language="jsx"
            style={prism}
            showLineNumbers
            customStyle={{
              height,
              maxHeight: "40rem",
              fontSize: "1rem",
              backgroundColor: grey[100],
              padding: "1rem 1rem 1rem 0.25rem",
              overflowY: "scroll",
              margin: 0,
            }}
          >
            {code}
          </SyntaxHighlighter> */}
          <div className="App">
      <DynamicPDFViewer rp_id={rp_id}/>
    </div>
        </MKBox>
      </MKBox>
      
    </MKBox>
  );
}

// Setting default props for the View
View.defaultProps = {
  height: "auto",
};

// Typechecking props for the View
View.propTypes = {
  abstractItem: PropTypes.node.isRequired,
  introductionItem: PropTypes.node.isRequired,
  bodyItem: PropTypes.node.isRequired,
  conclusionItem: PropTypes.node.isRequired,
  code: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
  rp_id: PropTypes.number.isRequired,
};

export default View;



