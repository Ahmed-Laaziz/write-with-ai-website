import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
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
import CardComponent from 'components/MyComponents/Cards/Card';
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import axios from "axios";
const drawerWidth = 240;
// Routes
import routes from "routes";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import { Link } from "react-router-dom";
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
    backgroundColor: 'red', // Set the desired background color
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

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  const [articles, setArticles] = useState([]); // State to store articles
  const { studentId } = useParams();

  useEffect(() => {
    // Define a function to fetch articles
    const fetchArticles = async () => {
      try {
        // console.log(student_id);
        const response = await axios.get(`http://localhost:8086/ResearchPapers/getAllResearchPapersByStudentId/${studentId}`);
        // Assuming your API returns articles as an array, update the state
        setArticles(response.data);
        console.log(response.data);
        // console.log(student_id);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Call the fetchArticles function when the component mounts
    fetchArticles();
  }, []); // Empty dependency array to run once on component mount
  

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
      title="All Articles"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/input-areas/forms" },
        { label: "Write article" },
      ]}
    >
        
        <Grid container spacing={2} style={{marginTop:"1%"}}>
      {articles.map((article) => (
        <Grid key={article.id} item xs={12} md={4}>
          <CardComponent
          articleId={article.id}
          studentId = {studentId}
          articleField={article.field}
            title={article.title}
            subheader={article.date}
            image={article.image}
            description={article.description}
          />
        </Grid>
      ))}
    </Grid>
        {/* <PermanentDrawerRight 
        onNumberWordsChange={handleNumberChange} 
        highlightedText={highlightedText}
        onHighlightButtonClick={handleHighlightButtonClick}
        onHighlightSummaryButtonClick={handleHighlightSummaryButtonClick}/> */}
     </BaseLayout>
      </Box>
    </Box>
  );
}