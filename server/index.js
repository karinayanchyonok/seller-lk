const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// ===== MOCK ДАННЫЕ =====
let items = [
    // ===== ЭЛЕКТРОНИКА (20 шт) =====
    {
        id: 1,
        title: 'Наушники Sony WH-1000XM5',
        price: 29990,
        category: 'electronics',
        description: 'Отличные беспроводные наушники с шумоподавлением',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Sony',
            model: 'WH-1000XM5',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 2,
        title: 'iPhone 15 Pro Max',
        price: 129990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'phone',
            brand: 'Apple',
            model: '15 Pro Max',
            condition: 'new',
            color: 'Natural Titanium',
        },
    },
    {
        id: 3,
        title: 'MacBook Pro 16"',
        price: 199990,
        category: 'electronics',
        description: 'Мощный ноутбук для работы',
        needsRevision: false,
        params: {
            type: 'laptop',
            brand: 'Apple',
            model: 'M3 Pro',
            condition: 'new',
            color: 'Space Gray',
        },
    },
    {
        id: 4,
        title: 'iPad Air 11',
        price: 37000,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'Apple',
            model: 'iPad Air',
            condition: 'used',
            color: 'Silver',
        },
    },
    {
        id: 5,
        title: 'Samsung Galaxy S24 Ultra',
        price: 109990,
        category: 'electronics',
        description: 'Флагманский смартфон с AI-функциями',
        needsRevision: false,
        params: {
            type: 'phone',
            brand: 'Samsung',
            model: 'Galaxy S24 Ultra',
            condition: 'new',
            color: 'Titanium Gray',
        },
    },
    {
        id: 6,
        title: 'PlayStation 5',
        price: 45990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: { type: 'misc', brand: 'Sony', model: 'PS5', condition: 'new', color: 'white' },
    },
    {
        id: 7,
        title: 'Xbox Series X',
        price: 42990,
        category: 'electronics',
        description: 'Игровая консоль с 1TB SSD',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Microsoft',
            model: 'Xbox Series X',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 8,
        title: 'Apple Watch Ultra 2',
        price: 73990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'Apple',
            model: 'Watch Ultra 2',
            condition: 'new',
            color: 'Titanium',
        },
    },
    {
        id: 9,
        title: 'DJI Mavic 3 Pro',
        price: 159990,
        category: 'electronics',
        description: 'Профессиональный дрон с камерой Hasselblad',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'DJI',
            model: 'Mavic 3 Pro',
            condition: 'new',
            color: 'gray',
        },
    },
    {
        id: 10,
        title: 'RTX 4090 видеокарта',
        price: 159990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'NVIDIA',
            model: 'RTX 4090',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 11,
        title: 'Xiaomi Mi Band 8',
        price: 2990,
        category: 'electronics',
        description: 'Фитнес-браслет с AMOLED экраном',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Xiaomi',
            model: 'Mi Band 8',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 12,
        title: 'Kindle Paperwhite',
        price: 11990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'Amazon',
            model: 'Paperwhite',
            condition: 'used',
            color: 'black',
        },
    },
    {
        id: 13,
        title: 'Logitech MX Master 3S',
        price: 7990,
        category: 'electronics',
        description: 'Беспроводная мышь для дизайнеров',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Logitech',
            model: 'MX Master 3S',
            condition: 'new',
            color: 'gray',
        },
    },
    {
        id: 14,
        title: 'Apple Magic Keyboard',
        price: 9990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'Apple',
            model: 'Magic Keyboard',
            condition: 'used',
            color: 'white',
        },
    },
    {
        id: 15,
        title: 'Samsung Odyssey G9',
        price: 89990,
        category: 'electronics',
        description: '49-дюймовый изогнутый монитор',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Samsung',
            model: 'Odyssey G9',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 16,
        title: 'ASUS ROG Phone 7',
        price: 89990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'phone',
            brand: 'ASUS',
            model: 'ROG Phone 7',
            condition: 'new',
            color: 'black',
        },
    },
    {
        id: 17,
        title: 'Google Pixel 8 Pro',
        price: 79990,
        category: 'electronics',
        description: 'Смартфон с лучшей камерой',
        needsRevision: false,
        params: {
            type: 'phone',
            brand: 'Google',
            model: 'Pixel 8 Pro',
            condition: 'new',
            color: 'Porcelain',
        },
    },
    {
        id: 18,
        title: 'Nothing Phone (2)',
        price: 49990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'phone',
            brand: 'Nothing',
            model: 'Phone (2)',
            condition: 'new',
            color: 'white',
        },
    },
    {
        id: 19,
        title: 'Huawei Watch GT 4',
        price: 18990,
        category: 'electronics',
        description: 'Умные часы с дизайном классических',
        needsRevision: false,
        params: {
            type: 'misc',
            brand: 'Huawei',
            model: 'Watch GT 4',
            condition: 'new',
            color: 'brown',
        },
    },
    {
        id: 20,
        title: 'Steam Deck 512GB',
        price: 39990,
        category: 'electronics',
        description: '',
        needsRevision: true,
        params: {
            type: 'misc',
            brand: 'Valve',
            model: 'Steam Deck',
            condition: 'used',
            color: 'black',
        },
    },

    // ===== АВТО (15 шт) =====
    {
        id: 21,
        title: 'Toyota Camry',
        price: 3900000,
        category: 'auto',
        description: 'Автомобиль в отличном состоянии',
        needsRevision: false,
        params: {
            brand: 'Toyota',
            model: 'Camry',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 25000,
            enginePower: 200,
        },
    },
    {
        id: 22,
        title: 'Volkswagen Polo',
        price: 1100000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Volkswagen',
            model: 'Polo',
            yearOfManufacture: 2021,
            transmission: 'manual',
            mileage: 45000,
            enginePower: 110,
        },
    },
    {
        id: 23,
        title: 'BMW X5',
        price: 6500000,
        category: 'auto',
        description: 'Премиум внедорожник',
        needsRevision: false,
        params: {
            brand: 'BMW',
            model: 'X5',
            yearOfManufacture: 2023,
            transmission: 'automatic',
            mileage: 5000,
            enginePower: 340,
        },
    },
    {
        id: 24,
        title: 'Hyundai Solaris',
        price: 950000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Hyundai',
            model: 'Solaris',
            yearOfManufacture: 2020,
            transmission: 'automatic',
            mileage: 60000,
            enginePower: 123,
        },
    },
    {
        id: 25,
        title: 'Mercedes-Benz E-Class',
        price: 5500000,
        category: 'auto',
        description: 'Бизнес-класс в идеальном состоянии',
        needsRevision: false,
        params: {
            brand: 'Mercedes-Benz',
            model: 'E 300',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 15000,
            enginePower: 258,
        },
    },
    {
        id: 26,
        title: 'Kia Rio',
        price: 890000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Kia',
            model: 'Rio',
            yearOfManufacture: 2021,
            transmission: 'manual',
            mileage: 35000,
            enginePower: 123,
        },
    },
    {
        id: 27,
        title: 'Tesla Model 3',
        price: 4500000,
        category: 'auto',
        description: 'Электромобиль с запасом хода 500км',
        needsRevision: false,
        params: {
            brand: 'Tesla',
            model: 'Model 3',
            yearOfManufacture: 2023,
            transmission: 'automatic',
            mileage: 8000,
            enginePower: 350,
        },
    },
    {
        id: 28,
        title: 'Audi Q7',
        price: 7200000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Audi',
            model: 'Q7',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 20000,
            enginePower: 286,
        },
    },
    {
        id: 29,
        title: 'Chery Tiggo 7 Pro',
        price: 2800000,
        category: 'auto',
        description: 'Китайский кроссовер с богатым оснащением',
        needsRevision: false,
        params: {
            brand: 'Chery',
            model: 'Tiggo 7 Pro',
            yearOfManufacture: 2023,
            transmission: 'automatic',
            mileage: 5000,
            enginePower: 150,
        },
    },
    {
        id: 30,
        title: 'Geely Coolray',
        price: 2100000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Geely',
            model: 'Coolray',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 15000,
            enginePower: 150,
        },
    },
    {
        id: 31,
        title: 'Haval Jolion',
        price: 1950000,
        category: 'auto',
        description: 'Компактный кроссовер',
        needsRevision: false,
        params: {
            brand: 'Haval',
            model: 'Jolion',
            yearOfManufacture: 2023,
            transmission: 'automatic',
            mileage: 3000,
            enginePower: 143,
        },
    },
    {
        id: 32,
        title: 'Lada Vesta',
        price: 750000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Lada',
            model: 'Vesta',
            yearOfManufacture: 2021,
            transmission: 'manual',
            mileage: 50000,
            enginePower: 106,
        },
    },
    {
        id: 33,
        title: 'Nissan Qashqai',
        price: 2350000,
        category: 'auto',
        description: 'Популярный кроссовер',
        needsRevision: false,
        params: {
            brand: 'Nissan',
            model: 'Qashqai',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 20000,
            enginePower: 140,
        },
    },
    {
        id: 34,
        title: 'Mazda CX-5',
        price: 2850000,
        category: 'auto',
        description: '',
        needsRevision: true,
        params: {
            brand: 'Mazda',
            model: 'CX-5',
            yearOfManufacture: 2022,
            transmission: 'automatic',
            mileage: 25000,
            enginePower: 194,
        },
    },
    {
        id: 35,
        title: 'Omoda C5',
        price: 2900000,
        category: 'auto',
        description: 'Стильный китайский кроссовер',
        needsRevision: false,
        params: {
            brand: 'Omoda',
            model: 'C5',
            yearOfManufacture: 2023,
            transmission: 'automatic',
            mileage: 10000,
            enginePower: 147,
        },
    },

    // ===== НЕДВИЖИМОСТЬ (15 шт) =====
    {
        id: 36,
        title: 'Студия в центре',
        price: 15000000,
        category: 'real_estate',
        description: 'Светлая студия с ремонтом',
        needsRevision: false,
        params: { type: 'flat', address: 'ул. Тверская, 15', area: 25, floor: 5 },
    },
    {
        id: 37,
        title: '1-комнатная квартира',
        price: 19000000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'flat', address: 'пр. Мира, 10', area: 44, floor: 3 },
    },
    {
        id: 38,
        title: 'Дом с участком',
        price: 8500000,
        category: 'real_estate',
        description: 'Уютный дом для семьи',
        needsRevision: false,
        params: { type: 'house', address: 'МО, г. Видное', area: 120, floor: 2 },
    },
    {
        id: 39,
        title: 'Пентхаус',
        price: 89000000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'flat', address: 'ул. Новый Арбат, 20', area: 150, floor: 12 },
    },
    {
        id: 40,
        title: '2-комнатная квартира',
        price: 25000000,
        category: 'real_estate',
        description: 'Просторная квартира с видом на город',
        needsRevision: false,
        params: { type: 'flat', address: 'ул. Пушкина, 25', area: 65, floor: 7 },
    },
    {
        id: 41,
        title: '3-комнатная квартира',
        price: 35000000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'flat', address: 'Кутузовский пр., 30', area: 85, floor: 10 },
    },
    {
        id: 42,
        title: 'Квартира-студия',
        price: 12800000,
        category: 'real_estate',
        description: 'Студия с современным ремонтом',
        needsRevision: false,
        params: { type: 'flat', address: 'ул. Ленина, 5', area: 32, floor: 4 },
    },
    {
        id: 43,
        title: 'Таунхаус',
        price: 42000000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'house', address: 'Рублево-Успенское ш.', area: 180, floor: 3 },
    },
    {
        id: 44,
        title: 'Апартаменты',
        price: 17500000,
        category: 'real_estate',
        description: 'Апартаменты в деловом центре',
        needsRevision: false,
        params: { type: 'flat', address: 'ММДЦ Москва-Сити', area: 45, floor: 25 },
    },
    {
        id: 45,
        title: 'Комната в общежитии',
        price: 2800000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'room', address: 'ул. Студенческая, 12', area: 18, floor: 3 },
    },
    {
        id: 46,
        title: 'Дача',
        price: 4200000,
        category: 'real_estate',
        description: 'Дача с садом и баней',
        needsRevision: false,
        params: { type: 'house', address: 'СНТ "Березка"', area: 60, floor: 1 },
    },
    {
        id: 47,
        title: 'Коммерческая недвижимость',
        price: 12500000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'flat', address: 'ул. Тверская, 1', area: 80, floor: 1 },
    },
    {
        id: 48,
        title: 'Коттедж',
        price: 28000000,
        category: 'real_estate',
        description: 'Коттедж с бассейном',
        needsRevision: false,
        params: { type: 'house', address: 'Новорижское ш.', area: 200, floor: 2 },
    },
    {
        id: 49,
        title: 'Студия у метро',
        price: 11200000,
        category: 'real_estate',
        description: '',
        needsRevision: true,
        params: { type: 'flat', address: 'ул. Профсоюзная, 100', area: 28, floor: 6 },
    },
    {
        id: 50,
        title: 'Премиум апартаменты',
        price: 125000000,
        category: 'real_estate',
        description: 'Элитные апартаменты с панорамным видом',
        needsRevision: false,
        params: { type: 'flat', address: 'Остоженка, 12', area: 250, floor: 15 },
    },
];

