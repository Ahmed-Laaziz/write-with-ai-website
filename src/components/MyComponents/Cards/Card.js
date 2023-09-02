import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoDataScience from "assets/images/logos/logo_data_science.png";
import LogoNlp from "assets/images/logos/logo_nlp.png";
import LogoML from "assets/images/logos/logo_ml.png";
import LogoDl from "assets/images/logos/logo_dl.png";
import LogoCs from "assets/images/logos/logo_cs.png";
import LogoAi from "assets/images/logos/logoAi.png";
import PropTypes from "prop-types";
//import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ZoomableCardMedia = styled(CardMedia)`
  width: 90%;
  max-width: 90%; /* Limit to card's width */
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

export default function CardComponent({title,category,description, articleId, studentId, articleField}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    
  };

  // Define a function to get the image source based on the category
  const getImageSrc = (category) => {
    switch (category) {
      case 'Data Science':
        return {LogoDataScience};
      case 'Natural Language Processing (NLP)':
        return LogoNlp;
      case 'Artificial Intelligence (AI)':
        return LogoAi;
      case 'Machine Learning':
        return LogoML; 
      case 'Deep Learning':
        return LogoDl; 
      // Add more cases for other categories
      default:
        return LogoCs;
    }
  };

  // Get the image source based on the category
  const imageSrc = getImageSrc(articleField);
  console.log(imageSrc);


  CardComponent.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    articleId: PropTypes.number.isRequired,
    studentId: PropTypes.number.isRequired,
    articleField: PropTypes.string.isRequired,
  };
  return (
    <Card sx={{ maxWidth: 500 , height: 550, fontSize:"12px"}}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        sx={{height:"300px"}}
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 13, 2023"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image={LogoDataScience}
        alt="Paella dish"
      /> */}

<Link to={{
      pathname: `/sections/input-areas/forms/${articleId}/${studentId}`,
    }}>
<ZoomableCardMedia
      component="img"
      src={imageSrc}
      alt="Article Image"
      style={{
        transform: isZoomed ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    />
    </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

