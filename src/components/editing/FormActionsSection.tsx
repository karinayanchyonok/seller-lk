import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import type { JSX } from 'react';

const DESCRIPTION_MAX_LENGTH = 1000;

interface FormActionsSectionProps {
    description: string;
    setDescription: (value: string) => void;
    category: string;
    title: string;
    price: string;
}

export const FormActionsSection = ({
    description,
    setDescription,
    category,
    title,
    price,
}: FormActionsSectionProps): JSX.Element => {
    const handleImproveDescription = () => {
        // TODO: Интеграция с LLM для улучшения описания
        alert('Функция улучшения описания будет доступна позже');
    };

    return (
        <Box display="flex" flexDirection="column" gap={1} width="100%">
            {/* Section label */}
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                Описание
            </Typography>

            {/* Multiline textarea with character counter */}
            <TextField
                multiline
                minRows={3}
                fullWidth
                value={description}
                onChange={(e) => {
                    if (e.target.value.length <= DESCRIPTION_MAX_LENGTH) {
                        setDescription(e.target.value);
                    }
                }}
                inputProps={{ maxLength: DESCRIPTION_MAX_LENGTH }}
                helperText={
                    <Box 
                        component="span" 
                        display="flex" 
                        justifyContent="flex-end"
                        sx={{ width: '100%' }}
                    >
                        <Typography 
                            variant="body2" 
                            color="text.disabled"
                            component="span"  // Важно: рендерится как span, а не p
                        >
                            {description.length} / {DESCRIPTION_MAX_LENGTH}
                        </Typography>
                    </Box>
                }
                FormHelperTextProps={{
                    component: 'div', // HelperText будет как div, а не p
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#fff',
                    },
                    '& .MuiFormHelperText-root': {
                        marginX: 0,
                        marginTop: 0.5,
                    },
                }}
            />

            {/* "Improve description" button */}
            <Button
                variant="text"
                onClick={handleImproveDescription}
                startIcon={<AutoFixHighOutlinedIcon sx={{ color: '#ffa940', fontSize: 14 }} />}
                sx={{
                    backgroundColor: '#f9f1e6',
                    color: '#ffa940',
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 1.5,
                    py: 0.5,
                    alignSelf: 'flex-start',
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    '&:hover': {
                        backgroundColor: '#f5e8d4',
                    },
                }}
            >
                Улучшить описание
            </Button>
        </Box>
    );
};

export default FormActionsSection;