// Вспомогательная функция для обновления needsRevision
function updateNeedsRevision(item) {
    const hasEmptyDescription = !item.description || item.description.trim() === '';

    // Проверяем заполненность params в зависимости от категории
    let hasEmptyParams = false;

    switch (item.category) {
        case 'electronics':
            hasEmptyParams = !item.params?.brand || !item.params?.model || !item.params?.condition;
            break;
        case 'auto':
            hasEmptyParams =
                !item.params?.brand ||
                !item.params?.model ||
                !item.params?.yearOfManufacture ||
                !item.params?.transmission;
            break;
        case 'real_estate':
            hasEmptyParams = !item.params?.type || !item.params?.area;
            break;
        default:
            hasEmptyParams = false;
    }

    return hasEmptyDescription || hasEmptyParams;
}

// Обновляем needsRevision для всех объявлений
items = items.map((item) => ({
    ...item,
    needsRevision: updateNeedsRevision(item),
}));

// ===== ЭНДПОИНТЫ API =====

// GET /items - получение всех объявлений с фильтрацией
app.get('/items', (req, res) => {
    let result = [...items];
    const { q, categories, needsRevision, sortColumn, sortDirection, limit, skip } = req.query;

    // Фильтрация по поиску (q)
    if (q) {
        result = result.filter((item) => item.title.toLowerCase().includes(q.toLowerCase()));
    }

    // Фильтрация по категориям
    if (categories) {
        const categoryArray = categories.split(',');
        result = result.filter((item) => categoryArray.includes(item.category));
    }

    // Фильтрация по требованию доработок
    if (needsRevision === 'true') {
        result = result.filter((item) => item.needsRevision === true);
    }

    // Сортировка
    if (sortColumn) {
        result.sort((a, b) => {
            let aVal = a[sortColumn];
            let bVal = b[sortColumn];

            // Для числовых полей
            if (sortColumn === 'price') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            }

            // Для строковых полей
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (sortDirection === 'desc') {
                return aVal > bVal ? -1 : 1;
            } else {
                return aVal < bVal ? -1 : 1;
            }
        });
    } else {
        // Сортировка по умолчанию: по дате создания (id)
        result.sort((a, b) => b.id - a.id);
    }

    const total = result.length;

    // Пагинация
    if (limit) {
        const skipNum = skip ? parseInt(skip) : 0;
        const limitNum = parseInt(limit);
        result = result.slice(skipNum, skipNum + limitNum);
    }

    // Форматируем ответ
    const response = {
        items: result.map(({ id, title, price, category, needsRevision }) => ({
            id,
            title,
            price,
            category,
            needsRevision,
        })),
        total,
    };

    res.json(response);
});

