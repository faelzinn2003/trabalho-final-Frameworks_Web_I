import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, MenuItem, Box, Button, Grid } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { getLatestRates } from '../services/api';
import Loading from '../components/Loading';

export default function Converter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState('USD');
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestRates().then(response => {
      setRates(response.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const key = `${selectedCoin}BRL`;
    if (rates[key]) {
      const rate = parseFloat(rates[key].bid);
      setResult(amount * rate);
    }
  }, [amount, selectedCoin, rates]);

  if (loading) return <Loading message="A carregar conversor..." />;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
          Conversor de Câmbio
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Valor a Converter"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Moeda de Origem"
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              <MenuItem value="USD">Dólar Americano (USD)</MenuItem>
              <MenuItem value="EUR">Euro (EUR)</MenuItem>
              <MenuItem value="BTC">Bitcoin (BTC)</MenuItem>
              <MenuItem value="GBP">Libras Esterlinas (GBP)</MenuItem>
              <MenuItem value="ETH">Ethereum (ETH)</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ my: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Resultado Estimado em Real (BRL):
          </Typography>
          <Typography variant="h4" color="secondary" fontWeight="bold" sx={{ mt: 1 }}>
            R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}