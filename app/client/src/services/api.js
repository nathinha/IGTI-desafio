import axios from 'axios';

const api = axios.create(
  {
    baseURL: 'http://localhost:3001/api/transaction'
  }
);

const getPeriods = async () => {
  const response = await api.get('/periods');
  return response.data;
}

const getTransactions = async (period) => {
  const response = await api.get(`?period=${period}`);
  return response.data;
}

export { getPeriods, getTransactions };