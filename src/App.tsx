import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdsList from './pages/AdsList';
import { AdView } from './pages/AdView';
import AdEdit from './pages/AdEdit';
import { useEffect } from 'react';
import { useAdsStore } from './store/useAdsStore';
import { Box, CircularProgress } from '@mui/material';

function App() {
    const { fetchAds, loading, error } = useAdsStore();

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <h2>Ошибка: {error}</h2>
            </Box>
        );
    }
    return (
        <BrowserRouter>
            <Routes>
                {/* Редирект с корня на /ads */}
                <Route path="/" element={<Navigate to="/ads" replace />} />

                {/* Список объявлений */}
                <Route path="/ads" element={<AdsList />} />

                {/* Просмотр объявления */}
                <Route path="/ads/:id" element={<AdView />} />

                {/* Редактирование объявления */}
                <Route path="/ads/:id/edit" element={<AdEdit />} />

                {/* 404 - страница не найдена */}
                <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
