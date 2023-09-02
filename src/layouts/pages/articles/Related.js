// import Select from 'assets/theme/components/form/select';
// import MenuItem from 'assets/theme/components/menu/menuItem';
import ShowMoreText from "react-show-more-text";
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Stack } from "@mui/material";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
const RelatedPapers = ({rpTitle}) => {
  const [title, setTitle] = useState(rpTitle);
  const [numberOfPapers, setNumberOfPapers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a loading spinner while waiting for the response.
    setLoading(true);

    // Make a request to your backend API to get related papers.
    const response = await fetch('http://localhost:8008/get_related_papers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, nbr: numberOfPapers }),
    });

    if (response.ok) {
      const data = await response.json();
      setPapers(data);
    }

    // const response = [{'id': '1007.5377', 'mix_score': 32.61741468569048, 'title': 'Browsing the sky through the ASI Science Data Centre Data Explorer Tool', 'authors': "V. D'Elia, M. Capalbi, F. Verrecchia, B. Gendre, P. Giommi", 'Category': 'astro-ph.IM', 'abstract': '  We present here the Data Explorer tool developed at the ASI Science Data\nCenter (ASDC). This tool is designed to provide an efficient and user-friendly\nway to display information residing in several catalogs stored in the ASDC\nservers, to cross-correlate this information and to download/analyze data via\nour scientific tools and/or external services. Our database includes GRB\ncatalogs (such as Swift and Beppo-SAX), which can be queried through the Data\nExplorer. The GRB fields can be viewed in multiwavelength and the data can be\nanalyzed or retrieved.\n', 'link': 'https://arxiv.org/pdf/1007.5377.pdf'}, {'title': 'P ORTOLAN: a Model-Driven Cartography Framework', 'authors': 'Vincent Mahe (INRIA - EMN), Salvador Martinez Perez (INRIA - EMN),\n  Guillaume Doux (INRIA - EMN), Hugo Bruneli\\`ere (INRIA - EMN), Jordi Cabot\n  (INRIA - EMN)', 'abstract': '  Processing large amounts of data to extract useful information is an\nessential task within companies. To help in this task, visualization techniques\nhave been commonly used due to their capacity to present data in synthesized\nviews, easier to understand and manage. However, achieving the right\nvisualization display for a data set is a complex cartography process that\ninvolves several transformation steps to adapt the (domain) data to the\n(visualization) data format expected by visualization tools. To maximize the\nbenefits of visualization we propose Portolan, a generic model-driven\ncartography framework that facilitates the discovery of the data to visualize,\nthe specification of view definitions for that data and the transformations to\nbridge the gap with the visualization tools. Our approach has been implemented\non top of the Eclipse EMF modeling framework and validated on three different\nuse cases.\n', 'id': '1102.4684', 'link': 'https://arxiv.org/pdf/1102.4684.pdf', 'Category': 'cs.OH', 'similarity_score': -1.073412299156189}, {'id': '1012.5676', 'mix_score': 12.700442560033084, 'title': 'The Exoplanet Orbit Database', 'authors': 'Jason T Wright, Onsi Fakhouri, Geoffrey W. Marcy, Eunkyu Han, Ying\n  Feng, John Asher Johnson, Andrew W. Howard, Debra A. Fischer, Jeff A.\n  Valenti, Jay Anderson, Nikolai Piskunov', 'Category': 'astro-ph.SR astro-ph.EP', 'abstract': '  We present a database of well determined orbital parameters of exoplanets.\nThis database comprises spectroscopic orbital elements measured for 427 planets\norbiting 363 stars from radial velocity and transit measurements as reported in\nthe literature. We have also compiled fundamental transit parameters, stellar\nparameters, and the method used for the planets discovery. This Exoplanet Orbit\nDatabase includes all planets with robust, well measured orbital parameters\nreported in peer-reviewed articles. The database is available in a searchable,\nfilterable, and sortable form on the Web at http://exoplanets.org through the\nExoplanets Data Explorer Table, and the data can be plotted and explored\nthrough the Exoplanets Data Explorer Plotter. We use the Data Explorer to\ngenerate publication-ready plots giving three examples of the signatures of\nexoplanet migration and dynamical evolution: We illustrate the character of the\napparent correlation between mass and period in exoplanet orbits, the selection\ndifferent biases between radial velocity and transit surveys, and that the\nmultiplanet systems show a distinct semi-major axis distribution from\napparently singleton systems.\n', 'link': 'https://arxiv.org/pdf/1012.5676.pdf'}, {'title': 'A VO-driven Astronomical Data Grid in China', 'authors': 'Chenzhou Cui, Boliang He, Yang Yang, Yongheng Zhao', 'abstract': '  With the implementation of many ambitious observation projects, including\nLAMOST, FAST, and Antarctic observatory at Doom A, observational astronomy in\nChina is stepping into a brand new era with emerging data avalanche. In the era\nof e-Science, both these cutting-edge projects and traditional astronomy\nresearch need much more powerful data management, sharing and interoperability.\nBased on data-grid concept, taking advantages of the IVOA interoperability\ntechnologies, China-VO is developing a VO-driven astronomical data grid\nenvironment to enable multi-wavelength science and large database science. In\nthe paper, latest progress and data flow of the LAMOST, architecture of the\ndata grid, and its supports to the VO are discussed.\n', 'id': '1001.1192', 'link': 'https://arxiv.org/pdf/1001.1192.pdf', 'Category': 'astro-ph.IM', 'similarity_score': -1.0867573022842407}, {'id': '0809.2465', 'mix_score': 12.632551102278292, 'title': 'The Hubble Legacy Archive NICMOS Grism Data', 'authors': 'Wolfram Freudling, Martin K\\"ummel, Jonas Haase, Richard Hook, Harald\n  Kuntschner, Marco Lombardi, Alberto Micol, Felix Stoehr, Jeremy Walsh', 'Category': 'astro-ph', 'abstract': '  The Hubble Legacy Archive (HLA) aims to create calibrated science data from\nthe Hubble Space Telescope archive and make them accessible via user-friendly\nand Virtual Observatory (VO) compatible interfaces. It is a collaboration\nbetween the Space Telescope Science Institute (STScI), the Canadian Astronomy\nData Centre (CADC) and the Space Telescope - European Coordinating Facility\n(ST-ECF). Data produced by the Hubble Space Telescope (HST) instruments with\nslitless spectroscopy modes are among the most difficult to extract and\nexploit. As part of the HLA project, the ST-ECF aims to provide calibrated\nspectra for objects observed with these HST slitless modes. In this paper, we\npresent the HLA NICMOS G141 grism spectra. We describe in detail the\ncalibration, data reduction and spectrum extraction methods used to produce the\nextracted spectra. The quality of the extracted spectra and associated direct\nimages is demonstrated through comparison with near-IR imaging catalogues and\nexisting near-IR spectroscopy. The output data products and their associated\nmetadata are publicly available through a web form at http://hla.stecf.org and\nvia VO interfaces. In total, 2470 spectra of 1923 unique targets are included\nin the current release.\n', 'link': 'https://arxiv.org/pdf/0809.2465.pdf'}]


    // if (response) {
    // //   const data = await response.json();
    //   setPapers(response);
    // }

    // Hide the loading spinner after the response is received.
    setLoading(false);
  };

  return (
    <div style={{padding:"2%"}}>
        
      <center><form onSubmit={handleSubmit} className="center-container">
      <Grid container spacing={0.2}>
        <Grid item xs={9}>
        
          
          <MKInput
            // type="text"
            color="secondary"
            width="250%"
            label="Research Paper Title:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            
          />
        </Grid>
        
        <Grid item xs={1}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label"></InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={numberOfPapers}
    onChange={(e) => setNumberOfPapers(e.target.value)}
    color="info"
    focused
    style={{height:"44px"}}
  >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
    <MenuItem value={4}>4</MenuItem>
    <MenuItem value={5}>5</MenuItem>
  </Select>
</FormControl>
</Grid>
<Grid item xs = {1}>
        <MKButton fullWidth variant="gradient" color="info" type="button" size="medium" onClick={handleSubmit} style={{height:"44px"}}>Submit</MKButton>
        </Grid>
        </Grid>
      </form></center>
      
      {loading && <Box sx={{ width: "80%" , marginLeft:"10%"}}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <>&nbsp;</>
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>}

      {papers.length > 0 && (
        <div>
          {/* <h2 className="content-css">Related Papers:</h2> */}
          {/* <>&nbsp;</> */}
          <ul>
            {papers.map((paper) => (
              <li key={paper.id} >
                <h3 className='content-css'>Title : {paper.title}</h3>
                <p className='authors'><i>Authors : {paper.authors}</i></p>
                <ShowMoreText
                /* Default options */
                lines={1}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                // onClick={this.executeOnClick}
                expanded={false}
                // width={90%}
                truncatedEndingComponent={"... "}
            >
                <p>Abstract : {paper.abstract}</p>
            </ShowMoreText>

                <a href={paper.link} target="_blank" rel="noopener noreferrer">
                  Read Paper
                </a>
                <hr></hr>
                <>&nbsp;</>
              </li>
              
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RelatedPapers;
RelatedPapers.propTypes = {
    rpTitle: PropTypes.string.isRequired,
}