// GET /items/:id - получение конкретного объявления
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);

    if (!item) {
        return res.status(404).json({ error: 'Объявление не найдено' });
    }

    // Возвращаем полную информацию
    res.json(item);
});

// PUT /items/:id - полное обновление объявления
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Объявление не найдено' });
    }

    const updateData = req.body;

    // Валидация обязательных полей
    if (!updateData.category || !updateData.title || updateData.price === undefined) {
        return res.status(400).json({ error: 'Обязательные поля: category, title, price' });
    }

    // Обновляем объявление
    const updatedItem = {
        ...items[index],
        category: updateData.category,
        title: updateData.title,
        price: updateData.price,
        description: updateData.description || '',
        params: updateData.params || items[index].params,
        id: items[index].id, // сохраняем оригинальный id
    };

    // Обновляем needsRevision
    updatedItem.needsRevision = updateNeedsRevision(updatedItem);

    items[index] = updatedItem;

    res.json(updatedItem);
});

// OPTIONAL: POST /items - создание нового объявления (если понадобится)
app.post('/items', (req, res) => {
    const newId = Math.max(...items.map((i) => i.id)) + 1;
    const newItem = {
        id: newId,
        ...req.body,
        needsRevision: true,
    };

    newItem.needsRevision = updateNeedsRevision(newItem);
    items.push(newItem);

    res.status(201).json(newItem);
});

// OPTIONAL: DELETE /items/:id - удаление объявления
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Объявление не найдено' });
    }

    items.splice(index, 1);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`API доступно по адресу: http://localhost:${PORT}/items`);
});
