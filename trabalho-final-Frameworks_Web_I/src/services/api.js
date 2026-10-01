import axios from 'axios';

const api = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json'
});

export const getLatestRates = () => {
  return api.get('/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,ARS-BRL,CAD-BRL,LTC-BRL,ETH-BRL');
};

export const getCoinHistory = (coinPair, days = 15) => {
  return api.get(`/daily/${coinPair}/${days}`);
};

export default api;