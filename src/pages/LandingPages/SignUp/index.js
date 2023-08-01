// import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

import * as React from 'react';

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
// import InputLabel from '@mui/material/InputLabel';
import MKButton from "components/MKButton";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
// Material Kit 2 React example components
//import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import Stack from "@mui/material/Stack";
// Material Kit 2 React page layout routes
//import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignUpBasic() {
//   const [rememberMe, setRememberMe] = useState(false);
const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
//   const handleSetRememberMe = () => setRememberMe(!rememberMe);


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
                    <MKInput type="text" label="First Name" fullWidth required/>
                    <MKInput type="text" label="Last Name" fullWidth required/> 
                </Stack>
                <Grid>
                    &nbsp;
                </Grid>
                <MKInput type="email" label="Email" fullWidth required/>
                <Grid>
                    &nbsp;
                </Grid>

                <Stack direction="row" alignItems="flex-end" spacing={3}>


                <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Academic level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Academic level"
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
          value={age}
          label="University"
          onChange={handleChange}
          sx={{height:"40px"}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
                </Stack>

                <Grid>
                    &nbsp;
                </Grid>
                
                
                <Stack direction="row" alignItems="flex-end" spacing={3}>
                <FormControl fullWidth>
                <FormLabel sx={{fontSize:"0.7em"}}>Birthday</FormLabel>
                    <MKInput type="date" fullWidth />
                    </FormControl>
                    <FormControl fullWidth>
      <FormLabel id="demo-customized-radios" sx={{fontSize:"0.7em"}}>Gender</FormLabel>
      <RadioGroup
      row
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
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
                    <MKInput type="password" label="Password" fullWidth />
                    <MKInput type="password" label="Confirm Password" fullWidth /> 
                </Stack>

                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth>
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
