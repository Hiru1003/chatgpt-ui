// src/components/Footer.js
import React from 'react';
import { Box, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.300', p: 2, textAlign: 'center' }}>
      <Button variant="contained" color="primary">Upgrade</Button>
    </Box>
  );
}

export default Footer;
