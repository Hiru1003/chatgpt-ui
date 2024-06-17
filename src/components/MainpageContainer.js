import React from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { TiPen } from "react-icons/ti";
import { RiLightbulbLine } from "react-icons/ri";
import { TbPlaneInflight } from "react-icons/tb";
import { LuGraduationCap } from "react-icons/lu";

const MainpageContainer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const containerStyles = {
    textAlign: 'left',
    border: '1px solid grey',
    borderRadius: '20px',
    p: 2,
    width: isSmallScreen ? '300px' : '250px', // Adjust width dynamically
    height: isSmallScreen ? '100px' : '130px', // Adjust height dynamically
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
  

  return (
    <Box sx={{ 
      pl: isSmallScreen ? 2 : 20, 
      pr: isSmallScreen ? 2 : 20, 
      pb: 2, 
      flexGrow: 1, 
    }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Box sx={containerStyles}>
            <TiPen style={{ color: 'plum', fontSize: '24px', marginBottom: '8px' }} /> 
            <Typography variant="h6" sx={{ color: "grey" }}>Email for plumber quote</Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={containerStyles}>
            <RiLightbulbLine style={{ color: 'gold', fontSize: '24px', marginBottom: '8px' }} />
            <Typography variant="h6" sx={{ color: "grey" }}>Recipe with what's in my kitchen</Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={containerStyles}>
            <TbPlaneInflight style={{ color: 'yellow', fontSize: '24px', marginBottom: '8px' }} />
            <Typography variant="h6" sx={{ color: "grey" }}>Experience Seoul like a local</Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={containerStyles}>
            <LuGraduationCap style={{ color: 'lightskyblue', fontSize: '24px', marginBottom: '8px' }} /> 
            <Typography variant="h6" sx={{ color: "grey" }}>Explain superconductors</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainpageContainer;
