const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Mock данные (скопируйте из вашего useAdsStore)
const mockAds = [
    { id: 1, title: 'Наушники', price: 2990, category: 'Электроника', needsRevision: false, description: 'Отличные наушники', params: {} },
    { id: 2, title: 'Volkswagen Polo', price: 1100000, category: 'Авто', needsRevision: true, description: '', params: {} },
    { id: 3, title: 'Студия, 25м²', price: 15000000, category: 'Недвижимость', needsRevision: false, description: 'Светлая студия', params: {} },
    { id: 4, title: '1-кк, 44м²', price: 19000000, category: 'Недвижимость', needsRevision: true, description: '', params: {} },
    { id: 5, title: 'iPad Air 11, 2024 г.', price: 37000, category: 'Электроника', needsRevision: false, description: 'Планшет в отличном состоянии', params: {} },
    { id: 6, title: 'MAJOR VI', price: 20000, category: 'Электроника', needsRevision: false, description: 'Наушники', params: {} },
    { id: 7, title: 'Toyota Camry', price: 3900000, category: 'Авто', needsRevision: true, description: '', params: {} },
    { id: 8, title: 'iPhone 17 Pro Max', price: 107000, category: 'Электроника', needsRevision: true, description: '', params: {} },
    { id: 9, title: 'MacBook Pro 16"', price: 64000, category: 'Электроника', needsRevision: true, description: '', params: {} },
    { id: 10, title: 'Omoda C5', price: 2900000, category: 'Авто', needsRevision: false, description: 'Новый автомобиль', params: {} },
    { id: 11, title: 'Samsung Galaxy S24 Ultra', price: 89990, category: 'Электроника', needsRevision: false, description: 'Смартфон', params: {} },
    { id: 12, title: 'PlayStation 5', price: 45990, category: 'Электроника', needsRevision: false, description: 'Игровая консоль', params: {} },
];

// API endpoints

// GET /items - получить все объявления с фильтрацией
app.get('/items', (req, res) => {
    let items = [...mockAds];
    const { q, category, needsRevision, sortColumn, sortDirection, limit, skip } = req.query;
    
    // Фильтрация по поиску
    if (q) {
        items = items.filter(item => 
            item.title.toLowerCase().includes(q.toLowerCase())
        );
    }
    
    // Фильтрация по категории
    if (category) {
        const categories = category.split(',');
        items = items.filter(item => categories.includes(item.category));
    }
    
    // Фильтрация по доработкам
    if (needsRevision === 'true') {
        items = items.filter(item => item.needsRevision === true);
    }
    
    // Сортировка
    if (sortColumn) {
        items.sort((a, b) => {
            let aVal = a[sortColumn];
            let bVal = b[sortColumn];
            
            if (sortColumn === 'price') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            }
            
            if (sortDirection === 'desc') {
                return aVal > bVal ? -1 : 1;
            } else {
                return aVal < bVal ? -1 : 1;
            }
        });
    }
    
    const total = items.length;
    
    // Пагинация
    if (limit) {
        const start = skip ? parseInt(skip) : 0;
        const end = start + parseInt(limit);
        items = items.slice(start, end);
    }
    
    res.json({ items, total });
});

// GET /items/:id - получить одно объявление
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = mockAds.find(ad => ad.id === id);
    
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Объявление не найдено' });
    }
});

// PUT /items/:id - обновить объявление
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockAds.findIndex(ad => ad.id === id);
    
    if (index !== -1) {
        mockAds[index] = { ...mockAds[index], ...req.body };
        res.json(mockAds[index]);
    } else {
        res.status(404).json({ error: 'Объявление не найдено' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📋 API доступно по адресу: http://localhost:${PORT}/items`);
});