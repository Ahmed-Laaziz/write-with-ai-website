import react from "react";
import {useState, useEffect} from "react"
import MKButton from "components/MKButton";
import Button from '@mui/material/Button';
import MKBox from "components/MKBox";
import { TextField } from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import progressSimpleCode from "layouts/sections/elements/progress-bars/components/ProgressSimple/code";
import SummarizeIcon from '@mui/icons-material/Summarize';
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
export default function Paraphraser({textToReword}){
    const theme = createTheme({
        palette: {
          customColor: {
            main: '#2188AF', // Replace with your desired color value
          },
        },
      });

    const [isIconChanged, setIsIconChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [texttoReword, setTextToReword] = useState(textToReword);
    const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState("");
    const [show, setShow] = useState(false);
    const handleCopyClick = () => {
        setIsIconChanged(true);
    
        setTimeout(() => {
            setIsIconChanged(false)
        }, 2000);
      };
    
        const fetchSummarization = async () => {
            setGeneratedSummary("")
            try {
              // Show the spinner while the backend request is in progress
              setIsLoading(true);
              setIsSummaryGenerated(false);
              const url = "http://localhost:8008/get_paraphrasing"; // URL for the backend API
              const requestData = {
                text: textToReword, // Send the user input as a parameter in the request body
                // words_to_generate: wordsNumber,
              };
        
              // Make a POST request to your backend API
              const response = await axios.post(url, requestData);
        
              // Assuming the response contains the generated abstract text as a string
              const generatedSummary = response.data;
        
              // Update the generated abstract in the state
              setGeneratedSummary(generatedSummary);
              //setTran(generatedAbstractText);
        
             // console.log("res : " + generatedAbstract);
              console.log(requestData);
            } catch (error) {
              console.error("Error fetching abstract:", error);
            } finally {
              // Hide the spinner after the backend request is completed
              setIsLoading(false);
              setIsSummaryGenerated(true);
            }
          };
    return(
        <MKBox>
            <TextField
        // label="Outlined custom color"
        // color="customColor" // Use the custom color you defined
        focused
        defaultValue={textToReword}
        multiline
        placeholder='Type your text here...'
        rows={6}
        sx={{ width: '100%',}}
        onChange={(e) => setTextToReword(e.target.value)} 
      />
            <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"3%"}}>
        <Button
          variant="contained"
          color="customColor" // Use the custom color you defined
          sx={{ width: '25%' ,color: '#FFFFFF' }}
          onClick={fetchSummarization}
          disabled={isLoading}
        >
          <SummarizeIcon fontSize='small'/>&nbsp;Paraphrase
        </Button>
      </div>
    </ThemeProvider>
    <ThemeProvider theme={theme}>
      <TextField
        // label="Outlined custom color"
        color="customColor" // Use the custom color you defined
        multiline
        rows={6}
        value={generatedSummary}
        sx={{ width: '100%', marginTop: '3%' }}
      />
    </ThemeProvider>
    {isLoading && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}

{isSummaryGenerated && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CopyToClipboard text={generatedSummary} fontSize="large">
          <MKButton type = "button"
                  variant ="gradient"
                color="secondary"
                  iconOnly = {true}
                  circular = {true}
                  size = "medium"
                  onClick={handleCopyClick}
                  >
          {isIconChanged ? <CheckIcon fontSize="large"/> : <ContentCopyIcon />}
        </MKButton>
          </CopyToClipboard>
        </Grid>
      )}
        </MKBox>
    )
}

Paraphraser.propTypes = {
    textToReword: PropTypes.string.isRequired,
  };