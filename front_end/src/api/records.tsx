import axios from 'axios';

export const getRecord = () => {
    return axios.get('/api/records');
};

export const addRecord = () => {
    return axios.post('/api/records', record);
};