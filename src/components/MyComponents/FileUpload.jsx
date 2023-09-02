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
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import axios from "axios";


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TranslateIcon from '@mui/icons-material/Translate';
import ForumIcon from '@mui/icons-material/Forum';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import BaseLayout from "layouts/sections/components/BaseLayout";
import CenteredFooter from "examples/Footers/CenteredFooter";

import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import BalanceIcon from '@mui/icons-material/Balance';

import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import Translate from "components/MyComponents/Translator/Translate"
// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedDividers from "components/MyComponents/CustomizedDividers";
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import Summarizer from 'components/MyComponents/Summarizer/Summarize';
import Paraphraser from 'components/MyComponents/Paraphrasing/Paraphrasing';
import routes from "routes";
import {useParams} from "react-router-dom";

import './style.css';
const fileTypes = ["PDF"];
const drawerWidth = 240;
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


export default function FileUploadPage() {
  const {studentId} = useParams();
    const [file, setFile] = useState(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const handleChange = (file) => {
      setFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // `event.target.result` contains the data as a base64 encoded string
         // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const [showEditor, SetShowEditor] = useState(false);
    const [extractedText, SetExtractedText] = useState('');
    const handleSubmit = async () => {
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file); // 'file' should match the name used in your FastAPI endpoint
    
          const response = await axios.post('http://localhost:8008/uploadpdf', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Log the response from the backend to the console
          console.log("res " + response.data.text);
          SetShowEditor(true);
          SetExtractedText(response.data.text)
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    const handleRemoveClick = () => {
      setFile(null);
    }

    const [textSelected, setTextSelected] = useState('');

    const handleTextSelect = (event) => {
      const selectedText = event.target.value.substring(
        event.target.selectionStart,
        event.target.selectionEnd
      );
      onTextSelect(selectedText);
      setTextSelected(selectedText);
    };

    const [highlightedText, setHighlightedText] = useState('');

  const onTextSelect = (selectedText) => {
    setHighlightedText(selectedText);
  };

  const handleHighlightButtonClick = () => {
    console.log(highlightedText);
    setOpenTranslator(!openTranslator);
    setShow(!show);
  };

  
  const handleHighlightSummaryButtonClick = () => {
    //console.log(highlightedText);
    setOpenSummarizer(!openSummarizer);
    setShowSummarizer(!showSummarizer);
  };

  const handleHighlightRewordButtonClick = () => {
    //console.log(highlightedText);
    setOpenParaphraser(!openParaphraser);
    setShowParaphraser(!showParaphraser);
  };

  const [show, setShow] = useState(false);
  const [showSummarizer, setShowSummarizer] = useState(false);
  const [showParaphraser, setShowParaphraser] = useState(false);
  //const toggleModal = () => setShow(!show);

  const [openTranslator, setOpenTranslator] = React.useState(false);
  const [openSummarizer, setOpenSummarizer] = React.useState(false);
  const [openParaphraser, setOpenParaphraser] = React.useState(false);



  return (
    <Box component="main" style={{width:"100%"}}>
      <Box>
    {/* <p style={{marginBottom:"3%"}}>&nbsp;</p> */}
  </Box>
      <BaseLayout
      title=""
      breadcrumb={[
        // { label: "Page Sections", route: "/sections/input-areas/forms" },
        // { label: "Write article" },
      ]}
    >

    
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
            <MenuIcon />
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
          <Link to={{
      // pathname: `/sections/elements/progress-bars/${studentId}`,
      pathname: `/layouts/pages/articles/Home/${studentId}`
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
                   <HomeIcon fontSize='medium'/>
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          <Link to={{
      // pathname: `/sections/elements/progress-bars/${studentId}`,
      pathname: `/layouts/pages/articles/Options/${studentId}`
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
      pathname: `/layouts/pages/articles/Translator/${studentId}`,
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
      pathname: `/layouts/pages/articles/Chat/${studentId}`,
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
      pathname: `/layouts/pages/articles/Summarizer/${studentId}`,
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
                <ListItemText primary="Summarizer" sx={{ opacity: open ? 1 : 0 }} />
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
      <Box component="main">




{(file && showEditor) ? (
        <>
          {/* Display the extracted text using the TextDisplayForm component */}
          <Box width="100%">
          <Stack direction="row" spacing={2} marginBottom={"1%"} marginLeft={"1%"}  marginRight={"1%"} marginTop={"2%"}>
      <MKButton variant="gradient" startIcon={<TranslateIcon />} color="light" fullWidth onClick={handleHighlightButtonClick} disabled={!highlightedText}>
        Translate
      </MKButton>
      <MKButton variant="gradient" startIcon={<SummarizeOutlinedIcon />} color="light" fullWidth onClick={handleHighlightSummaryButtonClick} disabled={!highlightedText}>
        Summarize
      </MKButton>
      <MKButton variant="gradient" startIcon={<ChangeCircleOutlinedIcon />} color="light" fullWidth onClick={handleHighlightRewordButtonClick} disabled={!highlightedText}>
        Paraphrasing
      </MKButton>
      <MKButton variant="gradient" startIcon={<BalanceIcon />} color="light" fullWidth disabled={!highlightedText}>
        Synonyms
      </MKButton>
    </Stack>
    <textarea
  style={{
    width: '1000px',
    height: '500px', // Adjust the height to match your desired number of rows
    fontFamily: "Times New Roman, Arial, sans-serif",
    fontSize: "22px", // Adjust the font size as needed
    color: "black",
    padding: '50px', // Add padding to the left and top to mimic a professional paper
    border: '1px solid #ccc', // Add a border for better visibility
    borderRadius: '14px', // Add rounded corners for a cleaner look
    outline: 'none', // Remove the blue outline when clicked
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
  }}
  value={extractedText}
  // onChange={(e) => handleTextChange(e.target.value)}
  onSelect={handleTextSelect}
/>







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
              <Translate textToTranslate={highlightedText}/>
              {/* <Summarizer textToSummarize={highlightedText}/> */}
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

        <Modal open={showSummarizer} onClose={handleHighlightSummaryButtonClick} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={showSummarizer} timeout={500}>
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
                <MKTypography variant="h4" ><DocumentScannerTwoToneIcon/>&nbsp;<span style={{color:"#2C6F89"}}>Summarizer</span></MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleHighlightSummaryButtonClick} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={4}>
              {/* <Translate textToTranslate={highlightedText}/> */}
              <Summarizer textToSummarize={highlightedText}/>
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



        <Modal open={showParaphraser} onClose={handleHighlightRewordButtonClick} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={showParaphraser} timeout={500}>
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
                <MKTypography variant="h4" ><DocumentScannerTwoToneIcon/>&nbsp;<span style={{color:"#2C6F89"}}>Paraphraser</span></MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleHighlightRewordButtonClick} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={4}>
              {/* <Translate textToTranslate={highlightedText}/> */}
              <Paraphraser textToReword={highlightedText}/>
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
          </Box>
        </>
      ) : (
        <>
        <MKBox px={1}  zIndex={2}>
          <Card sx={{padding:"2%", width:"90%", height:"30%", marginTop:"4%", marginLeft:"5%"}}>
        <CardActionArea>
        <p>{file ? 
          <>
          <MKBox 
          sx={{
            backgroundColor: '#E2EEFF',
            borderRadius: '10px',
          }}
          // marginTop="2%"
          >
          <Stack direction="row" spacing={2}>
          
          <Grid item xs={2} paddingTop={"3%"}>
            <img src={PdfLogo} alt="PDF file" width={"70%"} height={"60%"}/>
          </Grid>
          <Grid item xs={6} paddingTop={"5%"}>
            <MKTypography verticalAlign="sub" sx={{fontSize:"15px"}}>{file.name}</MKTypography>
          </Grid>
          <Grid item xs={2} paddingTop={"5%"}>
            <MKTypography verticalAlign="sub" sx={{fontSize:"15px"}}>{file.size}</MKTypography>
          </Grid>
          <Grid item xs={2} paddingTop={"4%"}>
            <MKButton variant="gradient" type="button" color="dark" onClick={handleRemoveClick} size="medium" iconOnly={true} circular={true}><DeleteIcon/></MKButton>
          </Grid>
          
          </Stack>
          </MKBox>
          <MKBox display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingTop="2%"
                  
                  >
          <MKButton fullWidth={true} variant ="gradient" type="button" color="light" size="large" width="100%" sx={{marginBottom:"2%"}} onClick={handleSubmit}>Submit</MKButton>
          </MKBox>
          </>
          
            :
            <>
            <CardContent style={{ textAlign: 'center'}}>
    <Typography gutterBottom variant="h5" component="div">
    AI-Powered PDF Wizardry
    </Typography>
    <p style={{ fontFamily: 'inherit' , color:"gray", width:"650px"}}>
    Introducing our PDF processing tool, a user-friendly solution for effortless document management. With a simple drag-and-drop interface, you can upload PDFs with ease. Summarize, translate, and reformulate content quickly to enhance your documents. Say goodbye to manual tasks and hello to streamlined work processes. Unlock the full potential of your PDFs and experience productivity like never before.
    </p>
  </CardContent>
  
          {/* <CardActions>
          <MKButton type="button" size="small" color="info" fullWidth disabled>
            <DrawIcon fontSize='large'/>&nbsp;Start
          </MKButton>
        </CardActions> */}
        </>
          }</p>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            hoverTitle="Drop Here"
          >
            <MKBox sx={{ p: 2, border: "1px dashed #84ACC7" , borderRadius:"10px"}} position="relative">
            <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
              <img  src={UploadIcon} width={"10%"} height={"10%"}/>
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
          
          </CardActionArea>
          </Card>
  
        </MKBox>
        <CenteredFooter/>
  </>
      )}

      </Box>
      
      </Box>
      
      </BaseLayout>
    </Box>

      
  );
}
