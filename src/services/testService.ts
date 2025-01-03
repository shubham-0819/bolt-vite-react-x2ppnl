import axios from "axios";
import { API_URL } from "../config";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

export interface Test {
  _id?: string;
  testName: string;
  description: string;
  icons: string[];
  displayName: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const testService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/tests`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/tests/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  },

  create: async (data: Test) => {
    const formData = new FormData();
    formData.append('testName', data.testName);
    formData.append('description', data.description);
    formData.append('displayName', data.displayName);
    formData.append('price', data.price.toString());
    if (data.icons) {
      data.icons.forEach((icon) => {
        formData.append('icons', icon);
      });
    }

    const response = await axios.post(`${API_URL}/tests`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (id: string, data: Partial<Test>) => {
    const formData = new FormData();
    if (data.testName) formData.append('testName', data.testName);
    if (data.description) formData.append('description', data.description);
    if (data.displayName) formData.append('displayName', data.displayName);
    if (data.price) formData.append('price', data.price.toString());
    if (data.icons) {
      data.icons.forEach((icon) => {
        formData.append('icons', icon);
      });
    }

    const response = await axios.put(`${API_URL}/tests/${id}`, formData, {
      headers: { 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axios.delete(`${API_URL}/tests/${id}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return response.data;
  }
};

export default testService;