import { Box, Stack } from '@mui/material';
import { ListingControlsSection } from '../components/listings/ListingControlsSection';
import { ListingsCatalogSection } from '../components/listings/ListingsCatalogSection';
import { ListingsHeaderSection } from '../components/listings/ListingsHeaderSection';
import { useEffect } from 'react';
import { useAdsStore } from '../store/useAdsStore';

const AdsList = () => {
    // Инициализация фильтрации при монтировании
    const updateFilteredAds = useAdsStore((state) => state.updateFilteredAds);

    useEffect(() => {
        updateFilteredAds();
    }, [updateFilteredAds]);

    return (
        <Box
            component="main"
            sx={{ backgroundColor: '#f7f5f8', width: '100%', minHeight: '100vh' }}
            px={4}
            py={1.5}
        >
            <Stack spacing={2}>
                <ListingsHeaderSection />
                <ListingControlsSection />
                <ListingsCatalogSection />
            </Stack>
        </Box>
    );
};

export default AdsList;
