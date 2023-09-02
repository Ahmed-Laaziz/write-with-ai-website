import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MKButton from 'components/MKButton';
import DrawIcon from '@mui/icons-material/Draw';
import { Link } from "react-router-dom";
import './style.css'; // Import your global CSS file
import UploadImage from 'assets/images/upload.png';
import PropTypes from "prop-types";
export default function MultiActionAreaCard({studentId}) {

  MultiActionAreaCard.propTypes = {
    studentId: PropTypes.number.isRequired,
  };
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
        height="250"
        // width="50"
          image={UploadImage}
          alt="green iguana"
          sx={{width:"95%"}}
        />
        <CardContent style={{ textAlign: 'center' }}>
  <Typography gutterBottom variant="h5" component="div">
  AI-Powered PDF Wizardry
  </Typography>
  <p style={{ fontFamily: 'inherit' , color:"gray"}}>
A user-friendly solution for effortless document management. With a simple drag-and-drop interface, you can upload PDFs with ease. Summarize, translate, and reformulate content quickly to enhance your documents. 

  </p>
</CardContent>

      </CardActionArea>
      <Link to={{
      pathname: `/layouts/pages/articles/Upload/${studentId}`,
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
      <CardActions>
        <MKButton type="button" size="small" color="dark" sx = {{marginLeft:"40%"}}>
          <DrawIcon fontSize='large'/>&nbsp;Start
        </MKButton>
      </CardActions>
      </Link>
    </Card>
  );
}