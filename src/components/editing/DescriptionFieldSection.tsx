import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Box,
    FormControl,
    FormLabel,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Stack,
    Typography,
    type SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState, type JSX, useCallback, useRef } from 'react';

interface DescriptionFieldSectionProps {
    params: any;
    setParams: (value: any) => void;
    category: string;
}

// Определяем поля для каждой категории
const getFieldsByCategory = (category: string) => {
    switch (category) {
        case 'electronics':
            return [
                {
                    id: 'type',
                    label: 'Тип',
                    type: 'select',
                    options: ['phone', 'laptop', 'misc'],
                    labels: { phone: 'Телефон', laptop: 'Ноутбук', misc: 'Другое' },
                },
                { id: 'brand', label: 'Бренд', type: 'clearable', placeholder: 'Введите бренд' },
                { id: 'model', label: 'Модель', type: 'clearable', placeholder: 'Введите модель' },
                { id: 'color', label: 'Цвет', type: 'clearable', placeholder: 'Введите цвет' },
                {
                    id: 'condition',
                    label: 'Состояние',
                    type: 'select',
                    options: ['new', 'used'],
                    labels: { new: 'Новое', used: 'Б/у' },
                },
            ];
        case 'auto':
            return [
                { id: 'brand', label: 'Бренд', type: 'clearable', placeholder: 'Введите бренд' },
                { id: 'model', label: 'Модель', type: 'clearable', placeholder: 'Введите модель' },
                {
                    id: 'yearOfManufacture',
                    label: 'Год выпуска',
                    type: 'clearable',
                    placeholder: 'Введите год',
                },
                {
                    id: 'transmission',
                    label: 'Коробка передач',
                    type: 'select',
                    options: ['automatic', 'manual'],
                    labels: { automatic: 'Автомат', manual: 'Механика' },
                },
                {
                    id: 'mileage',
                    label: 'Пробег (км)',
                    type: 'clearable',
                    placeholder: 'Введите пробег',
                },
                {
                    id: 'enginePower',
                    label: 'Мощность (л.с.)',
                    type: 'clearable',
                    placeholder: 'Введите мощность',
                },
            ];
        case 'real_estate':
            return [
                {
                    id: 'type',
                    label: 'Тип',
                    type: 'select',
                    options: ['flat', 'house', 'room'],
                    labels: { flat: 'Квартира', house: 'Дом', room: 'Комната' },
                },
                { id: 'address', label: 'Адрес', type: 'clearable', placeholder: 'Введите адрес' },
                {
                    id: 'area',
                    label: 'Площадь (м²)',
                    type: 'clearable',
                    placeholder: 'Введите площадь',
                },
                { id: 'floor', label: 'Этаж', type: 'clearable', placeholder: 'Введите этаж' },
            ];
        default:
            return [];
    }
};

export const DescriptionFieldSection = ({
    params,
    setParams,
    category,
}: DescriptionFieldSectionProps): JSX.Element => {
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const isInitialized = useRef(false);

    const fields = getFieldsByCategory(category);

    // Инициализация значений из params - только один раз при монтировании или смене category
    useEffect(() => {
        if (!isInitialized.current && fields.length > 0) {
            const initialValues: Record<string, string> = {};
            fields.forEach((field) => {
                initialValues[field.id] = params?.[field.id] || '';
            });
            setFieldValues(initialValues);
            isInitialized.current = true;
        }
    }, [category, fields, params]);

    const handleClear = useCallback((id: string) => {
        setFieldValues((prev) => ({ ...prev, [id]: '' }));
        setParams((prev: any) => ({ ...prev, [id]: '' }));
    }, [setParams]);

    const handleSelectChange = useCallback((id: string, event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setFieldValues((prev) => ({ ...prev, [id]: value }));
        setParams((prev: any) => ({ ...prev, [id]: value }));
    }, [setParams]);

    const handleInputChange = useCallback((id: string, value: string) => {
        setFieldValues((prev) => ({ ...prev, [id]: value }));
        setParams((prev: any) => ({ ...prev, [id]: value }));
    }, [setParams]);

    // Если нет полей для категории
    if (fields.length === 0) {
        return (
            <Stack spacing={1} width="100%">
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    Характеристики
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Нет дополнительных характеристик для выбранной категории
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={1} width="100%">
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                Характеристики
            </Typography>

            <Stack spacing={2} sx={{ maxWidth: 456, width: '100%' }}>
                {fields.map((field) => {
                    const currentValue = fieldValues[field.id] || '';
                    const isEmpty = !currentValue;
                    const borderColor = isEmpty ? '#ffa940' : '#d9d9d9';

                    return (
                        <Box key={field.id}>
                            <FormControl fullWidth size="small">
                                <FormLabel
                                    sx={{
                                        mb: 0.5,
                                        fontSize: 14,
                                        color: 'rgba(0,0,0,0.85)',
                                        fontWeight: 400,
                                    }}
                                >
                                    {field.label}
                                </FormLabel>

                                {field.type === 'select' ? (
                                    <Select
                                        value={currentValue}
                                        onChange={(e) => handleSelectChange(field.id, e)}
                                        displayEmpty
                                        IconComponent={KeyboardArrowDownIcon}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return (
                                                    <Typography variant="body2" color="text.disabled">
                                                        Выберите {field.label.toLowerCase()}
                                                    </Typography>
                                                );
                                            }
                                            return (
                                                <Typography variant="body2" color="text.primary">
                                                    {field.labels?.[selected as keyof typeof field.labels] || selected}
                                                </Typography>
                                            );
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: borderColor,
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: borderColor,
                                            },
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Выберите значение</em>
                                        </MenuItem>
                                        {field.options?.map((opt) => (
                                            <MenuItem key={opt} value={opt}>
                                                {field.labels?.[opt as keyof typeof field.labels] || opt}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: `1px solid ${borderColor}`,
                                            borderRadius: '8px',
                                            backgroundColor: '#fff',
                                            px: 1.5,
                                            transition: 'border-color 0.2s',
                                            '&:hover': {
                                                borderColor: '#40a9ff',
                                            },
                                            '&:focus-within': {
                                                borderColor: '#1890ff',
                                            },
                                        }}
                                    >
                                        <InputBase
                                            fullWidth
                                            value={currentValue}
                                            placeholder={field.placeholder}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            sx={{
                                                fontSize: 14,
                                                py: 0.75,
                                                '& input': {
                                                    padding: 0,
                                                },
                                            }}
                                        />
                                        {currentValue && (
                                            <IconButton
                                                size="small"
                                                onClick={() => handleClear(field.id)}
                                                sx={{ p: 0.5, ml: 0.5 }}
                                            >
                                                <CancelIcon sx={{ fontSize: 16, color: 'rgba(0,0,0,0.45)' }} />
                                            </IconButton>
                                        )}
                                    </Box>
                                )}
                            </FormControl>
                        </Box>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default DescriptionFieldSection;