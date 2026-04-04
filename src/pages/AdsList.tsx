// src/pages/AdsList.tsx
import { Box, Stack } from '@mui/material';
import { ListingControlsSection } from '../components/listings/ListingControlsSection.tsx';
import { ListingsCatalogSection } from '../components/listings/ListingsCatalogSection.tsx';
import { ListingsHeaderSection } from '../components/listings/ListingsHeaderSection.tsx';

const AdsList = () => {
    return (
        <Box
            component="main"
            sx={{ backgroundColor: '#f7f5f8', width: '96%', minHeight: '100vh' }}
            px={4}
            py={1.5}
        >
            <Stack spacing={2}>
                <ListingsHeaderSection totalCount={1001/*filteredAds.length TODO*/} />
                <ListingControlsSection />
                <ListingsCatalogSection />
            </Stack>
        </Box>
    );
};

export default AdsList;
