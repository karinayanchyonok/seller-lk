import CancelOutlined from '@mui/icons-material/CancelOutlined';
import EmojiObjectsOutlined from '@mui/icons-material/EmojiObjectsOutlined';
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import type { JSX } from 'react';

interface CharacteristicsFieldsSectionProps {
    price: string;
    setPrice: (value: string) => void;
    category: string;
    params: any;
    setParams: (value: any) => void;
}

export const CharacteristicsFieldsSection = ({
    price,
    setPrice,
    category,
    params,
    setParams,
}: CharacteristicsFieldsSectionProps): JSX.Element => {
    const handleClear = () => {
        setPrice('');
    };

    const handleMarketPrice = () => {
        // TODO: Интеграция с LLM для получения рыночной цены
        alert('Функция получения рыночной цены будет доступна позже');
    };

    return (
        <Stack spacing={1} width="100%">
            {/* Label row with required asterisk */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                    component="span"
                    sx={{
                        color: 'error.main',
                        fontSize: '14px',
                        lineHeight: '22px',
                        mt: '-1px',
                    }}
                >
                    *
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                        color: 'rgba(0,0,0,0.85)',
                        fontSize: '14px',
                        lineHeight: '22px',
                    }}
                >
                    Цена
                </Typography>
            </Stack>

            {/* Input row */}
            <Stack direction="row" alignItems="center" spacing={3}>
                {/* Price input field */}
                <TextField
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    size="small"
                    sx={{
                        width: 456,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                        },
                    }}
                    InputProps={{
                        endAdornment: price ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClear} edge="end">
                                    <CancelOutlined
                                        sx={{ fontSize: 14, color: 'rgba(0,0,0,0.25)' }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                />

                {/* Market price button */}
                <Button
                    variant="text"
                    onClick={handleMarketPrice}
                    startIcon={<EmojiObjectsOutlined sx={{ color: '#ffa940', fontSize: 14 }} />}
                    sx={{
                        backgroundColor: '#f9f1e6',
                        color: '#ffa940',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '14px',
                        lineHeight: '22px',
                        px: 1,
                        py: 0,
                        height: 32,
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: '#f5e8d5',
                        },
                    }}
                >
                    Узнать рыночную цену
                </Button>
            </Stack>
        </Stack>
    );
};

export default CharacteristicsFieldsSection;
