import axios from 'axios';

const api = axios.create({
    baseURL :'http://localhost:8084/api/v1',
    headers: {
        'Content-type': 'application/json',
    },
});

export const getTransactions = () => api.get('/transactions').then((res) => res.data);
export const getTransactionById = (id) => api.get(`/transactions/${id}`).then((res) => res.data);
export const createTransaction = (transaction) => api.post('/transactions', transaction).then((res) => res.data);
export const updateTransaction = (id, transaction) => api.put(`/transactions/${id}`, transaction).then((res) => res.data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`).then((res) => res.data);