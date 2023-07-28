import * as React from 'react';
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

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

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
  "Bioinformatics",
  "Computational Physics",
  "Computational Chemistry",
];


export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [campaignSettings, setCampaignSettings] = React.useState('');

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
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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
  };

  const handleCampaignSettingsChange = (event) => {
    setCampaignSettings(event.target.value);
  };

  return (
    <Box sx={{ width: '80%' , margin: 'auto', paddingTop: '2rem',}}>
      <Stepper activeStep={activeStep}>
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
      <Grid>
        &nbsp;
      </Grid>
      {activeStep === 0 && (
        <Box sx={{ mt: 2 ,width: '60%', marginLeft: '4%'}}>
          <Typography variant="h6" gutterBottom>
        Computer Science Fields
      </Typography>
          <Autocomplete
            options={computer_science_fields}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose your field"
                variant="outlined"
                value={campaignSettings}
                onChange={handleCampaignSettingsChange}
                
              />
            )}
          />
          <Grid>
        &nbsp;
      </Grid>
        </Box>
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <MKButton 
            type="button"
            variant="gradient"
            color="light"
            onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </MKButton>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
