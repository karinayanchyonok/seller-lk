import { useState } from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Badge,
    Divider,
    Pagination,
    Paper,
    Stack,
    Switch,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Типы данных
interface Ad {
    id: number;
    title: string;
    price: number;
    category: 'Авто' | 'Электроника' | 'Недвижимость';
    image?: string;
    needsRevision: boolean;
    description?: string;
    params?: any;
}

// Mock данные на основе макета
const mockAds: Ad[] = [
    {
        id: 1,
        title: 'Наушники',
        price: 2990,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 2,
        title: 'Volkswagen Polo',
        price: 1100000,
        category: 'Авто',
        needsRevision: true,
    },
    {
        id: 3,
        title: 'Студия, 25м²',
        price: 15000000,
        category: 'Недвижимость',
        needsRevision: false,
    },
    {
        id: 4,
        title: '1-кк, 44м²',
        price: 19000000,
        category: 'Недвижимость',
        needsRevision: true,
    },
    {
        id: 5,
        title: 'iPad Air 11, 2024 г.',
        price: 37000,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 6,
        title: 'MAJOR VI',
        price: 20000,
        category: 'Электроника',
        needsRevision: false,
    },
    {
        id: 7,
        title: 'Toyota Camry',
        price: 3900000,
        category: 'Авто',
        needsRevision: true,
    },
    {
        id: 8,
        title: 'iPhone 17 Pro Max',
        price: 107000,
        category: 'Электроника',
        needsRevision: true,
    },
];

export const AdsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Обработчики фильтров
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
        setPage(1);
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setOnlyNeedsRevision(false);
        setSearchTerm('');
        setPage(1);
    };

    // Фильтрация объявлений
    const filteredAds = mockAds.filter((ad) => {
        const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(ad.category);
        const matchesRevision = !onlyNeedsRevision || ad.needsRevision;
        return matchesSearch && matchesCategory && matchesRevision;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredAds.length / itemsPerPage);
    const paginatedAds = filteredAds.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Шапка с заголовком и поиском */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Мои объявления
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {filteredAds.length} объявлений
                    </Typography>
                </Box>
                {/* Поиск */}
                <TextField
                    fullWidth
                    placeholder="Найти объявление..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Grid container spacing={3}>
                {/* ЛЕВАЯ КОЛОНКА - ФИЛЬТРЫ */}
                <Grid item xs={12} md={3} lg={2} xl={2}>
                    <Paper sx={{ p: 2, position: 'sticky', top: 16 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Фильтры
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Категории */}
                        <Typography variant="subtitle2" gutterBottom color="text.secondary">
                            Категория
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCategories.includes('Авто')}
                                        onChange={() => handleCategoryChange('Авто')}
                                    />
                                }
                                label="Авто"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCategories.includes('Электроника')}
                                        onChange={() => handleCategoryChange('Электроника')}
                                    />
                                }
                                label="Электроника"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCategories.includes('Недвижимость')}
                                        onChange={() => handleCategoryChange('Недвижимость')}
                                    />
                                }
                                label="Недвижимость"
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* СВИЧ "Только требующие доработок" */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={onlyNeedsRevision}
                                    onChange={(e) => setOnlyNeedsRevision(e.target.checked)}
                                />
                            }
                            label="Только требующие доработок"
                            labelPlacement="start"
                            sx={{
                                justifyContent: 'space-between',
                                width: '100%',
                                ml: 0, // Убираем отступ слева
                            }}
                        />

                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleResetFilters}
                        >
                            Сбросить фильтры
                        </Button>
                    </Paper>
                </Grid>

                {/* ПРАВАЯ КОЛОНКА - СПИСОК ОБЪЯВЛЕНИЙ */}
                <Grid item xs={12} md={10}>
                    {/* Список карточек объявлений */}
                    <Stack spacing={2}>
                        {paginatedAds.map((ad) => (
                            <AdCard key={ad.id} ad={ad} />
                        ))}
                    </Stack>

                    {/* Пагинация */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}

                    {/* Если объявлений нет */}
                    {filteredAds.length === 0 && (
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">Объявления не найдены</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

// Компонент карточки объявления
const AdCard = ({ ad }: { ad: Ad }) => {
    // Функция для получения цвета категории
    const getCategoryColor = () => {
        switch (ad.category) {
            case 'Авто':
                return '#4caf50';
            case 'Электроника':
                return '#2196f3';
            case 'Недвижимость':
                return '#ff9800';
            default:
                return '#9e9e9e';
        }
    };

    // Форматирование цены
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    return (
        <Card sx={{ display: 'flex', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
            {/* Placeholder изображения */}
            <CardMedia
                component="div"
                sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                }}
            >
                📦
            </CardMedia>

            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Box>
                    {/* Категория */}
                    <Typography
                        variant="caption"
                        sx={{
                            color: getCategoryColor(),
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}
                    >
                        {ad.category}
                    </Typography>

                    {/* Название */}
                    <Typography variant="h6" component="h3" gutterBottom>
                        {ad.title}
                    </Typography>

                    {/* Цена */}
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatPrice(ad.price)}
                    </Typography>
                </Box>

                {/* Бейдж "Требует доработок" */}
                {ad.needsRevision && (
                    <Chip
                        label="Требует доработок"
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                    />
                )}
            </CardContent>
        </Card>
    );
};
