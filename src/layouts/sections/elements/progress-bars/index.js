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
//import View from "layouts/sections/components/View";

// ProgressBars page components
import ProgressSimple from "layouts/sections/elements/progress-bars/components/ProgressSimple";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
// ProgressBars page components code
//import progressSimpleCode from "layouts/sections/elements/progress-bars/components/ProgressSimple/code";

function ProgressBars() {
  return (
    <BaseLayout
      title="Write your research paper with AI"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/elements/progress-bars" },
        { label: "Write your research paper with AI" },
      ]}
    >
      <Grid>&nbsp;</Grid>


      {/* <View title="Progress bar simple" code={progressSimpleCode}> */}
      <MKBox color="black" borderRadius ="2%" shadow="10%" coloredShadow="success" sx={{ p: 2, border: '1px grey' }}>
        <ProgressSimple />
      </MKBox>
      {/* </View> */}
    </BaseLayout>
  );
}

export default ProgressBars;
