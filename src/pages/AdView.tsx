import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export const AdView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Просмотр объявления #{id}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/ads/${id}/edit`)}
                    sx={{ mr: 2 }}
                >
                    Редактировать
                </Button>
                <Button variant="outlined" onClick={() => navigate('/ads')}>
                    Назад к списку
                </Button>
            </Box>
        </Container>
    );
};
