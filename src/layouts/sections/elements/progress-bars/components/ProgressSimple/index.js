import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Grid from "@mui/material/Grid";
import MKButton from 'components/MKButton';
import MKTypography from "components/MKTypography";

import Stack from "@mui/material/Stack";

import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CircularProgress from "@mui/material/CircularProgress";

const steps = ['Choose a field', 'Insert a title', 'Choose a type'];

const computer_science_fields = [
  "Artificial Intelligence (AI)",
  "Machine Learning",
  "Data Science",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "Robotics",
  "Data Mining",
  "Deep Learning",
  "Neural Networks",
  "Computer Graphics",
  "Human-Computer Interaction (HCI)",
  "Game Development",
  "Virtual Reality (VR)",
  "Augmented Reality (AR)",
  "Cloud Computing",
  "Big Data",
  "Internet of Things (IoT)",
  "Blockchain Technology",
  "Cryptography",
  "Cybersecurity",
  "Network Security",
  "Software Engineering",
  "Web Development",
  "Mobile App Development",
  "Database Management",
  "Operating Systems",
  "Distributed Systems",
  "Parallel Computing",
  "Computer Networks",
  "Wireless Networks",
  "Internet Technologies",
  "Web Design",
  "Data Analytics",
  "Quantum Computing",
  "Bioinformatics",
  "Health Informatics",
  "Geographic Information Systems (GIS)",
  "Information Retrieval",
  "Computational Biology",
  "Computational Linguistics",
  "Computer Architecture",
  "Embedded Systems",
  "Compilers",
  "Algorithms",
  "Theory of Computation",
  "Formal Methods",
  "Numerical Analysis",
  "Computer Aided Design (CAD)",
  "Computational Physics",
  "Computational Chemistry",
];

