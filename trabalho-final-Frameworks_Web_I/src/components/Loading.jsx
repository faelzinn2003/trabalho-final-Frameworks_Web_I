import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({ message = "A carregar dados..." }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={5}>
      <CircularProgress />
      <Typography variant="body1" mt={2} color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}