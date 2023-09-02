/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
// import View from "layouts/sections/components/View";
import Grid from "@mui/material/Grid";
// Forms page components
import FormSimple from "layouts/sections/input-areas/forms/components/FormSimple";
import MiniDrawer from "components/MyComponents/Drawers/MiniDrawer";
import PermanentDrawerRight from "components/MyComponents/Drawers/PermanentDrawerRight";
import Box from '@mui/material/Box';
import CenteredFooter from "examples/Footers/CenteredFooter";
import MKBox from "components/MKBox";


// Forms page components codeTemporaryDrawerTemporaryDrawer
//import formSimpleCode from "layouts/sections/input-areas/forms/components/FormSimple/code";

function Forms() {
  return (
    <>
  <box >
    <p style={{marginBottom:"3%"}}>&nbsp;</p>
  </box>
      
      <MiniDrawer/>
      {/* <View title="Form Simple" code={formSimpleCode}> */}
      <MKBox width="70%" marginLeft="0px">
        <CenteredFooter/>
      </MKBox>
      {/* </BaseLayout> */}
      </>
    
  );
}

export default Forms;
