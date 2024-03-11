import axios from 'axios';

const API_URL = 'https://gorest.co.in/public';

const apiService = {
    // Method to fetch data
    getData: async (endpoint: string, queryParams: any) => {
        try {
            const params = new URLSearchParams(queryParams);
            const response = await axios.get(`${API_URL}/${endpoint}?${params}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Method to create data
    createData: async (endpoint: string, data: object) => {
        try {
            const response = await axios.post(`${API_URL}/${endpoint}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Method to update data
    updateData: async (endpoint: string, id: number, data: object) => {
        try {
            const response = await axios.put(`${API_URL}/${endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Method to delete data
    deleteData: async (endpoint: string, id: number) => {
        try {
            const response = await axios.delete(`${API_URL}/${endpoint}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default apiService;