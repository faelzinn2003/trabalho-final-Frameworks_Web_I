import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Card, CardContent, Typography, TextField,
    MenuItem, Select, FormControl, InputLabel, Box, Button, CardActions, Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getLatestRates } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
    const [rates, setRates] = useState([]);
    const [filteredRates, setFilteredRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros e busca
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ALL');

    // Paginação simples
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const fetchRates = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getLatestRates();
            const dataArray = Object.values(response.data);
            setRates(dataArray);
            setFilteredRates(dataArray);
        } catch (err) {
            setError("Falha ao ligar à AwesomeAPI. Verifique a sua conecção.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        let result = rates;

        if (searchTerm) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter === 'CRYPTO') {
            result = result.filter(item => ['BTC', 'ETH', 'LTC'].includes(item.code));
        } else if (categoryFilter === 'FIAT') {
            result = result.filter(item => !['BTC', 'ETH', 'LTC'].includes(item.code));
        }

        setFilteredRates(result);
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, rates]);

    // Cálculo da Paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRates.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRates.length / itemsPerPage);

    if (loading) return <Loading message="A carregar cotações em tempo real..." />;
    if (error) return <ErrorMessage message={error} onRetry={fetchRates} />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                Cotação de Moedas em Tempo Real
            </Typography>

            {/* Busca e Filtros */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                    fullWidth
                    label="Buscar Moeda (ex: Dólar, BTC)"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        value={categoryFilter}
                        label="Categoria"
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <MenuItem value="ALL">Todas</MenuItem>
                        <MenuItem value="FIAT">Fiduciárias (FIAT)</MenuItem>
                        <MenuItem value="CRYPTO">Criptomoedas</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Lista de Cards */}
            <Grid container spacing={3}>
                {currentItems.map((coin) => {
                    const isPositive = parseFloat(coin.pctChange) >= 0;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={coin.code}>
                            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography color="textSecondary" gutterBottom variant="body2">
                                        {coin.code} / {coin.codein}
                                    </Typography>
                                    <Typography variant="h6" component="h2" fontWeight="bold">
                                        {coin.name.split('/')[0]}
                                    </Typography>
                                    <Typography variant="h5" color="primary" sx={{ my: 1 }}>
                                        R$ {parseFloat(coin.bid).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </Typography>
                                    <Chip
                                        label={`${isPositive ? '+' : ''}${coin.pctChange}%`}
                                        color={isPositive ? "success" : "error"}
                                        size="small"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        component={Link}
                                        to={`/moeda/${coin.code}-BRL`}
                                        variant="contained"
                                        fullWidth
                                    >
                                        Ver Detalhes
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Controle de Paginação */}
            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={2}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        variant="outlined"
                    >
                        Anterior
                    </Button>
                    <Typography>
                        Página {currentPage} de {totalPages}
                    </Typography>
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        variant="outlined"
                    >
                        Próxima
                    </Button>
                </Box>
            )}
        </Container>
    );
}