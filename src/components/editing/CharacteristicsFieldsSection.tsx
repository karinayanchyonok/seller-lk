import CancelOutlined from '@mui/icons-material/CancelOutlined';
import EmojiObjectsOutlined from '@mui/icons-material/EmojiObjectsOutlined';
import {
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, type JSX } from 'react';
import { getMarketPriceFromAI } from '../../api/openrouter';

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
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestedPrice, setSuggestedPrice] = useState<string | null>(null);

    const handleClear = () => {
        setPrice('');
    };

    // Функция для парсинга цены из ответа AI
    const parsePriceFromResponse = (text: string): string | null => {
        // Ищем строку "Рекомендуем цену: X рублей"
        const recommendMatch = text.match(/Рекомендуем\s*цену:\s*(\d{1,3}(?:[\s]?\d{3})*)/i);
        if (recommendMatch) {
            return recommendMatch[1].replace(/\s/g, '');
        }
        
        // Ищем "ИТОГОВАЯ ЦЕНА: X"
        const finalMatch = text.match(/ИТОГОВАЯ\s*ЦЕНА:\s*(\d{1,3}(?:[\s]?\d{3})*)/i);
        if (finalMatch) {
            return finalMatch[1].replace(/\s/g, '');
        }
        
        // Ищем любую цену в конце текста (последнее число)
        const allNumbers = text.match(/(\d{1,3}(?:[\s]?\d{3})*)/g);
        if (allNumbers && allNumbers.length > 0) {
            // Берем последнее число
            const lastNumber = allNumbers[allNumbers.length - 1];
            return lastNumber.replace(/\s/g, '');
        }
        
        return null;
    };

    const handleMarketPrice = async () => {
        setLoading(true);
        setTooltipOpen(true);
        setAiResponse('Запрос к AI...');
        setSuggestedPrice(null);

        try {
            const result = await getMarketPriceFromAI('', category, Number(price));
            console.log('Ответ от AI:', result);
            
            setAiResponse(result);
            
            // Парсим цену из ответа
            const parsedPrice = parsePriceFromResponse(result);
            if (parsedPrice) {
                console.log('Распарсенная цена:', parsedPrice);
                setSuggestedPrice(parsedPrice);
            } else {
                console.log('Не удалось распарсить цену');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setAiResponse('Ошибка получения данных. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPrice = () => {
        if (suggestedPrice) {
            console.log('Применяем цену:', suggestedPrice);
            setPrice(suggestedPrice);
        }
        setTooltipOpen(false);
    };

    return (
        <>
            <Stack spacing={1} width="100%">
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

                <Stack direction="row" alignItems="center" spacing={3}>
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

            <Dialog
                open={tooltipOpen}
                onClose={() => setTooltipOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        bgcolor: '#f9f1e6',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="#ed6c02">
                        AI-помощник
                    </Typography>
                    <IconButton onClick={() => setTooltipOpen(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    {loading ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography>Загрузка рекомендации...</Typography>
                        </Box>
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                                color: 'text.primary',
                            }}
                        >
                            {aiResponse}
                        </Typography>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        onClick={() => setTooltipOpen(false)}
                        sx={{
                            color: '#848388',
                            '&:hover': { bgcolor: '#f5e8d4' },
                        }}
                    >
                        Закрыть
                    </Button>
                    <Button
                        onClick={handleApplyPrice}
                        variant="contained"
                        disabled={loading || !suggestedPrice}
                        sx={{
                            bgcolor: '#ed6c02',
                            '&:hover': { bgcolor: '#ff9800' },
                        }}
                    >
                        Применить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CharacteristicsFieldsSection;