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
import WriterImage from 'assets/images/writer.png';
import { useParams } from 'react-router-dom';
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
          image={WriterImage}
          alt="green iguana"
          sx={{width:"95%"}}
        />
        <CardContent style={{ textAlign: 'center' }}>
  <Typography gutterBottom variant="h5" component="div">
    Write your article with AI!
  </Typography>
  <p style={{ fontFamily: 'inherit' , color:"gray"}}>
  Experience the future of content creation. Our AI-powered platform platform simplifies writing, enhances quality, and boosts productivity. Explore the possibilities of effortless article generation with Artificial intelligence(AI).
  </p>
</CardContent>

      </CardActionArea> 
      <Link to={{
      pathname: `/sections/elements/progress-bars/${studentId}`,
    }}
    style={{ color: 'black' }} // Set the desired text color here
    >
      <CardActions>
        <MKButton type="button" size="small" color="info" sx = {{marginLeft:"40%"}}>
          <DrawIcon fontSize='large'/>&nbsp;Start
        </MKButton>
      </CardActions>
      </Link>
    </Card>
  );
}