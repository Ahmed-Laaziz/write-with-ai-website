import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
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
import FormSimple from "layouts/sections/input-areas/forms/components/FormSimple";
import Introduction from "layouts/sections/elements/Articles/Introduction";
import Conclusion from 'layouts/sections/elements/Articles/Conclusion';
import Body from "layouts/sections/elements/Articles/Body";
import PermanentDrawerRight from "components/MyComponents/Drawers/PermanentDrawerRight";
import View from "layouts/sections/components/View";
import dropdownAndDropupCode from "layouts/sections/elements/dropdowns/components/DropdownAndDropup/code";
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TranslateIcon from '@mui/icons-material/Translate';
import ForumIcon from '@mui/icons-material/Forum';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SettingsIcon from '@mui/icons-material/Settings';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import BaseLayout from "layouts/sections/components/BaseLayout";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import MKTypography from "components/MKTypography";
import Slide from "@mui/material/Slide";
import ChatApp from "components/MyComponents/ChatBot/ChatBot";
import Modal from "@mui/material/Modal";
import MKButton from 'components/MKButton';
import Translate from '../Translator/Translate';
import Summarizer from '../Summarizer/Summarize';
import Paraphraser from '../Paraphrasing/Paraphrasing';
import Related from '../../../layouts/pages/articles/Related';
import axios from "axios";
// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
//import { Send } from 'material-ui-icons';
import MKAlert from "components/MKAlert";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
const drawerWidth = 240;
// Routes
import routes from "routes";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SummarizeIcon from '@mui/icons-material/Summarize';
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



export default function MiniDrawer() {

  //TITLE
const { articleId } = useParams(); // Assuming you're using articleId from the route parameter
const [title, setTitle] = useState(''); // State to store the fetched title
const [conclusion, setConclusion] = useState(''); // State to store the
const [bibliographie, setBibliographie] = useState(''); // State to store the
const [field, setField] = useState(''); // State to store the
const [student_id, setStudentID] = useState(null); // State to store the
const [description, setDescription] = useState("");
const [file_name, setFileName] = useState("");
const [introduction, setIntroduction] = useState("");
const [abstractText, setAbstractText] = useState("");
useEffect(() => {
  // Fetch the title from the backend API
  const fetchTitle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8086/ResearchPapers/getResearchPaperById/${articleId}` // Replace with your actual API endpoint
      );
      setTitle(response.data.title); // Update the state with the fetched title
      setConclusion(response.data.conclusion); // Update the state with the fetched
      setIntroduction(response.data.introduction); // Update the state with the fetched
      setBibliographie(response.data.bibliographie); // Update the state
      setFileName(response.data.fileName); // Update the state with the
      setDescription(response.data.description); // Update the state with the
      setStudentID(response.data.student_id); // Update the state with the
      if (response.data.abstractSection != null){
      setAbstractText(response.data.abstractSection);
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  fetchTitle(); // Call the fetchTitle function when the component mounts
}, [articleId]); // Include articleId in the dependency array to fetch when it changes


  //extern variables
  const [numberValue, setNumberValue] = useState(20);

  const handleNumberChange = (newValue) => {
    setNumberValue(newValue);
  };
  const [highlightedText, setHighlightedText] = useState('');

  const handleTextSelect = (selectedText) => {
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

  const handleHighlightParaButtonClick = () => {
    //console.log(highlightedText);
    setOpenParaphraser(!openParaphraser);
    setShowParaphraser(!showParaphraser);
  };

  const handleHighlightRelatedButtonClick = () => {
    //console.log(highlightedText);
    setOpenRelated(!openRelated);
    setShowRelated(!showRelated);
    console.log("related clicked");
  };

  const [show, setShow] = useState(false);
  const [showSummarizer, setShowSummarizer] = useState(false);
  const [showParaphraser, setShowParaphraser] = useState(false);
  //const toggleModal = () => setShow(!show);

  const [openTranslator, setOpenTranslator] = React.useState(false);
  const [openSummarizer, setOpenSummarizer] = React.useState(false);
  const [openParaphraser, setOpenParaphraser] = React.useState(false);
  const [openRelated, setOpenRelated] = React.useState(false);
  const [showRelated, setShowRelated] = React.useState(false);

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  // const handleClickTranslator = () => {
  //   setOpenTranslator(!openTranslator);
  // };


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  // const { articleId } = useParams(); // Assuming you're using articleId from the route 
 



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
      <Drawer variant="permanent" open={open} sx={{ backgroundColor: 'blue' }}>
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
      pathname: `/layouts/pages/articles/Home/${student_id}`
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
      pathname: `/layouts/pages/articles/Options/${student_id}`
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
      pathname: `/layouts/pages/articles/Translator/${student_id}`,
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
      pathname: `/layouts/pages/articles/Chat/${student_id}`,
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
      pathname: `/layouts/pages/articles/Summarizer/${student_id}`,
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

        <Modal open={showParaphraser} onClose={handleHighlightParaButtonClick} sx={{ display: "grid", placeItems: "center" }}>
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
                <MKTypography variant="h4" ><DocumentScannerTwoToneIcon/>&nbsp;<span style={{color:"#2C6F89"}}>Paraphrasing</span></MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleHighlightParaButtonClick} />
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



        <Modal open={showRelated} onClose={handleHighlightRelatedButtonClick} sx={{ display: "grid", placeItems: "center" }}>
  <Slide direction="down" in={showRelated} timeout={500}>
    <MKBox
      position="relative"
      width="70%"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      bgColor="white"
      shadow="xl"
    >
      <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <MKTypography variant="h4" ><DocumentScannerTwoToneIcon/>&nbsp;<span style={{color:"#2C6F89"}}>Related Research Papers</span></MKTypography>
        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleHighlightRelatedButtonClick} />
      </MKBox>
      <Divider sx={{ my: 0 }} />

      {/* Wrap the content in a div with max-height for scrolling */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <MKBox p={4}>
          {/* <Translate textToTranslate={highlightedText}/> */}
          <Related rpTitle={title}/>
        </MKBox>
      </div>

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


      <BaseLayout
      // title="Write your article with AI"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/input-areas/forms" },
        { label: "Write article" },
      ]}
    >
      <View 
      title="Dropdown and Dropup"  
      rp_id = {articleId}
      code={dropdownAndDropupCode} 
      abstractItem={<FormSimple nbrWordsValue={numberValue} onTextSelect={handleTextSelect}/>}
      introductionItem={<Introduction nbrWordsValue={numberValue} onTextSelect={handleTextSelect}/>}
      bodyItem={<Body nbrWordsValue={numberValue} onTextSelect={handleTextSelect}/>}
      conclusionItem={<Conclusion nbrWordsValue={numberValue} onTextSelect={handleTextSelect}/>}
      style={{width:"900px"}}
      >
      </View>
        <PermanentDrawerRight 
        onNumberWordsChange={handleNumberChange} 
        highlightedText={highlightedText}
        onHighlightButtonClick={handleHighlightButtonClick}
        onHighlightSummaryButtonClick={handleHighlightSummaryButtonClick}
        onHighlightParaButtonClick={handleHighlightParaButtonClick}
        onHighlightRelatedButtonClick={handleHighlightRelatedButtonClick}
        />
        
     </BaseLayout>
      </Box>
    </Box>
  );
}