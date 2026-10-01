import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Divider, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getCoinHistory } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function CoinDetail() {
  const { id } = useParams(); 
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Formata o ID para garantir o formato exigido pela AwesomeAPI (ex: USD-BRL)
        let coinPair = id;
        if (!coinPair.includes('-')) {
          if (coinPair.endsWith('BRL')) {
            const code = coinPair.replace('BRL', '');
            coinPair = `${code}-BRL`;
          } else {
            coinPair = `${coinPair}-BRL`;
          }
        }

        // Chama o endpoint da AwesomeAPI (/json/daily/USD-BRL/1)
        const response = await getCoinHistory(coinPair, 1);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setCoinData(response.data[0]);
        } else {
          setError('Detalhes da moeda não foram encontrados.');
        }
      } catch (err) {
        setError('Erro ao carregar detalhes da moeda. Verifique a conexão com a API.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <Loading message="A carregar detalhes da moeda..." />;
  if (error) return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Voltar à lista
      </Button>
      <ErrorMessage message={error} />
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Voltar à lista
      </Button>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          {coinData.name} ({coinData.code})
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Valor de Compra (Bid):</strong> R$ {parseFloat(coinData.bid).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Valor de Venda (Ask):</strong> R$ {parseFloat(coinData.ask).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Máximo do Dia (High):</strong> R$ {parseFloat(coinData.high).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Mínimo do Dia (Low):</strong> R$ {parseFloat(coinData.low).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Variação:</strong> {coinData.varBid} ({coinData.pctChange}%)
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              <strong>Última Atualização:</strong> {coinData.create_date}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}