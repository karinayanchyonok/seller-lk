import { create } from 'zustand';
import { apiClient, type Ad, type ItemsResponse, type ItemUpdateIn } from '../api/client';

interface AdsStore {
    allAds: Ad[];
    filteredAds: Ad[];
    loading: boolean;
    error: string | null;

    // Состояние фильтров
    searchTerm: string;
    selectedCategories: string[];
    onlyNeedsRevision: boolean;

    // Пагинация
    currentPage: number;
    itemsPerPage: number;

    // View mode
    viewMode: 'grid' | 'list';
    sortValue: string;

    // Actions
    fetchAds: () => Promise<void>;
    fetchAdById: (id: number) => Promise<Ad | null>;
    setSearchTerm: (term: string) => void;
    toggleCategory: (category: string) => void;
    setOnlyNeedsRevision: (value: boolean) => void;
    setCurrentPage: (page: number) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    setSortValue: (value: string) => void;
    resetFilters: () => void;
    updateFilteredAds: () => void;
    getPaginatedAds: () => Ad[];
    getTotalPages: () => number;
    getTotalCount: () => number;
    updateAd: (id: number, data: ItemUpdateIn) => Promise<void>;
}

export const useAdsStore = create<AdsStore>()((set, get) => ({
    allAds: [],
    filteredAds: [],
    loading: false,
    error: null,

    searchTerm: '',
    selectedCategories: [],
    onlyNeedsRevision: false,
    currentPage: 1,
    itemsPerPage: 10,
    viewMode: 'grid',
    sortValue: 'newest',

    fetchAds: async () => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.get<ItemsResponse>('/items');
            set({
                allAds: response.data.items as Ad[],
                filteredAds: response.data.items as Ad[],
                loading: false,
            });
        } catch (error) {
            console.error('Ошибка загрузки объявлений:', error);
            set({
                error: 'Ошибка загрузки объявлений',
                loading: false,
                allAds: [],
                filteredAds: [],
            });
        }
    },

    fetchAdById: async (id: number) => {
    console.log('fetchAdById вызван с id:', id);
    try {
        const response = await apiClient.get(`/items/${id}`);
        console.log('Ответ сервера:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка в fetchAdById:', error);
        return null;
    }
},

    setSearchTerm: (term) => {
        set({ searchTerm: term, currentPage: 1 });
        get().updateFilteredAds();
    },

    toggleCategory: (category) => {
        const { selectedCategories } = get();
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        set({ selectedCategories: newCategories, currentPage: 1 });
        get().updateFilteredAds();
    },

    setOnlyNeedsRevision: (value) => {
        set({ onlyNeedsRevision: value, currentPage: 1 });
        get().updateFilteredAds();
    },

    setCurrentPage: (page) => set({ currentPage: page }),

    setViewMode: (mode) => set({ viewMode: mode }),

    setSortValue: (value) => {
        set({ sortValue: value });
        get().updateFilteredAds();
    },

    resetFilters: () => {
        set({
            searchTerm: '',
            selectedCategories: [],
            onlyNeedsRevision: false,
            currentPage: 1,
        });
        get().updateFilteredAds();
    },

    updateAd: async (id, data) => {
        set({ loading: true });
        try {
            const response = await apiClient.put(`/items/${id}`, data);
            const updatedAd = response.data;

            // Обновляем allAds
            const { allAds } = get();
            const index = allAds.findIndex((ad) => ad.id === id);
            if (index !== -1) {
                const newAllAds = [...allAds];
                newAllAds[index] = updatedAd;
                set({ allAds: newAllAds });
            }

            // Обновляем filteredAds
            get().updateFilteredAds();
            set({ loading: false });
        } catch (error) {
            console.error('Ошибка обновления:', error);
            set({ error: 'Ошибка обновления объявления', loading: false });
        }
    },

    updateFilteredAds: () => {
        const { allAds, searchTerm, selectedCategories, onlyNeedsRevision, sortValue } = get();

        let filtered = [...allAds].filter((ad) => {
            const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
            // Преобразуем категории для сравнения (electronics -> Электроника и т.д.)
            const categoryMap: Record<string, string> = {
                electronics: 'Электроника',
                auto: 'Авто',
                real_estate: 'Недвижимость',
            };

            const adCategoryRus = categoryMap[ad.category] || ad.category;
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(adCategoryRus);
            const matchesRevision = !onlyNeedsRevision || ad.needsRevision;
            return matchesSearch && matchesCategory && matchesRevision;
        });

        // Сортировка
        switch (sortValue) {
            case 'title_asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
                break;
            case 'title_desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
                break;
            case 'price_asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                filtered.sort((a, b) => a.id - b.id);
                break;
            default:
                break;
        }

        set({ filteredAds: filtered });
    },

    getPaginatedAds: () => {
        const { filteredAds, currentPage, itemsPerPage } = get();
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredAds.slice(start, end);
    },

    getTotalPages: () => {
        const { filteredAds, itemsPerPage } = get();
        return Math.ceil(filteredAds.length / itemsPerPage);
    },

    getTotalCount: () => {
        const { filteredAds } = get();
        return filteredAds.length;
    },
}));
