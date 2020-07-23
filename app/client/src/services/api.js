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

const deleteTransaction = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
}

const updateTransaction = async (id) => {
  const response = await api.update(`/${id}`);
  return response.data;
}

export { getPeriods, getTransactions, deleteTransaction, updateTransaction };