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

export default function PermanentDrawerRight() {

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
      
    </Box>
  );
}
