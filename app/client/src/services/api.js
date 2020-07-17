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

export { getPeriods };