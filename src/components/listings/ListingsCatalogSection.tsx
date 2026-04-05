import React, { type JSX } from 'react';
import {
    Box,
    Stack,
    Typography,
    Checkbox,
    FormControlLabel,
    Switch,
    Divider,
    Paper,
    Chip,
    Button,
    Pagination,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useAdsStore } from '../../store/useAdsStore';
import { useNavigate } from 'react-router-dom';

const categories = ['Авто', 'Электроника', 'Недвижимость'];

// Функция для преобразования категории из API в русский язык
export const translateCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
        'auto': 'Авто',
        'electronics': 'Электроника',
        'real_estate': 'Недвижимость',
        // Если вдруг приходят уже русские названия
        'Авто': 'Авто',
        'Электроника': 'Электроника',
        'Недвижимость': 'Недвижимость',
    };
    return categoryMap[category] || category;
};

// Компонент карточки в виде списка (горизонтальной) - НОВЫЙ ДИЗАЙН
const ListCard = ({ ad }: { ad: any }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ads/${ad.id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    const categoryRussian = translateCategory(ad.category);

    return (
        <Paper
            elevation={0}
            onClick={handleClick}
            sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: '#e0e0e0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 2,
                },
            }}
        >
            {/* Image placeholder */}
            <Box
                sx={{
                    width: 179,
                    minHeight: 132,
                    flexShrink: 0,
                    bgcolor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ImageOutlinedIcon sx={{ fontSize: 48, color: '#bdbdbd' }} />
            </Box>

            {/* Card content */}
            <Stack spacing={0.5} sx={{ pl: 3, pr: 2, py: 2, flex: 1, minWidth: 0 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#848388',
                        fontFamily: 'Inter, Helvetica',
                        fontWeight: 400,
                    }}
                >
                    {categoryRussian}
                </Typography>
                <Typography variant="h6" fontWeight={400} color="text.primary" noWrap>
                    {ad.title}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="text.secondary" noWrap>
                    {formatPrice(ad.price)}
                </Typography>

                {/* "Needs work" badge */}
                {ad.needsRevision && (
                    <Box sx={{ mt: 0.5 }}>
                        <Chip
                            icon={
                                <FiberManualRecordIcon
                                    sx={{
                                        fontSize: 8,
                                        color: '#faad14 !important',
                                    }}
                                />
                            }
                            label="Требует доработок"
                            size="small"
                            sx={{
                                bgcolor: '#f9f1e6',
                                color: '#faad14',
                                fontWeight: 400,
                                fontSize: 14,
                                borderRadius: 2,
                                height: 'auto',
                                py: 0.25,
                                '& .MuiChip-label': { px: 0.5 },
                                '& .MuiChip-icon': { ml: 0.5 },
                            }}
                        />
                    </Box>
                )}
            </Stack>
        </Paper>
    );
};

// Компонент карточки в виде сетки
const GridCard = ({ ad }: { ad: any }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ads/${ad.id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    const categoryRussian = translateCategory(ad.category);

    return (
        <Paper
            elevation={0}
            onClick={handleClick}
            sx={{
                width: 200,
                minHeight: 268,
                borderRadius: 3,
                border: '1px solid #e8e8e8',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#fafafa',
                cursor: 'pointer',
                '&:hover': { boxShadow: 2 },
            }}
        >
            <Box
                sx={{
                    height: 150,
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <ImageOutlinedIcon sx={{ fontSize: 48, color: '#bdbdbd' }} />
                <Chip
                    label={categoryRussian}
                    size="small"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: '#fff',
                        border: '1px solid #d9d9d9',
                        borderRadius: 1,
                        fontSize: 12,
                        height: 22,
                    }}
                />
            </Box>
            <Stack spacing={0.5} sx={{ pt: '14px', pb: 2, px: 2, flex: 1 }}>
                <Typography variant="body1" fontWeight={400} fontSize={15} noWrap>
                    {ad.title}
                </Typography>
                <Typography variant="body2" fontWeight={600} fontSize={14}>
                    {formatPrice(ad.price)}
                </Typography>
                {ad.needsRevision && (
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            bgcolor: '#f9f1e6',
                            borderRadius: 1.5,
                            px: 1,
                            py: 0.25,
                            width: 'fit-content',
                        }}
                    >
                        <FiberManualRecordIcon sx={{ fontSize: 8, color: '#faad14' }} />
                        <Typography variant="body2" fontSize={12} color="#faad14" noWrap>
                            Требует доработок
                        </Typography>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
};

export const ListingsCatalogSection = (): JSX.Element => {
    const {
        selectedCategories,
        onlyNeedsRevision,
        currentPage,
        viewMode,
        toggleCategory,
        setOnlyNeedsRevision,
        setCurrentPage,
        resetFilters,
        getPaginatedAds,
        getTotalPages,
        getTotalCount,
    } = useAdsStore();

    const paginatedAds = getPaginatedAds();
    const totalPages = getTotalPages();
    const totalCount = getTotalCount();

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Stack direction="row" spacing={3} alignItems="flex-start" width="100%">
            {/* Sidebar filters */}
            <Stack spacing={1.25} sx={{ flexShrink: 0 }}>
                <Paper
                    elevation={0}
                    sx={{ width: 220, p: 2, borderRadius: 2, border: '1px solid #f0f0f0' }}
                >
                    <Stack spacing={1.25}>
                        <Typography variant="h6" fontWeight={500} fontSize={16}>
                            Фильтры
                        </Typography>

                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Категория
                            </Typography>
                            <Stack spacing={0.5}>
                                {categories.map((cat) => (
                                    <FormControlLabel
                                        key={cat}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                                sx={{ p: 0.25 }}
                                            />
                                        }
                                        label={<Typography variant="body2">{cat}</Typography>}
                                        sx={{ ml: 0, gap: 1 }}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <Divider sx={{ borderColor: '#f0f0f0' }} />

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ flex: 1, pr: 1, fontSize: 13 }}
                            >
                                Только требующие доработок
                            </Typography>
                            <Switch
                                size="small"
                                checked={onlyNeedsRevision}
                                onChange={(e) => setOnlyNeedsRevision(e.target.checked)}
                            />
                        </Stack>
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        width: 220,
                        borderRadius: 2,
                        border: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1.25,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                    onClick={resetFilters}
                >
                    <Typography variant="body2" sx={{ color: '#848388', fontSize: 14 }}>
                        Сбросить фильтры
                    </Typography>
                </Paper>
            </Stack>

            {/* Listings grid/list + pagination */}
            <Stack spacing={1.25} flex={1}>
                {/* Cards container */}
                {totalCount === 0 ? (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">Объявления не найдены</Typography>
                    </Paper>
                ) : viewMode === 'grid' ? (
                    // Сетка: карточки в ряд
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                        {paginatedAds.map((ad) => (
                            <GridCard key={ad.id} ad={ad} />
                        ))}
                    </Box>
                ) : (
                    // Список: карточки вертикально, каждая на всю ширину
                    <Stack spacing={1.5}>
                        {paginatedAds.map((ad) => (
                            <ListCard key={ad.id} ad={ad} />
                        ))}
                    </Stack>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Stack>
        </Stack>
    );
};

export default ListingsCatalogSection;