import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===== ТИПЫ ДАННЫХ =====

// Параметры для электроники
export interface ElectronicsItemParams {
    type?: 'phone' | 'laptop' | 'misc';
    brand?: string;
    model?: string;
    condition?: 'new' | 'used';
    color?: string;
}

// Параметры для авто
export interface AutoItemParams {
    brand?: string;
    model?: string;
    yearOfManufacture?: number;
    transmission?: 'automatic' | 'manual';
    mileage?: number;
    enginePower?: number;
}

// Параметры для недвижимости
export interface RealEstateItemParams {
    type?: 'flat' | 'house' | 'room';
    address?: string;
    area?: number;
    floor?: number;
}

// Объявление (полная версия)
export interface Ad {
    id: number;
    title: string;
    price: number;
    category: 'auto' | 'electronics' | 'real_estate';
    description?: string;
    needsRevision: boolean;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
}

// Объявление (краткая версия для списка)
export interface AdListItem {
    id: number;
    title: string;
    price: number;
    category: 'auto' | 'electronics' | 'real_estate';
    needsRevision: boolean;
}

// Ответ от GET /items
export interface ItemsResponse {
    items: AdListItem[];
    total: number;
}

// Тело запроса для PUT /items/:id
export interface ItemUpdateIn {
    category: 'auto' | 'electronics' | 'real_estate';
    title: string;
    description?: string;
    price: number;
    params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
}
export interface ItemUpdateIn {
    category: 'auto' | 'electronics' | 'real_estate';
    title: string;
    description?: string;
    price: number;
    params: any;
}

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С API =====

// Получить все объявления с фильтрацией
export const fetchItems = async (params?: {
    q?: string;
    categories?: string;
    needsRevision?: boolean;
    sortColumn?: 'title' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
    limit?: number;
    skip?: number;
}): Promise<ItemsResponse> => {
    const response = await apiClient.get('/items', { params });
    return response.data;
};

// Получить объявление по id
export const fetchItemById = async (id: number): Promise<Ad> => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
};

// Обновить объявление
export const updateItem = async (id: number, data: ItemUpdateIn): Promise<Ad> => {
    const response = await apiClient.put(`/items/${id}`, data);
    return response.data;
};

// Создать новое объявление
export const createItem = async (data: ItemUpdateIn): Promise<Ad> => {
    const response = await apiClient.post('/items', data);
    return response.data;
};

// Удалить объявление
export const deleteItem = async (id: number): Promise<void> => {
    await apiClient.delete(`/items/${id}`);
};
