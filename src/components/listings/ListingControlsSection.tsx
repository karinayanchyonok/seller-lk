import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import {
    Autocomplete,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import React, { useState, type JSX } from 'react';

const sortOptions = [
    { value: 'title_asc', label: 'По названию (А-Я)' },
    { value: 'title_desc', label: 'По названию (Я-А)' },
    { value: 'newest', label: 'По новизне (сначала новые)' },
    { value: 'oldest', label: 'По новизне (сначала старые)' },
    { value: 'price_asc', label: 'По цене (сначала дешевле)' },
    { value: 'price_desc', label: 'По цене (сначала дороже)' },
];

export const ListingControlsSection = (): JSX.Element => {
    const [viewMode, setViewMode] = useState<string>('grid');
    const [sortValue, setSortValue] = useState<string>('newest');

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        if (newValue !== null) {
            setViewMode(newValue);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                p: 1.5,
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#fff',
            }}
        >
            {/* Search field */}
            <Autocomplete
                freeSolo
                options={[]}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Найти объявление...."
                        variant="outlined"
                        size="small"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: <SearchIcon sx={{ color: '#707176', fontSize: 18 }} />,
                            sx: {
                                backgroundColor: '#f6f6f8',
                                borderRadius: 2,
                                '& fieldset': { border: 'none' },
                                fontSize: 14,
                                color: '#707176',
                            },
                        }}
                    />
                )}
            />

            <Stack direction="row" alignItems="center" spacing={2}>
                {/* View mode toggle */}
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    size="small"
                    sx={{
                        backgroundColor: '#f4f4f6',
                        borderRadius: 2,
                        height: 32,
                        '& .MuiToggleButton-root': {
                            border: 'none',
                            borderRadius: 2,
                            px: 1,
                            color: '#707176',
                            '&.Mui-selected': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.04)',
                            },
                        },
                        '& .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                            borderRight: '1px solid #d0d0d6',
                            borderRadius: 0,
                        },
                        '& .MuiToggleButtonGroup-grouped:first-of-type': {
                            borderRadius: '8px 0 0 8px',
                        },
                        '& .MuiToggleButtonGroup-grouped:last-of-type': {
                            borderRadius: '0 8px 8px 0',
                        },
                    }}
                >
                    <ToggleButton value="grid" aria-label="grid view">
                        <GridViewIcon sx={{ fontSize: 18 }} />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                        <ListIcon sx={{ fontSize: 18 }} />
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* Sort dropdown */}
                <Select
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    size="small"
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        border: '2px solid #f4f4f6',
                        boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
                        fontSize: 14,
                        color: 'text.primary',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '& .MuiSelect-select': { py: '5px', px: 2 },
                    }}
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
        </Paper>
    );
};
