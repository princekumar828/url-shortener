import axios from 'axios';
import { ApiResponse, UrlData, UrlStats } from '../types';

const API_BASE_URL = 'http://localhost:6543/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shortenUrl = async (originalUrl: string): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/url/shorten', { originalUrl });
  return response.data;
};

export const getUrlStats = async (shortCode: string): Promise<UrlStats> => {
  const response = await api.get<UrlStats>(`/url/stats/${shortCode}`);
  return response.data;
};

export const getAllUrls = async (page: number = 1, limit: number = 10): Promise<{
  urls: UrlData[];
  currentPage: number;
  totalPages: number;
  total: number;
}> => {
  const response = await api.get(`/url?page=${page}&limit=${limit}`);
  return response.data;
}; 