const research_paper_types = [
  "Original Research Article",
  "Review Article",
  "Short Communication",
  "Perspective Article",
  "Methodology Article",
  "Survey Article",
  "Conference Paper",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [field, setField] = React.useState('');
  const [type, setType] = React.useState('');
  const [haveTitle, setHaveTitle] = React.useState(null);
  const [titleInput, setTitleInput] = React.useState('');
  const [yesColor, setYesColor] = React.useState('light');
  const [noColor, setNoColor] = React.useState('light');
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  //const [generatedTitle, setGeneratedTitle] = useState(""); // State to store the generated abstract
  // State to indicate whether the backend request is in progress
  const [isLoading, setIsLoading] = useState(false);
  

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //setHaveTitle(null);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    //setHaveTitle(null);
  };

  const handleFieldChange = (event, value) => {
    setField(value);
  };
  const handleTypeChange = (event, value) => {
    setType(value);
  };

  const handleYesOption = () => {
    setHaveTitle(true);
    setYesColor('info');
    setNoColor('light');
  };

  const handleNoOption = () => {
    setHaveTitle(false);
    setNoColor('info');
    setYesColor('light');
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const fetchTitle = async () => {
    try {
      // Show the spinner while the backend request is in progress
      setIsLoading(true);
      const url = "http://localhost:8008/generate_title"; // URL for the backend API
      const requestData = {
        field: field, // Send the user input as a parameter in the request body
      };

      // Make a POST request to your backend API
      const response = await axios.post(url, requestData);

      // Assuming the response contains the generated abstract text as a string
      const generatedTitleText = response.data;

      // Update the generated abstract in the state
      //setTit(generatedTitleText);
      setTitleInput(generatedTitleText);
    } catch (error) {
      console.error("Error fetching abstract:", error);
    } finally {
      // Hide the spinner after the backend request is completed
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', paddingTop: '2rem' }}>
      <Box sx={{ bgcolor: 'white', padding: '1rem' }}>
        <Stepper activeStep={activeStep} 
        
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Grid>&nbsp;</Grid>
      {activeStep === 0 && (
        <Box sx={{ mt: 2, width: '90%', marginLeft: '4%' }}>
          <Typography variant="h6" gutterBottom>
            Choose a field for your research paper
          </Typography>
          <Autocomplete
            options={computer_science_fields}
            getOptionLabel={(option) => option}
            value={field}
            onChange={handleFieldChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose your field"
                variant="outlined"
                fullWidth={true}
                
              />
            )}
          />
          <Grid>&nbsp;</Grid>
        </Box>
      )}
      {activeStep === 1 && (
        <Box sx={{ mt: 2, width: '100%'}}>
          <Grid container justifyContent="center">
          <Typography variant="h6" gutterBottom>
            Do you have already a title about {field} for your research paper?
          </Typography>
          </Grid>
          <Grid>&nbsp;</Grid>
          <Grid container justifyContent="center">
          <Stack direction="row" alignItems="flex-end" spacing={3}>
          
          <MKButton type="button"
                    variant="gradient"
                    color={yesColor}
                    circular={true}
                    onClick={handleYesOption}
                    >
                      Yes
          </MKButton>
          <MKButton type="button"
                    variant="gradient"
                    color={noColor}
                    circular={true}
                    onClick={handleNoOption}>
                      No
          </MKButton>
          </Stack>
          </Grid>
          <Grid>
            &nbsp;
          </Grid>
          
          {haveTitle === true && (
            
            <Box sx={{ mt: 2, width: '90%', marginLeft: '4%' }}>
              <Typography variant="h6" gutterBottom>
            Insert you title :
          </Typography>
              <TextField
                label="Enter your title"
                variant="outlined"
                value={titleInput}
                fullWidth={true}
                onChange={(e) => setTitleInput(e.target.value)}
              />
              
            </Box>
          )}
          {haveTitle === false && (
            <Box sx={{ mt: 2, width: '90%', marginLeft: '4%' }}>
              <Typography variant="h6" gutterBottom>
            Title generated with AI :
          </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1}>
              <TextField
                // label="Enter your title"
                variant="outlined"
                value={titleInput}
                fullWidth={true}
                onChange={(e) => setTitleInput(e.target.value)}
              />
              <MKButton 
                    type="button"
                    variant="gradient"
                    color='light'
                    size="large"
                    onClick={fetchTitle} // Fetch the abstract when the button is clicked
                    disabled={isLoading}
                    >
                      Generate
          </MKButton>
              </Stack>
            </Box>
          )}
          <Grid>&nbsp;</Grid>
          {/* Conditional rendering for the spinner */}
      {isLoading && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}

        </Box>
      )}

      {activeStep === steps.length - 1 &&(
          <Box sx={{width: '90%', marginLeft: '4%' }}>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography variant="h6" gutterBottom>
            Choose the type of your research paper
          </Typography>
          <MKButton variant="gradient" color="light" circular={true} iconOnly = {true} onClick={toggleModal}>
            ?
          </MKButton>
          </Stack>
          <Grid>
            &nbsp;
          </Grid>
          
          {/* <Stack direction="row" alignItems="flex-end" spacing={1}> */}
          <Autocomplete
            options={research_paper_types}
            getOptionLabel={(option) => option}
            value={type}
            onChange={handleTypeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose option"
                variant="outlined"
                fullWidth={true}
              />
            )}
          />
          
          {/* </Stack> */}
          
          <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Research papers types:</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
                <MKTypography variant="body2" color="secondary" fontWeight="regular">
<strong>Original Research Articles</strong>: These articles describe original and new research conducted by the authors.
<br/>
<br/>
<strong>Review Articles</strong>: These articles provide an overview of a specific research field and synthesize the findings and conclusions from previous works.
<br/>
<br/>
<strong>Perspective Articles</strong>: These articles offer a critical perspective or informed opinion on a specific topic, without presenting new empirical data. 
<br/>
<br/>
<strong>Methodology Articles</strong>: These articles focus on detailed descriptions of new research methods, techniques, or protocols, enabling other researchers to reproduce the results.
<br/>
<br/>
<strong>Survey Articles</strong>: These articles provide a comprehensive synthesis of existing literature on a given topic, offering a comprehensive overview of studies conducted in that area.

                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                  close
                </MKButton>
                <MKButton variant="gradient" color="info">
                  save changes
                </MKButton>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
          <Grid>&nbsp;</Grid>
        </Box>
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
        {/* <Grid container item xs={12} lg={6} py={1} mx="auto">  */}
          <Stack direction="row" alignItems="flex-end" spacing={2}>
          <MKInput sx={{width:"50%"}} label= "Field" success value={field} disabled/>
          <MKInput sx={{width:"50%"}} label= "Type"success value={type} disabled/>
          </Stack>
        {/* </Grid> */}
        <Grid>
          &nbsp;
        </Grid>

        {/* <Grid container item xs={12} lg={4} py={1} mx="auto"> */}
        <Stack direction="row" alignItems="flex-end" spacing={6}>
          
          <MKInput fullWidth label="Title" success value={titleInput} disabled/>
        </Stack>
        {/* </Grid> */}
        <Grid>
          &nbsp;
        </Grid>



        <Stack direction="row" alignItems="flex-end" spacing={3}>
            <Box sx={{ flex: '1 1 auto' }} />
            <MKButton 
            type = "button" 
            variant="gradient" 
            color="secondary" 
            onClick={handleReset}
            >
              <RestartAltIcon/>&nbsp;&nbsp;Modify
            </MKButton>
            <MKButton 
            type = "button" 
            variant="gradient" 
            color="light" 
            onClick={handleClick}
            >
              <SaveIcon/>&nbsp;&nbsp;Save
            </MKButton>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          A new Research paper was created!
        </Alert>
      </Snackbar>
          </Stack>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <MKButton
              type="button"
              variant="gradient"
              color="light"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </MKButton>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <MKButton
              type="button"
              variant="gradient"
              color="secondary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </MKButton>
            </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

