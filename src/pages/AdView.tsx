import EditIcon from '@mui/icons-material/Edit';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, Paper, Stack, Typography, IconButton, Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdsStore } from '../store/useAdsStore';
import { translateCategory } from '../components/listings/ListingsCatalogSection';

// Компонент для отображения характеристик в зависимости от категории
const getCharacteristics = (ad: any) => {
    const characteristics = [];
    const params = ad.params || {};

    switch (ad.category) {
        case 'electronics':
            if (params.type) {
                const typeMap: Record<string, string> = { phone: 'Телефон', laptop: 'Ноутбук', misc: 'Другое' };
                characteristics.push({ label: 'Тип', value: typeMap[params.type] || params.type });
            }
            if (params.brand) characteristics.push({ label: 'Бренд', value: params.brand });
            if (params.model) characteristics.push({ label: 'Модель', value: params.model });
            if (params.condition) {
                characteristics.push({
                    label: 'Состояние',
                    value: params.condition === 'new' ? 'Новое' : 'Б/У',
                });
            }
            if (params.color) characteristics.push({ label: 'Цвет', value: params.color });
            break;
        case 'auto':
            if (params.brand) characteristics.push({ label: 'Бренд', value: params.brand });
            if (params.model) characteristics.push({ label: 'Модель', value: params.model });
            if (params.yearOfManufacture) {
                characteristics.push({ label: 'Год выпуска', value: params.yearOfManufacture });
            }
            if (params.transmission) {
                characteristics.push({
                    label: 'Коробка передач',
                    value: params.transmission === 'automatic' ? 'Автомат' : 'Механика',
                });
            }
            if (params.mileage) {
                characteristics.push({ label: 'Пробег', value: `${params.mileage} км` });
            }
            if (params.enginePower) {
                characteristics.push({
                    label: 'Мощность двигателя',
                    value: `${params.enginePower} л.с.`,
                });
            }
            break;
        case 'real_estate':
            if (params.type) {
                const typeMap: Record<string, string> = { flat: 'Квартира', house: 'Дом', room: 'Комната' };
                characteristics.push({
                    label: 'Тип',
                    value: typeMap[params.type] || params.type,
                });
            }
            if (params.address) characteristics.push({ label: 'Адрес', value: params.address });
            if (params.area) characteristics.push({ label: 'Площадь', value: `${params.area} м²` });
            if (params.floor) characteristics.push({ label: 'Этаж', value: params.floor });
            break;
        default:
            break;
    }

    return characteristics;
};

// Функция для определения незаполненных полей
const getMissingFields = (ad: any) => {
    const missing = [];
    const params = ad.params || {};

    // Проверка описания
    if (!ad.description || ad.description.trim() === '') {
        missing.push('Описание');
    }

    // Проверка полей в зависимости от категории
    switch (ad.category) {
        case 'electronics':
            if (!params.type) missing.push('Тип');
            if (!params.brand) missing.push('Бренд');
            if (!params.model) missing.push('Модель');
            if (!params.condition) missing.push('Состояние');
            if (!params.color) missing.push('Цвет');
            break;
        case 'auto':
            if (!params.brand) missing.push('Бренд');
            if (!params.model) missing.push('Модель');
            if (!params.yearOfManufacture) missing.push('Год выпуска');
            if (!params.transmission) missing.push('Коробка передач');
            if (!params.mileage) missing.push('Пробег');
            break;
        case 'real_estate':
            if (!params.type) missing.push('Тип недвижимости');
            if (!params.area) missing.push('Площадь');
            break;
        default:
            break;
    }

    return missing;
};

// Функция для преобразования категории в русский язык для отображения
const getCategoryRussian = (category: string): string => {
    const categoryMap: Record<string, string> = {
        'auto': 'Авто',
        'electronics': 'Электроника',
        'real_estate': 'Недвижимость',
    };
    return categoryMap[category] || category;
};

