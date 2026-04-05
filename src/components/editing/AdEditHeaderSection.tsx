import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

interface AdEditHeaderSectionProps {
    category: string;
    setCategory: (value: string) => void;
}

export const AdEditHeaderSection = ({
    category,
    setCategory,
}: AdEditHeaderSectionProps): JSX.Element => {
    const categories = [
        { value: 'electronics', label: 'Электроника' },
        { value: 'auto', label: 'Авто' },
        { value: 'real_estate', label: 'Недвижимость' },
    ];

    return (
        <Stack spacing={1} width="100%">
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                Категория
            </Typography>

            <FormControl sx={{ width: 256 }} size="small">
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                    }}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                            {cat.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};
