import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MKButton from 'components/MKButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import CustomizedSlider from 'components/MyComponents/CustomizedSlider';
import MKTypography from "components/MKTypography";
import TextField from '@mui/material/TextField';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TranslateIcon from '@mui/icons-material/Translate';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BalanceIcon from '@mui/icons-material/Balance';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MKInput from "components/MKInput";
import SendIcon from '@mui/icons-material/Send';
import { Send } from '@material-ui/icons';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import ChatApp from "components/MyComponents/ChatBot/ChatBot";

import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
//import { Send } from 'material-ui-icons';
import MKAlert from "components/MKAlert";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';

import PropTypes from 'prop-types';
const drawerWidth = 350;

export default function PermanentDrawerRight({onNumberWordsChange, highlightedText, onHighlightButtonClick, onHighlightSummaryButtonClick, onHighlightRelatedButtonClick, onHighlightParaButtonClick}) {

  const [numberWordsValue, setNumberWordsValueValue] = useState(20);

  const handleNumberChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumberWordsValueValue(newValue);
    onNumberWordsChange(newValue);
  };

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //Modal 
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Grid/>
        <Box paddingTop={"6%"} paddingBottom={"4%"}>
        <Divider>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Chip label="Settings" color="info" style={{backgroundColor:'black'}}/>
          </div>

        </Divider>
        </Box>
        
        <List>
        <CustomizedSlider
            label="Temperature"
          />
          <CustomizedSlider
            label="Top K"
          />
<Box width={"100%"} paddingLeft={"10%"} paddingRight={"10%"} paddingBottom={"6%"}>
<ToggleButtonGroup
      color="info"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      fullWidth={true}
      size="small"
    >
      <ToggleButton value="web">GPT-2</ToggleButton>
      <ToggleButton value="android">GPT-3.5 &nbsp;&nbsp;&nbsp;<span style={{color:"red"}}><sub>PRO</sub></span></ToggleButton>
    </ToggleButtonGroup>

    <Box width={"100%"} paddingLeft={"2%"} paddingRight={"10%"} paddingTop={"5%"}>
    <Stack direction="row" alignItems="flex-end" spacing={1}>
        <Grid xs = {8}>
            <MKTypography gutterBottom fontSize={"0.8em"} ><strong>Generated words</strong></MKTypography>
        </Grid>
        <Grid xs = {4}>
        <TextField variant="standard" size="small" type = "number" value={numberWordsValue} onChange={handleNumberChange} defaultValue="20" inputProps={{
    min: "1",
    max: "1000",
    style: {
      textAlign: "center",
      fontFamily:"bold",
      fontSize:"14px"
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5CA2CA", // Replace 'your_desired_border_color' with your preferred color value
      },
    },
  }}
  />
        </Grid>
    </Stack>
    </Box>
    </Box>
        </List>

        <Divider>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Chip label="Generate your abstract" color="info" style={{backgroundColor:'black'}}/>
  </div>