export const AdView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { allAds } = useAdsStore();

    const ad = allAds.find((item) => item.id === Number(id));

    if (!ad) {
        return (
            <Paper elevation={0} sx={{ borderRadius: 4, p: 4, textAlign: 'center' }}>
                <Typography variant="h5">Объявление не найдено</Typography>
                <Button variant="contained" onClick={() => navigate('/ads')} sx={{ mt: 2 }}>
                    Вернуться к списку
                </Button>
            </Paper>
        );
    }

    const characteristics = getCharacteristics(ad);
    const missingFields = getMissingFields(ad);
    const needsRevision = missingFields.length > 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    const formatDate = () => {
        const now = new Date();
        return (
            now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) +
            ' ' +
            now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        );
    };

    return (
        <Box sx={{ maxWidth: 1399, mx: 'auto', width: '100%', px: 2 }}>
            {/* Кнопка назад */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/ads')}
                sx={{ mb: 2, textTransform: 'none' }}
            >
                Назад к списку
            </Button>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    p: 4,
                    pb: 6,
                    bgcolor: 'background.paper',
                    width: '100%',
                }}
            >
                {/* Header section */}
                <Stack spacing={2} mb={2}>
                    {/* Title and price row */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Typography variant="h4" fontWeight={500} color="rgba(0,0,0,0.85)">
                            {ad.title}
                        </Typography>
                        <Typography variant="h4" fontWeight={500} color="rgba(0,0,0,0.85)">
                            {formatPrice(ad.price)}
                        </Typography>
                    </Stack>

                    {/* Edit button and dates row */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            startIcon={<EditIcon sx={{ width: 18, height: 18 }} />}
                            onClick={() => navigate(`/ads/${ad.id}/edit`)}
                            sx={{
                                bgcolor: '#1890ff',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: 14,
                                px: 1.5,
                                py: 1,
                                '&:hover': { bgcolor: '#40a9ff' },
                            }}
                        >
                            Редактировать
                        </Button>

                        {/* Publication and edit dates */}
                        <Stack spacing={0.25} alignItems="flex-end">
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#848388',
                                    fontFamily: 'Inter, Helvetica, sans-serif',
                                }}
                            >
                                Опубликовано: {formatDate()}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#848388',
                                    fontFamily: 'Inter, Helvetica, sans-serif',
                                }}
                            >
                                Отредактировано: {formatDate()}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Divider sx={{ bgcolor: '#f0f0f0', mb: 4 }} />

                {/* Main content: image + info */}
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={4}
                    alignItems="flex-start"
                    mb={4}
                >
                    {/* Image placeholder */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 480 },
                            minWidth: { xs: 'auto', md: 480 },
                            height: 360,
                            bgcolor: '#fafafa',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #f0f0f0',
                        }}
                    >
                        <ImageOutlinedIcon sx={{ fontSize: 80, color: '#bdbdbd' }} />
                    </Box>

                    {/* Right column: warning + characteristics */}
                    <Stack spacing={4.5} flex={1}>
                        {/* Warning card - показываем только если есть незаполненные поля */}
                        {needsRevision && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    px: 2,
                                    py: 1.5,
                                    bgcolor: '#f9f1e6',
                                    borderRadius: 2,
                                    boxShadow: '0px 12px 8px -5px rgba(0,0,0,0.05)',
                                    width: '100%',
                                }}
                            >
                                <ErrorOutlineIcon
                                    sx={{ color: '#fa8c16', width: 18, height: 18, mt: 0.25 }}
                                />
                                <Stack spacing={0.5} flex={1}>
                                    <Box sx={{ pr: 3 }}>
                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                            sx={{ color: '#1e1e1e', lineHeight: '24px' }}
                                        >
                                            Требуются доработки
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'rgba(0,0,0,0.85)', lineHeight: '22px' }}
                                    >
                                        У объявления не заполнены поля:
                                        <br />
                                        {missingFields.map((field, index) => (
                                            <span key={field}>
                                                • {field}
                                                {index < missingFields.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}

                        {/* Characteristics section */}
                        {characteristics.length > 0 && (
                            <Stack spacing={2}>
                                <Typography variant="h6" fontWeight={700} color="rgba(0,0,0,0.85)">
                                    Характеристики
                                </Typography>

                                <Stack spacing={0.75}>
                                    {characteristics.map((item) => (
                                        <Stack
                                            key={item.label}
                                            direction="row"
                                            spacing={3}
                                            alignItems="center"
                                            flexWrap="wrap"
                                        >
                                            <Box sx={{ width: 148, minWidth: 148 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                    color="rgba(0,0,0,0.45)"
                                                >
                                                    {item.label}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="rgba(0,0,0,0.88)">
                                                {item.value}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        )}

                        {/* Бейдж категории */}
                        <Chip
                            label={getCategoryRussian(ad.category)}
                            sx={{
                                width: 'fit-content',
                                bgcolor: ad.category === 'electronics' ? '#e3f2fd' : ad.category === 'auto' ? '#e8f5e9' : '#fff3e0',
                                color: ad.category === 'electronics' ? '#1976d2' : ad.category === 'auto' ? '#2e7d32' : '#ed6c02',
                                fontWeight: 'bold',
                            }}
                        />
                    </Stack>
                </Stack>

                {/* Description section */}
                <Stack spacing={2} maxWidth={ad.description ? 800 : '100%'}>
                    <Typography variant="h6" fontWeight={700} color="rgba(0,0,0,0.85)">
                        Описание
                    </Typography>
                    <Typography variant="body2" color="rgba(0,0,0,0.88)" lineHeight="22px">
                        {ad.description ||
                            "Описание отсутствует. Нажмите 'Редактировать', чтобы добавить описание."}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AdView;