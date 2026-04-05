import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { JSX } from 'react';

interface AITooltipProps {
    open: boolean;
    onClose: () => void;
    onApply: () => void;
    title: string;
    content: string;
    loading?: boolean;
}

export const AITooltip = ({
    open,
    onClose,
    onApply,
    title,
    content,
    loading = false,
}: AITooltipProps): JSX.Element => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    bgcolor: '#f9f1e6',
                },
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pb: 1,
            }}>
                <Typography variant="h6" fontWeight="bold" color="#ed6c02">
                    🤖 AI-помощник
                </Typography>
                <IconButton onClick={onClose} size="small">
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
                        {title && (
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                {title}
                            </Typography>
                        )}
                        {content}
                    </Typography>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button 
                    onClick={onClose}
                    sx={{
                        color: '#848388',
                        '&:hover': { bgcolor: '#f5e8d4' },
                    }}
                >
                    Закрыть
                </Button>
                <Button
                    onClick={onApply}
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
    );
};