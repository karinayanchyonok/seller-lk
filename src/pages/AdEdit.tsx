import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { AdEditHeaderSection } from '../components/editing/AdEditHeaderSection';
import { BasicDetailsSection } from '../components/editing/BasicDetailsSection';
import { CharacteristicsFieldsSection } from '../components/editing/CharacteristicsFieldsSection';
import { DescriptionFieldSection } from '../components/editing/DescriptionFieldSection';
import { FormActionsSection } from '../components/editing/FormActionsSection';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdsStore } from '../store/useAdsStore';
import { useEffect, useState } from 'react';

const AdEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchAdById, updateAd } = useAdsStore();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Состояние формы
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [params, setParams] = useState({});

    useEffect(() => {
        const loadAd = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const ad = await fetchAdById(Number(id));
                console.log('Получено объявление:', ad);

                if (ad) {
                    setCategory(ad.category);
                    setTitle(ad.title);
                    setPrice(String(ad.price));
                    setDescription(ad.description || '');
                    setParams(ad.params || {});
                } else {
                    setError('Объявление не найдено');
                }
            } catch (err) {
                console.error('Ошибка:', err);
                setError('Ошибка загрузки объявления');
            } finally {
                setLoading(false);
            }
        };

        loadAd();
    }, [id, fetchAdById]);

    const handleSave = async () => {
        if (!id || saving) return;

        setSaving(true);

        const updateData = {
            category: category as 'auto' | 'electronics' | 'real_estate',
            title,
            price: Number(price),
            description,
            params,
        };

        console.log('Сохранение:', updateData);

        try {
            // Сохраняем
            await updateAd(Number(id), updateData);
            console.log('Сохранено успешно');

            // Просто переходим назад
            navigate(`/ads/${id}`);
        } catch (err) {
            console.error('Ошибка:', err);
            alert('Ошибка сохранения');
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(`/ads/${id}`);
    };

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Загрузка...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
                <Button variant="contained" onClick={() => window.location.reload()}>
                    Повторить
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 4,
                maxWidth: 1103,
                width: '100%',
                mx: 'auto',
                mt: 2,
            }}
            px={4}
            pt={4}
            pb={6}
        >
            <Stack spacing={2.25}>
                <Typography variant="h5" fontWeight="medium" noWrap>
                    Редактирование объявления
                </Typography>

                <AdEditHeaderSection category={category} setCategory={setCategory} />
                <Divider />

                <BasicDetailsSection title={title} setTitle={setTitle} />
                <Divider />

                <CharacteristicsFieldsSection
                    price={price}
                    setPrice={setPrice}
                    category={category}
                    params={params}
                    setParams={setParams}
                />
                <Divider />

                <DescriptionFieldSection
                    params={params}
                    setParams={setParams}
                    category={category}
                />
                <Divider />

                <FormActionsSection
                    description={description}
                    setDescription={setDescription}
                    category={category}
                    title={title}
                    price={price}
                />

                <Stack direction="row" spacing={1} pt={1}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={saving}
                        sx={{
                            bgcolor: '#1890ff',
                            borderRadius: 2,
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#40a9ff' },
                        }}
                    >
                        {saving ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        sx={{
                            bgcolor: '#d9d9d9',
                            color: 'text.secondary',
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#bfbfbf', boxShadow: 'none' },
                        }}
                    >
                        Отменить
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default AdEdit;
