import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, type JSX } from 'react';
import { improveDescriptionFromAI } from '../../api/openrouter';

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
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImproveDescription = async () => {
        setLoading(true);
        setTooltipOpen(true);
        setAiResponse('Запрос к AI...');

        try {
            const response = await improveDescriptionFromAI(
                title,
                category,
                description,
                Number(price)
            );
            setAiResponse(response);
        } catch (error) {
            setAiResponse('Ошибка получения описания. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyDescription = () => {
        setDescription(aiResponse);
        setTooltipOpen(false);
    };

    return (
        <>
            <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    Описание
                </Typography>

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
                            <Typography variant="body2" color="text.disabled" component="span">
                                {description.length} / {DESCRIPTION_MAX_LENGTH}
                            </Typography>
                        </Box>
                    }
                    FormHelperTextProps={{
                        component: 'div',
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

            {/* Диалоговое окно с результатом AI */}
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
                        onClick={handleApplyDescription}
                        variant="contained"
                        disabled={loading}
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

export default FormActionsSection;
