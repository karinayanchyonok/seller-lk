import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export const AdEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Редактирование объявления #{id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Здесь будет форма редактирования
                </Typography>
                <Button variant="contained" onClick={() => navigate(`/ads/${id}`)} sx={{ mr: 2 }}>
                    Сохранить
                </Button>
                <Button variant="outlined" onClick={() => navigate(`/ads/${id}`)}>
                    Отмена
                </Button>
            </Box>
        </Container>
    );
};
