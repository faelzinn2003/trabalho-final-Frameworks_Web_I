import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { CurrencyExchange, Home, Calculate } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <CurrencyExchange sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            CambioExchange
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<Home />}
            >
              Cotações
            </Button>
            <Button
              component={Link}
              to="/conversor"
              color="inherit"
              startIcon={<Calculate />}
            >
              Conversor
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}