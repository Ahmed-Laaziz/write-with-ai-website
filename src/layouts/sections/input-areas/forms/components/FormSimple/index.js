// FormSimple.js

import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
//import CustomizedDividers from "components/MyComponents";

import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SaveIcon from '@mui/icons-material/Save';

//import { useSpeechSynthesis } from "react-speech-kit";


import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";
import CustomizedDividers from "components/MyComponents/CustomizedDividers";
function FormSimple() {
  const [checked, setChecked] = useState(true);
  const [abstractText, setAbstractText] = useState("");
  const [wordsNumber, setWordsNumber] = useState(20);
  const [generatedAbstract, setGeneratedAbstract] = useState(""); // State to store the generated abstract
  // State to indicate whether the backend request is in progress
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the generated abstract language code
  const [abstractLanguageCode, setAbstractLanguageCode] = useState("en-US");

  useEffect(() => {
    // You can set the language code here based on your requirements
    // For example, if you expect the generated abstract to be in English, you can set it to "en-US"
    setAbstractLanguageCode("en-US");
  }, []);
  //const { speak } = useSpeechSynthesis();

  const handleChecked = () => setChecked(!checked);

  const fetchAbstract = async () => {
    try {
      // Show the spinner while the backend request is in progress
      setIsLoading(true);
      const url = "http://localhost:8008/generate_abstract"; // URL for the backend API
      const requestData = {
        abstract_text: abstractText, // Send the user input as a parameter in the request body
        words_to_generate: wordsNumber,
      };

      // Make a POST request to your backend API
      const response = await axios.post(url, requestData);

      // Assuming the response contains the generated abstract text as a string
      const generatedAbstractText = response.data;

      // Update the generated abstract in the state
      setGeneratedAbstract(generatedAbstractText);
      setAbstractText(generatedAbstractText);

      console.log("res : " + generatedAbstract);
      console.log(requestData);
    } catch (error) {
      console.error("Error fetching abstract:", error);
    } finally {
      // Hide the spinner after the backend request is completed
      setIsLoading(false);
    }
  };

  const speakGeneratedAbstract = () => {
    if (abstractText) {
      const utterance = new SpeechSynthesisUtterance(abstractText);
      utterance.lang = abstractLanguageCode; // Set the language code
      speechSynthesis.speak(utterance); // Speak the text
    }
  };


  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
          <MKTypography variant="h3" mb={1}>
            Write your research paper with our assistant editor
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
            <Grid spacing={7}>
            <CustomizedDividers />
            </Grid>
            <Grid>
              &nbsp;
            </Grid>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKInput
                    variant="standard"
                    label="Abstract"
                    multiline
                    fullWidth
                    rows={10}
                    value={abstractText} // Bind the value to the state
                    onChange={(e) => setAbstractText(e.target.value)} // Update the state when the user types in the field
                    style={{
                      fontFamily: "Times New Roman, Arial, sans-serif",
                      fontSize: "12pt",
                      textIndent: "1.5em",
                      lineHeight: "1.5",
                      padding: "10px",
                    }}
                  />
                </Grid>


                <Grid>
                  &nbsp;
                </Grid>

                <Grid container>
          <Stack direction="row" alignItems="flex-end" spacing={20}>
                <Grid container item xs={12} lg={4}>
          <MKInput type = "number" defaultValue="20" label="Number of words to generate" onChange={(e) => setWordsNumber(e.target.value)}  variant= "standard" fullWidth />
                </Grid>
                <Grid item xs={12} alignItems="center" ml={-1}>
                  <Switch checked={checked} onChange={handleChecked} />
                  <MKTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    ml={-1}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                    onClick={handleChecked}
                  >
                    I agree the&nbsp;
                  </MKTypography>
                  <MKTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="regular"
                    color="dark"
                  >
                    Terms and Conditions
                  </MKTypography>
                </Grid>
                </Stack>
                </Grid>
                
                <Grid>
                  &nbsp;
                </Grid>

              </Grid>
              

      {/* Conditional rendering for the spinner */}
      {isLoading && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}

              <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={3}>
                  <MKButton
                    type="button"
                    variant="gradient"
                    color="dark"
                    onClick={fetchAbstract} // Fetch the abstract when the button is clicked
                    disabled={isLoading} // Disable the button while the backend request is in progress
                  >
                    Generate Text
                  </MKButton>
                  <MKButton
                    type="button"
                    variant="gradient"
                    color="light"
                    //onClick={fetchAbstract} // Fetch the abstract when the button is clicked
                  >
                    <SaveIcon/>
                  </MKButton>
                  <MKButton
          type="button"
          variant="gradient"
          color="light"
          onClick={speakGeneratedAbstract}
        >
          <RecordVoiceOverIcon/>
          
        </MKButton>
                </Stack>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FormSimple;
