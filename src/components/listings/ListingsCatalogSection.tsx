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
    IconButton,
    Card,
    CardContent,
    CardMedia,
    Pagination,
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAdsStore } from '../../store/useAdsStore';
import { useNavigate } from 'react-router-dom';

const categories = ['Авто', 'Электроника', 'Недвижимость'];



// Компонент карточки в виде списка (горизонтальной)
const ListCard = ({ ad }: { ad: any }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ads/${ad.id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

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

    return (
        <Card
            sx={{ display: 'flex', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
            onClick={handleClick}
        >
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
                    <Typography variant="h6" component="h3" gutterBottom>
                        {ad.title}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatPrice(ad.price)}
                    </Typography>
                </Box>
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

// Компонент карточки в виде сетки
const GridCard = ({ ad }: { ad: any }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ads/${ad.id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    return (
        <Paper
            elevation={0}
            onClick={handleClick}
            sx={{
                width: 185,
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
                    label={ad.category}
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
        itemsPerPage,
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
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {paginatedAds.map((ad) =>
                            viewMode === 'grid' ? (
                                <GridCard key={ad.id} ad={ad} />
                            ) : (
                                <Box key={ad.id} sx={{ width: '100%' }}>
                                    <ListCard ad={ad} />
                                </Box>
                            )
                        )}
                    </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
