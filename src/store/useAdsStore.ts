import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Типы данных
export interface Ad {
    id: number;
    title: string;
    price: number;
    category: 'Авто' | 'Электроника' | 'Недвижимость';
    image?: string;
    needsRevision: boolean;
    description?: string;
    params?: any;
}

// Mock данные
export const mockAds: Ad[] = [
    // Электроника (существующие)
    { id: 1, title: 'Наушники', price: 2990, category: 'Электроника', needsRevision: false },
    {
        id: 5,
        title: 'iPad Air 11, 2024 г.',
        price: 37000,
        category: 'Электроника',
        needsRevision: false,
    },
    { id: 6, title: 'MAJOR VI', price: 20000, category: 'Электроника', needsRevision: false },
    {
        id: 8,
        title: 'iPhone 17 Pro Max',
        price: 107000,
        category: 'Электроника',
        needsRevision: true,
    },
    { id: 9, title: 'MacBook Pro 16"', price: 64000, category: 'Электроника', needsRevision: true },

    // Новая электроника
    {
        id: 11,
        title: 'Samsung Galaxy S24 Ultra',
        price: 89990,
        category: 'Электроника',
        needsRevision: false,
    },
    { id: 12, title: 'PlayStation 5', price: 45990, category: 'Электроника', needsRevision: false },
    { id: 13, title: 'Xbox Series X', price: 42990, category: 'Электроника', needsRevision: true },
    {
        id: 14,
        title: 'Apple Watch Series 9',
        price: 35990,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 15,
        title: 'DJI Mavic 3 Pro',
        price: 159990,
        category: 'Электроника',
        needsRevision: true,
    },
    {
        id: 16,
        title: 'Kindle Paperwhite',
        price: 11990,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 17,
        title: 'RTX 4090 видеокарта',
        price: 159990,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 18,
        title: 'Xiaomi Mi Band 8',
        price: 2990,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 19,
        title: 'Apple Magic Keyboard',
        price: 9990,
        category: 'Электроника',
        needsRevision: true,
    },
    {
        id: 20,
        title: 'Logitech MX Master 3S',
        price: 7990,
        category: 'Электроника',
        needsRevision: false,
    },

    // Авто (существующие)
    { id: 2, title: 'Volkswagen Polo', price: 1100000, category: 'Авто', needsRevision: true },
    { id: 7, title: 'Toyota Camry', price: 3900000, category: 'Авто', needsRevision: true },
    { id: 10, title: 'Omoda C5', price: 2900000, category: 'Авто', needsRevision: false },

    // Новое авто
    { id: 21, title: 'Hyundai Solaris', price: 950000, category: 'Авто', needsRevision: false },
    { id: 22, title: 'Kia Rio', price: 890000, category: 'Авто', needsRevision: false },
    { id: 23, title: 'BMW X5', price: 6500000, category: 'Авто', needsRevision: true },
    {
        id: 24,
        title: 'Mercedes-Benz E-Class',
        price: 5500000,
        category: 'Авто',
        needsRevision: false,
    },
    { id: 25, title: 'Lada Vesta', price: 750000, category: 'Авто', needsRevision: true },
    { id: 26, title: 'Tesla Model 3', price: 4500000, category: 'Авто', needsRevision: false },
    { id: 27, title: 'Audi Q7', price: 7200000, category: 'Авто', needsRevision: false },
    { id: 28, title: 'Chery Tiggo 7 Pro', price: 2800000, category: 'Авто', needsRevision: true },
    { id: 29, title: 'Geely Coolray', price: 2100000, category: 'Авто', needsRevision: false },
    { id: 30, title: 'Haval Jolion', price: 1950000, category: 'Авто', needsRevision: false },

    // Недвижимость (существующие)
    {
        id: 3,
        title: 'Студия, 25м²',
        price: 15000000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    { id: 4, title: '1-кк, 44м²', price: 19000000, category: 'Недвижимость', needsRevision: true },

    // Новая недвижимость
    {
        id: 31,
        title: '2-комнатная, 56м²',
        price: 25000000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 32,
        title: '3-комнатная, 78м²',
        price: 35000000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 33,
        title: 'Квартира-студия, 32м²',
        price: 12800000,
        category: 'Недвижимость',
        needsRevision: true,
    },
    {
        id: 34,
        title: 'Дом с участком, 120м²',
        price: 8500000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 35,
        title: 'Таунхаус, 95м²',
        price: 42000000,
        category: 'Недвижимость',
        needsRevision: true,
    },
    {
        id: 36,
        title: 'Апартаменты, 45м²',
        price: 17500000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 37,
        title: 'Комната в общежитии',
        price: 2800000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 38,
        title: 'Пентхаус, 150м²',
        price: 89000000,
        category: 'Недвижимость',
        needsRevision: true,
    },
    { id: 39, title: 'Дача, 60м²', price: 4200000, category: 'Недвижимость', needsRevision: false },
    {
        id: 40,
        title: 'Коммерческая недвижимость',
        price: 12500000,
        category: 'Недвижимость',
        needsRevision: true,
    },
];

interface AdsStore {
    // Данные
    allAds: Ad[];
    filteredAds: Ad[];

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
    setSearchTerm: (term: string) => void;
    setSelectedCategories: (categories: string[]) => void;
    toggleCategory: (category: string) => void;
    setOnlyNeedsRevision: (value: boolean) => void;
    setCurrentPage: (page: number) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    setSortValue: (value: string) => void;
    resetFilters: () => void;

    // Вычисление отфильтрованных объявлений
    updateFilteredAds: () => void;

    // Получение пагинированных объявлений
    getPaginatedAds: () => Ad[];
    getTotalPages: () => number;
    getTotalCount: () => number;
}

export const useAdsStore = create<AdsStore>()(
    devtools((set, get) => ({
        // Начальные данные
        allAds: mockAds,
        filteredAds: mockAds,

        // Начальные фильтры
        searchTerm: '',
        selectedCategories: [],
        onlyNeedsRevision: false,

        // Пагинация
        currentPage: 1,
        itemsPerPage: 10,

        // View mode
        viewMode: 'grid',
        sortValue: 'newest',

        // Actions
        setSearchTerm: (term) => {
            set({ searchTerm: term, currentPage: 1 });
            get().updateFilteredAds();
        },

        setSelectedCategories: (categories) => {
            set({ selectedCategories: categories, currentPage: 1 });
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

        // Обновление отфильтрованных объявлений
        updateFilteredAds: () => {
            const { allAds, searchTerm, selectedCategories, onlyNeedsRevision, sortValue } = get();

            let filtered = allAds.filter((ad) => {
                const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory =
                    selectedCategories.length === 0 || selectedCategories.includes(ad.category);
                const matchesRevision = !onlyNeedsRevision || ad.needsRevision;
                return matchesSearch && matchesCategory && matchesRevision;
            });

            // Сортировка
            switch (sortValue) {
                case 'title_asc':
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title_desc':
                    filtered.sort((a, b) => b.title.localeCompare(a.title));
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

        // Получение пагинированных объявлений
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
    }))
);
