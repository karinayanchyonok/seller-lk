import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Типы для API
export interface ApiAd {
    id: number;
    title: string;
    price: number;
    category: 'Авто' | 'Электроника' | 'Недвижимость';
    needsRevision: boolean;
    description?: string;
    params?: any;
}

export interface ApiResponse {
    items: ApiAd[];
    total: number;
}