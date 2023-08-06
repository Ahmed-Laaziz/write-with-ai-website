import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};


const PrettoSlider = styled(Slider)({
  color: '#575863',
  height: 1,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid black',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 26,
    height: 26,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#7e8af2',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});




export default function CustomizedSlider({label}) {
  return (
    <Box width={"100%"} paddingLeft={"10%"} paddingBottom={"5%"}>
      <Stack direction="row" alignItems="flex-end" spacing={1}>
        <Grid xs = {5}>
        <Box marginTop={"3%"}>
      <Typography gutterBottom fontSize={"0.8em"} >{label} </Typography>
      </Box>
      </Grid>
      <Grid xs = {7}>
      <Box width={"80%"} sx = {{  borderRadius:2, backgroundColor: '#D0D2D6',
    '&:hover': {
      backgroundColor: '#BEC2C9',
      opacity: [0.9, 0.8, 0.7],
    },}}>
      <Box width={"80%"} margin={"auto"}>

      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0.7}
        max={1}
        min={0}
        step={0.1}
        color="success"
      />

      </Box>
      </Box>
      </Grid>
      </Stack>
    </Box>
  );
}

// Typechecking props for the BaseLayout
CustomizedSlider.propTypes = {
  label: PropTypes.string.isRequired,
};