</Divider>

        <Box width={"100%"} paddingLeft={"10%"} paddingRight={"10%"} paddingTop={"6%"} paddingBottom={"6%"}>
        {/* <MKTypography gutterBottom fontSize={"0.8em"} ><strong><i>Most Commonly used sentences!</i></strong></MKTypography> */}


        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
        <MKButton variant="gradient" color="light" fullWidth onClick={toggleModal}>
              <LibraryBooksIcon/>&nbsp;&nbsp;<p style={{fontSize:"0.7em"}}>Common sentences</p>
        </MKButton>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
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
                <MKTypography variant="h5">Common sentences</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={2}>
              <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Sentence categories commonly used in abstracts
        </ListSubheader>
      }
    >


      <ListItemButton onClick={handleClick1}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Background/Rationale:" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>


      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* <ListItemButton sx={{ pl: 4 }}> */}
          <CopyToClipboard text="The increasing importance/interest in">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="The increasing importance/interest in..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
          {/* </ListItemButton> */}
          <Slide direction="down" in={success} unmountOnExit>
            <MKBox position="absolute" top="0.5rem" left={0} width="100%">
              <MKAlert
                width="50%"
                mx="auto"
                color="dark"
                sx={{ minHeight: "2.5rem !important", py: 1, justifyContent: "center" }}
              >
                <MKTypography variant="body2" color="white" fontWeight="regular">
                  Sentence successfully copied!
                </MKTypography>
              </MKAlert>
            </MKBox>
          </Slide>
        </List>
        <List component="div" disablePadding>
        <CopyToClipboard text="With the growing demand for">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="With the growing demand for..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
        </List>
        <List component="div" disablePadding>
        <CopyToClipboard text="Given the challenges of">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="Given the challenges of..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
        </List>
        <List component="div" disablePadding>
        <CopyToClipboard text="In light of recent developments in">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="In light of recent developments in..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Objectives/Goals:" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* <ListItemButton sx={{ pl: 4 }}> */}
          <CopyToClipboard text="This study aims to">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="This study aims to..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
          {/* </ListItemButton> */}
          <Slide direction="down" in={success} unmountOnExit>
            <MKBox position="absolute" top="0.5rem" left={0} width="100%">
              <MKAlert
                width="50%"
                mx="auto"
                color="dark"
                sx={{ minHeight: "2.5rem !important", py: 1, justifyContent: "center" }}
              >
                <MKTypography variant="body2" color="white" fontWeight="regular">
                  Sentence successfully copied!
                </MKTypography>
              </MKAlert>
            </MKBox>
          </Slide>
        </List>
        <List component="div" disablePadding>
        <CopyToClipboard text="The primary objective of this research is to">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="The primary objective of this research is to..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
        </List>
        <List component="div" disablePadding>
        <CopyToClipboard text="Our goal is to investigate/examine/evaluate">
          <ListItemButton onClick={() => setSuccess(true)}>
          
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText secondary="Our goal is to investigate/examine/evaluate..."/>
              <ContentCopyIcon/>
            </ListItemButton>
            </CopyToClipboard>
        </List>
      </Collapse>


    </List>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                  close
                </MKButton>
                {/* <MKButton variant="gradient" color="info">
                  save changes
                </MKButton> */}
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
        <MKButton variant="gradient" color="light" width="70%" onClick={onHighlightButtonClick} disabled={!highlightedText}>
              <TranslateIcon/> <p style={{fontSize:"0.8em"}}>Translation</p>
        </MKButton>
        
        </Stack>


        <Stack direction="row" alignItems="flex-end" spacing={1} marginTop={"2%"}>
        <MKButton variant="gradient" color="light" >
        <BalanceIcon/> &nbsp;<p style={{fontSize:"0.8em"}}>Synonyms</p>
        </MKButton>
        <MKButton variant="gradient" color="light" fullWidth onClick={onHighlightRelatedButtonClick}>
              <InsertLinkIcon/>&nbsp;&nbsp;<p style={{fontSize:"0.8em"}}>Related Articles</p>
        </MKButton>
        
        </Stack>

        <Stack direction="row" alignItems="flex-end" spacing={1} marginTop={"2%"}>
        <MKButton variant="gradient" color="light" width="50%" onClick={onHighlightParaButtonClick} disabled={!highlightedText}>
        <ChangeCircleOutlinedIcon/> &nbsp;<p style={{fontSize:"0.8em"}}>Paraphrasing</p>
        </MKButton>
        <MKButton variant="gradient" color="light" width="50%" onClick={onHighlightSummaryButtonClick} disabled={!highlightedText}>
              <SummarizeOutlinedIcon/>&nbsp;&nbsp;<p style={{fontSize:"0.8em"}}>Summarization</p>
        </MKButton>
        
        </Stack>

        
  
    </List>
        </Box>
        <Divider>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
           <SmartToyIcon/>&nbsp; <Chip color="info" label = "Chatbot" style={{backgroundColor:'black'}}>
            </Chip>
          </div>

        </Divider>
        <Box width={"100%"} paddingLeft={"2%"} paddingRight={"2%"} paddingTop={"2%"} paddingBottom={"1%"}>
          {/* <Box paddingLeft={"2%"} paddingRight={"2%"} paddingBottom={"2%"}
          border="1px solid #cccccc" // Set the border color and style here
          borderRadius="8px" // Set the border radius here
          boxShadow="0px 3px 8px rgba(0, 0, 0, 0.24)" // Set the box shadow here  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          > */}
        {/* <MKInput
                    variant="standard"
                    label=""
                    multiline
                    fullWidth
                    rows={4}
                    disabled
                     // Bind the value to the state
                    //onChange={(e) => setAbstractText(e.target.value)} // Update the state when the user types in the field
                    style={{
                      fontFamily: "Times New Roman, Arial, sans-serif",
                      fontSize: "12pt",
                      textIndent: "1.5em",
                      lineHeight: "1.5",
                      padding: "10px",
                    }}
                  />
                  <Stack direction="row" alignItems="flex-end" spacing={1}>
                    <MKInput
                    size  = "small"
                    fullWidth
                    label="Write your question..."
                    />
                  <MKButton 
                  type="button"
                  variant="gradient"
                  color="dark"
                  size="medium"
                  iconOnly="true"
                  >
                    <Send/>
                  </MKButton> */}
                  <ChatApp/>
                  {/* </Stack> */}
        {/* </Box> */}
        </Box>
      </Drawer>
    </Box>
  );
}
PermanentDrawerRight.propTypes = {
  onNumberWordsChange: PropTypes.func.isRequired,
  highlightedText: PropTypes.string.isRequired,
  onHighlightButtonClick: PropTypes.func.isRequired,
  onHighlightSummaryButtonClick: PropTypes.func.isRequired,
  onHighlightParaButtonClick: PropTypes.func.isRequired,
  onHighlightRelatedButtonClick: PropTypes.func.isRequired,
};