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
import { styled, useTheme } from '@mui/material/styles';
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

import CssBaseline from '@mui/material/CssBaseline';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TranslateIcon from '@mui/icons-material/Translate';
import ForumIcon from '@mui/icons-material/Forum';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link } from "react-router-dom";
import CenteredFooter from "examples/Footers/CenteredFooter";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
// Routes
import routes from "routes";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    // backgroundColor: 'red', // Set the desired background color
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


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
  const [description, setDescription] = useState("");

  const { studentId } = useParams();
  const navigate = useNavigate();
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addResearchPaper = async (event) => {
    setOpen(true);
    event.preventDefault();
    const title = titleInput;
    const student_id = studentId;
    const rpData = {
      field,
      description,
      title,
      student_id
    };
    try {
      
        // Email does not exist in the database, proceed to add the user
        const response = await axios.post('http://localhost:8086/ResearchPapers/addResearchPaper', rpData);
  
        navigate(`/sections/input-areas/forms/${response.data.id}/${student_id}`);
    
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error('Error:');
    }
  };
  return (

<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1.5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{
                    color: '#246A98'
                  }}/>
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          
          <MKBox bgColor="white" shadow="sm" py={0.25} width="100%">
          <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
          transparent
          relative
        />
        </MKBox>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon sx={{
                    color: '#246A98'
                  }}/> : <p></p>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <HomeIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          <Link to={{
      pathname: "/sections/elements/progress-bars",
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <PostAddIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Add an Artcile" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to={{
      pathname: "/layouts/pages/articles/Translator",
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <TranslateIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Translator" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to={{
      pathname: "/layouts/pages/articles/Chat",
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <ForumIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Text Generator" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
</Link>
<Link to={{
      pathname: "/layouts/pages/articles/Summarizer",
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <TravelExploreIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Explore" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <SettingsIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#246A98'
                  }}
                >
                   <PermPhoneMsgIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Contact Us" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          {/* ))} */}
        </List>
      </Drawer>
      <Box component="main" style={{width:"100%"}}>
      <Box>
    <p style={{marginBottom:"3%"}}>&nbsp;</p>
  </Box>
      <BaseLayout
      title="Write your research paper with AI!"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/input-areas/forms" },
        { label: "Write article" },
      ]}
    >


    
<Box
  sx={{
    width: '100%',
    margin: 'auto',
    paddingTop: '2rem',
    border: '2px solid #ddd', // Add a border (change color if desired)
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a box shadow
    borderRadius: '8px', // Add rounded corners (adjust as needed)
    padding: '1rem', // Add some padding inside the box
  }}
>
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
      {/* <Grid>&nbsp;</Grid> */}
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
          <Typography variant="h6" gutterBottom>
            Add a description
          </Typography>
          <MKInput fullWidth multiline rows={3} 
          placeholder="Type your text here..."
          value={description} // Bind the value to the state
          onChange={(e) => setDescription(e.target.value)}
          />
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
            onClick={addResearchPaper}
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
    <CenteredFooter/>
    </BaseLayout>
    </Box>
    </Box>
  );
}

