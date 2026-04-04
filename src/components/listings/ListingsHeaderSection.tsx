import { Box, Typography } from '@mui/material';
import type { JSX } from 'react';

interface ListingsHeaderSectionProps {
    totalCount: number;
}

export const ListingsHeaderSection = ({ totalCount }: ListingsHeaderSectionProps): JSX.Element => {
    // Функция для правильного склонения слова "объявление"
    const getDeclension = (count: number) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'объявлений';
        }
        if (lastDigit === 1) {
            return 'объявление';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'объявления';
        }
        return 'объявлений';
    };

    return (
        <Box sx={{ px: 1, py: 0, borderRadius: 4, overflow: 'hidden', width: '100%' }}>
            <Box sx={{ py: 1.5 }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary" noWrap>
                    Мои объявления
                </Typography>
                <Typography variant="body1" sx={{ color: '#848388' }}>
                    {totalCount} {getDeclension(totalCount)}
                </Typography>
            </Box>
        </Box>
    );
};

export default ListingsHeaderSection;