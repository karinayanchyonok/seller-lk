import { Container, Typography, Box } from '@mui/material';

export const AdsList = () => {
  return (
    <Container maxWidth="lg"  color="black">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Мои объявления
        </Typography>
        <Typography variant="body1">
          Здесь будет список объявлений
        </Typography>
      </Box>
    </Container>
  );
};