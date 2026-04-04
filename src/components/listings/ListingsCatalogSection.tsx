import React, { useState, type JSX } from 'react';
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
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const categories = ['Авто', 'Электроника', 'Недвижимость'];

const listings = [
    { id: 1, title: 'Наушники', price: '2990 ₽', category: 'Электроника', needsWork: false },
    { id: 2, title: 'Volkswagen Polo', price: '1100000 ₽', category: 'Авто', needsWork: true },
    {
        id: 3,
        title: 'Студия, 25м²',
        price: '15000000 ₽',
        category: 'Недвижимость',
        needsWork: false,
    },
    { id: 4, title: '1-кк, 44м²', price: '19000000 ₽', category: 'Недвижимость', needsWork: true },
    { id: 5, title: 'MacBook Pro 16"', price: '64000 ₽', category: 'Электроника', needsWork: true },
    { id: 6, title: 'Omoda C5', price: '2900000 ₽', category: 'Авто', needsWork: false },
    {
        id: 7,
        title: 'iPad Air 11, 2024 г.',
        price: '37000 ₽',
        category: 'Электроника',
        needsWork: false,
    },
    { id: 8, title: 'MAJOR VI', price: '20000 ₽', category: 'Электроника', needsWork: false },
    { id: 9, title: 'Toyota Camry', price: '3900000 ₽', category: 'Авто', needsWork: true },
    {
        id: 10,
        title: 'iPhone 17 Pro Max',
        price: '107000 ₽',
        category: 'Электроника',
        needsWork: false,
    },
];

const pages = [1, 2, 3, 4, 5];

export const ListingsCatalogSection = (): JSX.Element => {
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [onlyNeedsWork, setOnlyNeedsWork] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleCategoryChange = (category: string) => {
        setCheckedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    return (
        <Stack direction="row" spacing={3} alignItems="flex-start" width="100%">
            {/* Sidebar filters */}
            <Stack spacing={1.25} sx={{ flexShrink: 0 }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: 220,
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #f0f0f0',
                    }}
                >
                    <Stack spacing={1.25}>
                        {/* Title */}
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            fontSize={16}
                            color="rgba(0,0,0,0.85)"
                        >
                            Фильтры
                        </Typography>
                        {/* Category section */}
                        <Box>
                            {/* Category header */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 1 }}
                            >
                                <Typography variant="body2" color="rgba(0,0,0,0.85)">
                                    Категория
                                </Typography>
                                <KeyboardArrowUpIcon
                                    sx={{ width: 16, height: 16, color: 'rgba(0,0,0,0.45)' }}
                                />
                            </Stack>
                            {/* Category checkboxes */}
                            <Stack spacing={0.5} sx={{ pl: 0 }}>
                                {categories.map((cat) => (
                                    <FormControlLabel
                                        key={cat}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={checkedCategories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                                sx={{
                                                    p: 0.25,
                                                    color: 'rgba(0,0,0,0.25)',
                                                    '&.Mui-checked': { color: 'primary.main' },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" color="rgba(0,0,0,0.85)">
                                                {cat}
                                            </Typography>
                                        }
                                        sx={{ ml: 0, gap: 1 }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                        <Divider sx={{ borderColor: '#f0f0f0' }} />
                        {/* Toggle: only needs work */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                color="rgba(0,0,0,0.85)"
                                sx={{ flex: 1, pr: 1, fontSize: 13 }}
                            >
                                Только требующие доработок
                            </Typography>
                            <Switch
                                size="small"
                                checked={onlyNeedsWork}
                                onChange={(e) => setOnlyNeedsWork(e.target.checked)}
                            />
                        </Stack>
                    </Stack>
                </Paper>
                {/* Reset filters button */}
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
                    }}
                    onClick={() => {
                        setCheckedCategories([]);
                        setOnlyNeedsWork(false);
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#848388',
                            fontFamily: "'Inter', Helvetica, sans-serif",
                            fontSize: 14,
                        }}
                    >
                        Сбросить фильтры
                    </Typography>
                </Paper>
            </Stack>
            {/* Listings grid + pagination */}
            <Stack spacing={1.25} flex={1}>
                {/* Cards grid */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}
                >
                    {listings.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={0}
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
                            {/* Image placeholder */}
                            <Box
                                sx={{
                                    height: 150,
                                    bgcolor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    flexShrink: 0,
                                }}
                            >
                                <ImageOutlinedIcon sx={{ fontSize: 48, color: '#bdbdbd' }} />
                                {/* Category badge overlaid on image bottom */}
                                <Chip
                                    label={item.category}
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
                                        color: 'rgba(0,0,0,0.85)',
                                        '& .MuiChip-label': { px: 1 },
                                    }}
                                />
                            </Box>
                            {/* Card content */}
                            <Stack spacing={0.5} sx={{ pt: '14px', pb: 2, px: 2, flex: 1 }}>
                                <Typography
                                    variant="body1"
                                    fontWeight={400}
                                    fontSize={15}
                                    color="rgba(0,0,0,0.85)"
                                    noWrap
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    color="rgba(0,0,0,0.45)"
                                    fontSize={14}
                                >
                                    {item.price}
                                </Typography>
                                {/* Needs work badge */}
                                {item.needsWork && (
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
                                        <FiberManualRecordIcon
                                            sx={{ fontSize: 8, color: '#faad14' }}
                                        />
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            color="#faad14"
                                            noWrap
                                        >
                                            Требует доработок
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    ))}
                </Box>
                {/* Pagination */}
                <Stack direction="row" spacing={0.75} alignItems="center">
                    {/* Prev button */}
                    <IconButton
                        size="small"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        sx={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 1.5,
                            bgcolor: '#fff',
                            width: 32,
                            height: 32,
                            p: 0,
                        }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    {/* Page numbers */}
                    {pages.map((page) => (
                        <Button
                            key={page}
                            variant="outlined"
                            size="small"
                            onClick={() => setCurrentPage(page)}
                            sx={{
                                minWidth: 32,
                                width: 32,
                                height: 32,
                                p: 0,
                                borderRadius: 1.5,
                                fontSize: 14,
                                fontWeight: currentPage === page ? 500 : 400,
                                color: currentPage === page ? 'primary.main' : 'rgba(0,0,0,0.85)',
                                borderColor: currentPage === page ? 'primary.main' : '#d9d9d9',
                                bgcolor: '#fff',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: '#fff',
                                },
                            }}
                        >
                            {page}
                        </Button>
                    ))}

                    {/* Next button */}
                    <IconButton
                        size="small"
                        onClick={() => setCurrentPage((p) => Math.min(pages.length, p + 1))}
                        sx={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 1.5,
                            bgcolor: '#fff',
                            width: 32,
                            height: 32,
                            p: 0,
                        }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ListingsCatalogSection;
