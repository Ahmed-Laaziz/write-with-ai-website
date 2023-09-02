// FormSimple.js
import * as React from 'react';
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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
function Body({nbrWordsValue, onNbrWordsValueChange,onTextSelect}) {


  const [openNotification, setOpenNotification] = React.useState(false);

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseNotification}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //text selection
  // const [color, setColor] = useState("yellow");
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = (id) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const markHandler = (html, text) => {
    console.log("text 🦄", text);
    setShow(!show);
  };

  const { articleId } = useParams();
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

  const [sectionText, setSectionText] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);
  // Add a state variable to manage the text of each section
  const [sectionTexts, setSectionTexts] = useState({});
  const [aiResponse, SetAiResponse] = useState('');
  const handleSectionTextChange = (event) => {
    setSectionText(event.target.value);
  };

  const addSection = async () => {
    try {
      // Prepare the data for the PUT request
      const requestData = {
        name: sectionText,
        rp_id: articleId,
      };

      // Make a PUT request to update the abstract text
      const response = await axios.post(
        `http://localhost:8086/Sections/addSection`,
        requestData
      );

      // Update the sections state to include the new section
    setSections((prevSections) => [...prevSections, response.data]);

    // Clear the sectionText input
    setSectionText('');

      // Assuming your backend returns the updated research paper object
      console.log(response);

      // Update the abstract text in the state
      // setAbstractText(updatedResearchPaper.abstractSection);
      toggleVisibility1()
      setOpenNotification(true);
    } catch (error) {
      console.error('Error updating abstract text:', error);
    }
  };
  useEffect(() => {
    // You can set the language code here based on your requirements
    // For example, if you expect the generated abstract to be in English, you can set it to "en-US"
    setAbstractLanguageCode("en-US");
  }, []);
  //const { speak } = useSpeechSynthesis();
  const theme = createTheme({
    palette: {
      customColor: {
        main: '#D2DBDC', // Replace with your desired color value
      },
    },
  });

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

  const getSections = async () => {
    try {
      // Show the spinner while the backend request is in progress
      SetAiResponse('');
      setIsLoading(true);
      const url = "http://localhost:8008/generate_sections"; // URL for the backend API
      const requestData = {
        abstract: abstractText, // Send the user input as a parameter in the request body
      };

      // Make a POST request to your backend API
      const response = await axios.post(url, requestData);
      console.log(abstractText)
      // Assuming the response contains the generated abstract text as a string
      const generatedSections = response.data;

      // Update the generated abstract in the state
      SetAiResponse(generatedSections)
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

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  const [isVisible1, setIsVisible1] = useState(true);

  const toggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };



  const [sections, setSections] = useState([]);
  // Function to fetch sections from the backend
  const fetchSections = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/Sections/getAllSectionsByRpId/${articleId}`); // Replace 'researchPaperId' with the actual ID
      // console.log("sec : " + response.data);
      setSections(response.data);
      // console.log("sections : " + response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  useEffect(() => {
    // Call the fetchSections function when the component mounts
    fetchSections();
  }, []); // Empty dependency array to run the effect only once
  const handleTextChange = (id, newText) => {
    // Update the text state for the corresponding section
    setSectionTexts((prevSectionTexts) => ({
      ...prevSectionTexts,
      [id]: newText,
    }));
  };

  const [openSections, setOpenSections] = useState({});




  const saveSection = async (sectionId) => {
    try {
      console.log(sectionTexts[sectionId])
      // Find the section by ID
      const sectionToSave = sections.find((section) => section.id === sectionId);

      if (!sectionToSave) {
        console.error('Section not found');
        return;
      }

      // Prepare the data for the PUT request, including the updated text
      const requestData = {
        id: sectionId,
        txt: sectionTexts[sectionId], // Use the updated text from state
        name: sectionToSave.name,
        rp_id: sectionToSave.rp_id,
      };

      // Make a PUT request to update the section
      await axios.put(`http://localhost:8086/Sections/${sectionId}`, requestData);

      // Optionally, you can update the local state after the save is successful
      // For example, you can fetch the updated sections from the server
      fetchSections();
      setOpenNotification(true);
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };
  
  const deleteSection = async (sectionId) => {
    try {
      // Make a DELETE request to delete the section
      await axios.delete(`http://localhost:8086/Sections/deleteSection/${sectionId}`);
  
      // Optionally, you can update the local state after the delete is successful
      // For example, you can fetch the updated sections from the server
      fetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };
  

  //TITLE
  const [title, setTitle] = useState(''); // State to store the fetched title
  const [conclusion, setConclusion] = useState(''); // State to store the
  const [bibliographie, setBibliographie] = useState(''); // State to store the
  const [field, setField] = useState(''); // State to store the
  const [student_id, setStudentID] = useState(null); // State to store the
  const [description, setDescription] = useState("");
  const [file_name, setFileName] = useState("");
  const [introduction, setIntroduction] = useState("");
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
        if (response.data.abstractSection != null){
        setAbstractText(response.data.abstractSection);
        }
      } catch (error) {
        console.error('Error fetching title:', error);
      }
    };

    fetchTitle(); // Call the fetchTitle function when the component mounts
  }, [articleId]); // Include articleId in the dependency array to fetch when it changes


  
  return (
    <MKBox component="section" py={0}>
      <Container>
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message="Saved Successfully"
        action={action}
      />
        <Grid textAlign="center">
          <MKTypography variant="h4" color="red" fontWeight="bold" mb={0} style={{paddingLeft:"10%", paddingRight:"10%", color:"#1b4080"}}>
           <i>Title : {title} </i> 
          </MKTypography>
        </Grid>

        <Grid>
            &nbsp;
        </Grid>


        <Stack direction="row" alignItems="flex-end" spacing={1}>
            <MKBox>
        <MKButton
                    type="button"
                    variant="gradient"
                    color="light"
                    size="medium"
                    iconOnly={true}
                    circular={true}
                    style={{marginBottom:"50%"}}
                    onClick={toggleVisibility}
                    // onClick={fetchAbstract} // Fetch the abstract when the button is clicked
                    // disabled={isLoading} // Disable the button while the backend request is in progress
                  >
                    {isVisible ? (
              <VisibilityOffIcon fontSize="large" />
            ) : (
              <VisibilityIcon fontSize="large" />
            )}
                  </MKButton>
                  </MKBox>
                  {isVisible && (
          <>
            <MKInput
              variant="outlined"
              // disabled
              fullWidth
              defaultValue={aiResponse}
              multiline
              rows={3}
              onChange={(e) => SetAiResponse(e.target.value)}
            />
            <MKButton
              type="button"
              variant="gradient"
              color="light"
              size="large"
              onClick={getSections}
              style={{marginBottom:"1.5%"}}
            >
              Generate Sections
            </MKButton>
            
          </>
        )}
        {!isVisible && (
          <MKTypography >
            <b><i style={{fontSize:"14px", color:"darkBlue",fontWeight:"" , paddingBottom:"50%"}}>Generate your sections with AI!</i></b>
          </MKTypography>
        )}
        </Stack>
        {isLoading && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}

        <Grid>
            &nbsp;
        </Grid>

        <Stack direction="row" alignItems="flex-end" spacing={1}>
            
                  {isVisible1 && (
          <>
            <MKBox>
        <MKButton
                    type="button"
                    variant="gradient"
                    color="secondary"
                    size="medium"
                    // iconOnly={true}
                    // circular={true}
                    sx={{marginBottom:"5%"}}
                    onClick={toggleVisibility1}
                    fullWidth
                    // onClick={fetchAbstract} // Fetch the abstract when the button is clicked
                    // disabled={isLoading} // Disable the button while the backend request is in progress
                  >
                    
              <AddIcon fontSize="large"/>&nbsp;Add Section
            
                  </MKButton>
                  </MKBox>
          </>
        )}
        {!isVisible1 && (
          <>
          <MKInput
          variant="outlined"
          placeholder="insert a section here..."
          value={sectionText}
          onChange={handleSectionTextChange}
          fullWidth
        />
        <MKButton
          type="button"
          variant="gradient"
          color="secondary"
          size="medium"
          onClick={addSection}
        >
          <SaveIcon/>
        </MKButton>
        </>
        )}
        </Stack>

        <Grid>
            &nbsp;
        </Grid>
        
        <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            All Sections
          </ListSubheader>
        }
      >
{sections.map((section) => (
  <div key={section.id}>
    <ListItemButton onClick={() => handleClick(section.id)}>
      <ListItemIcon>
        <BookmarksOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={section.name} />
      {openSections[section.id] ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openSections[section.id]} timeout="auto" unmountOnExit>
      <div className="text-abstract">
      <textarea
  style={{
    width: '100%',
    height: '300px', // Adjust the height to match your desired number of rows
    fontFamily: "Times New Roman, Arial, sans-serif",
    fontSize: "18px", // Adjust the font size as needed
    color: "black",
    padding: '20px', // Add padding to the left and top to mimic a professional paper
    margin: "5px",
    marginLeft:"5px",
    border: '1px solid #ccc', // Add a border for better visibility
    borderRadius: '10px', // Add rounded corners for a cleaner look
    outline: 'none', // Remove the blue outline when clicked
    // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
  }}
                    placeholder="Type your text here..."
                    defaultValue={section.txt} // Use the text from state
                    onChange={(e) => handleTextChange(section.id, e.target.value)} // Update the text in state
                    onSelect={handleTextSelect}
                   
                  />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' ,marginTop: '1%' }}>
      <Stack direction="row" spacing={1}>
      
        <MKButton
          type="button"
          variant="gradient"
          color="secondary"
          size="medium"
          circular={true}
          iconOnly={true}
          onClick={() => saveSection(section.id)}
          style={{
            marginTop:"1%"
          }}
        >
          <SaveIcon />
        </MKButton>
        <MKButton
          type="button"
          variant="gradient"
          color="primary"
          size="medium"
          circular={true}
          iconOnly={true}
          onClick={() => deleteSection(section.id)}
          style={{
            marginTop:"1%"
          }}
        >
          <DeleteIcon/>
        </MKButton>
        
      </Stack>
      </div>
    </Collapse>
  </div>
))}

      </List>


        <Grid>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
            <Grid spacing={7}>
            {/* <CustomizedDividers /> */}
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
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
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
               <Grid>
                  &nbsp;
                </Grid>

              </Grid>
              

      {/* Conditional rendering for the spinner */}
      
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

Body.propTypes = {
  nbrWordsValue: PropTypes.number.isRequired,
  onNbrWordsValueChange: PropTypes.func,
  onTextSelect: PropTypes.func.isRequired,
};
export default Body;
