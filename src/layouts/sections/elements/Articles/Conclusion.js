// FormSimple.js

import { useState, useEffect } from "react";
import axios from "axios";
import '../../input-areas/forms/components/FormSimple/styles.css';
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
import PropTypes from 'prop-types';
//import { useSpeechSynthesis } from "react-speech-kit";
import Divider from '@mui/material/Divider';
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import Translate from "../../../../components/MyComponents/Translator/Translate";
// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedDividers from "components/MyComponents/CustomizedDividers";

import TextSelector from "text-selection-react";
function Conclusion({nbrWordsValue, onNbrWordsValueChange,onTextSelect}) {
  //text selection
  // const [color, setColor] = useState("yellow");
  const [show, setShow] = useState(false);
  const markHandler = (html, text) => {
    console.log("text 🦄", text);
    setShow(!show);
  };


  const [checked, setChecked] = useState(true);
  const [abstractText, setAbstractText] = useState("");
  const [wordsNumber, setWordsNumber] = useState(20);
  const [generatedAbstract, setGeneratedAbstract] = useState(""); // State to store the generated abstract
  // State to indicate whether the backend request is in progress
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the generated abstract language code
  const [abstractLanguageCode, setAbstractLanguageCode] = useState("en-US");
  const [showTextSelector, setShowTextSelector] = useState(false);
  const [textSelected, setTextSelected] = useState('');
  useEffect(() => {
    // You can set the language code here based on your requirements
    // For example, if you expect the generated abstract to be in English, you can set it to "en-US"
    setAbstractLanguageCode("en-US");
  }, []);
  //const { speak } = useSpeechSynthesis();

  const handleChecked = () => setChecked(!checked);

  const handleTextSelect = (event) => {
    const selectedText = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd
    );
    onTextSelect(selectedText);
    setTextSelected(selectedText);
    setShowTextSelector(true);
      console.log(selectedText !== '');
  };

  const fetchAbstract = async () => {
    try {
      // Show the spinner while the backend request is in progress
      setIsLoading(true);
      const url = "http://localhost:8008/generate_abstract"; // URL for the backend API
      const requestData = {
        abstract_text: abstractText, // Send the user input as a parameter in the request body
        // words_to_generate: wordsNumber,
        words_to_generate: nbrWordsValue,
      };
      console.log(nbrWordsValue);
      console.log({nbrWordsValue});

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
  
  const handleHighlightButtonClick = () => {
    setShow(!show);
  };


  return (
    <MKBox component="section" py={0}>
      <Container>
        <Grid textAlign="center">
          <MKTypography variant="h4" color="red" fontWeight="bold" mb={0} style={{paddingLeft:"10%", paddingRight:"10%", color:"#1b4080"}}>
           <i>Title : Python as a powerful programming language for Data Science </i> 
          </MKTypography>
        </Grid>
        <Grid>
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
        <Modal open={show} onClose={handleHighlightButtonClick} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="50%"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h4" ><GTranslateIcon/>&nbsp;<span style={{color:"#2C6F89"}}>Translator</span></MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleHighlightButtonClick} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={4}>
              <Translate textToTranslate={textSelected}/>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                {/* <MKButton variant="gradient" color="dark" onClick={handleHighlightButtonClick}>
                  close
                </MKButton> */}
                {/* <MKButton variant="gradient" color="info">
                  save changes
                </MKButton> */}
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
        <div className="text-abstract">
                  <MKInput
                  
                    variant="standard"
                    label="Conclusion"
                    multiline
                    fullWidth
                    rows={10}
                    value={abstractText} // Bind the value to the state
                    onChange={(e) => setAbstractText(e.target.value)} // Update the state when the user types in the field
                    onSelect={handleTextSelect}
                    style={{
                      fontFamily: "Times New Roman, Arial, sans-serif",
                      fontSize: "12pt",
                      textIndent: "1.5em",
                      lineHeight: "1.5",
                      padding: "10px",
                    }}
                  />
                  </div>
                </Grid>


                <Grid>
                  &nbsp;
                </Grid>

                {showTextSelector && (
                <TextSelector
          events={[
            {
              text:"✎" ,
              handler: markHandler,
            },
          ]}
        />
        )}

                {/* <Grid container>
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
                </Grid> */}
                
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

Conclusion.propTypes = {
  nbrWordsValue: PropTypes.number.isRequired,
  onNbrWordsValueChange: PropTypes.func,
  onTextSelect: PropTypes.func.isRequired,
};
export default Conclusion;
