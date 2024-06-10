import React from 'react';
import { Box, Typography } from '@mui/material';
import { TiPen } from "react-icons/ti";
import { RiLightbulbLine } from "react-icons/ri";
import { TbPlaneInflight } from "react-icons/tb";
import { LuGraduationCap } from "react-icons/lu";

const MainpageContainer = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      pl: 20, 
      pr: 20, 
      pb: 2, 
      flexGrow: 1, 
      gap: 2,
      justifyContent:'left'
    }}>
    

      {/* Container 1 */}
      <Box sx={{ flex: 1, textAlign: 'left', border: '1px solid grey', borderRadius: '20px' ,p:2}}>
        <TiPen style={{ color: 'plum', fontSize: '24px', marginBottom: '8px' }} /> 
        <Typography variant="h6" sx={{ color: "grey" }}>Email for plumber quote</Typography>
      </Box>

      {/* Container 2 */}
      <Box sx={{ flex: 1, textAlign: 'left', border: '1px solid grey', borderRadius: '20px' ,p:2}}>
        <RiLightbulbLine style={{ color: 'gold', fontSize: '24px', marginBottom: '8px' }} />
        <Typography variant="h6" sx={{ color: "grey" }}>Recipe with what's in my kitchen</Typography>
      </Box>

      {/* Container 3 */}
      <Box sx={{ flex: 1, textAlign: 'left', border: '1px solid grey', borderRadius: '20px' ,p:2}}>
        <TbPlaneInflight style={{ color: 'yellow', fontSize: '24px', marginBottom: '8px' }} />
        <Typography variant="h6" sx={{ color: "grey" }}>Experience Seoul like a local</Typography>
      </Box>

      {/* Container 4 */}
      <Box sx={{ flex: 1, textAlign: 'left', border: '1px solid grey', borderRadius: '20px' ,p:2 }}>
        <LuGraduationCap style={{ color: 'lightskyblue', fontSize: '24px', marginBottom: '8px' }} /> 
        <Typography variant="h6" sx={{ color: "grey" }}>Explain superconductors</Typography>
      </Box>
    </Box>
  );
}

export default MainpageContainer;
