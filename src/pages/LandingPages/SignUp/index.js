import React, { useState } from 'react';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Import Axios library
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
function SignUpBasic() {

  const navigate = useNavigate();

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

  // Inspired by blueprintjs
function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }



  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [academic_level, setacademic_level] = useState('');
  const [school_name, setSchool] = useState('');
  const [gender, setGender] = useState('female'); // Default gender value
  const [password, setPassword] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const handleChange = (event) => {
    setacademic_level(event.target.value);
  };
  const handleChange1 = (event) => {
    setSchool(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      first_name,
      last_name,
      email,
      academic_level,
      gender,
      password,
      birthday,
      school_name,
    };
    try {
      // Check if the email exists in the database
      const emailCheckResponse = await axios.get(`http://localhost:8086/Students/getStudentByEmail/${email}`);
  
      if (emailCheckResponse.data) {
        // Email already exists in the database, display an alert message
        alert('Email already exists in the database.');
      } else {
        // Email does not exist in the database, proceed to add the user
        const response = await axios.post('http://localhost:8086/Students/addStudent', userData);
  
        // Handle a successful response from the server (e.g., show a success message)
        console.log('Response from server:', response.data);
        console.log(userData.academic_level);
  
        // Redirect the user to the sign-in page after successful registration
        navigate('/pages/authentication/sign-in');
      }
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error('Error:', error.response.data);
    }
  };
  
  return (
      

      <>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={5}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={12}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign up
                </MKTypography>
                {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid> */}
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">

                <Stack direction="row" alignItems="flex-end" spacing={3}>
                    <MKInput 
                    type="text" label="First Name" fullWidth required
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <MKInput type="text" label="Last Name" fullWidth required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    /> 
                </Stack>
                <Grid>
                    &nbsp;
                </Grid>
                <MKInput type="email" label="Email" fullWidth required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Grid>
                    &nbsp;
                </Grid>

                <Stack direction="row" alignItems="flex-end" spacing={3}>


                <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Academic level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={academic_level}
          label="Academic Level"
          onChange={handleChange}
          sx={{height:"40px"}}
          required
        >
          <MenuItem value={"Middle School"}>Middle School</MenuItem>
          <MenuItem value={"High School"}>High School</MenuItem>
          <MenuItem value={"College"}>College</MenuItem>
          <MenuItem value={"Master's Degree"}>Master&apos;s Degree</MenuItem>
          <MenuItem value={"Medical School (M.D.)"}>Medical School (M.D.)</MenuItem>
          <MenuItem value={"Doctorate (Ph.D.)"}>Doctorate (Ph.D.)</MenuItem>
        </Select>
      </FormControl>

                <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">University</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={school_name}
          label="University"
          onChange={handleChange1}
          sx={{height:"40px"}}
        >
          <MenuItem value={"ENSA"}>ENSA</MenuItem>
          <MenuItem value={"ENSAM"}>ENSAM</MenuItem>
          {/* <MenuItem value={30}></MenuItem> */}
        </Select>
      </FormControl>
                </Stack>

                <Grid>
                    &nbsp;
                </Grid>
                
                
                <Stack direction="row" alignItems="flex-end" spacing={3}>
                <FormControl fullWidth>
                <FormLabel sx={{fontSize:"0.7em"}}>Birthday</FormLabel>
                    <MKInput type="date" fullWidth 
                    value={birthday ? birthday.toISOString().split("T")[0] : ""} // Convert to string in YYYY-MM-DD format
                    onChange={(e) => setBirthday(new Date(e.target.value))} // Convert the input to a Date object
                    />
                    </FormControl>
                    <FormControl fullWidth>
      <FormLabel id="demo-customized-radios" sx={{fontSize:"0.7em"}}>Gender</FormLabel>
      <RadioGroup
      row
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        value={gender}
        onChange={handleGenderChange}
      >
        <FormControlLabel value="female" control={<BpRadio />} label="Female" />
        <FormControlLabel value="male" control={<BpRadio />} label="Male" />
      </RadioGroup>
    </FormControl> 
                </Stack>

                <Grid>
                    &nbsp;
                </Grid>
                
                
                <Stack direction="row" alignItems="flex-end" spacing={3}>
                    <MKInput type="password" label="Password" fullWidth value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <MKInput type="password" label="Confirm Password" fullWidth 
                    onChange={(e) => setPassword(e.target.value)}/> 
                </Stack>

                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={0} mb={0} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/pages/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </>
  );
}

export default SignUpBasic;

