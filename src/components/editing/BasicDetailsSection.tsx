import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import type { JSX } from 'react';

interface BasicDetailsSectionProps {
    title: string;
    setTitle: (value: string) => void;
}

export const BasicDetailsSection = ({ title, setTitle }: BasicDetailsSectionProps): JSX.Element => {
    return (
        <Stack spacing={1} width="100%">
            {/* Required label row */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                    component="span"
                    sx={{ color: 'error.main', fontSize: '14px', lineHeight: '22px' }}
                >
                    *
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                        color: 'rgba(0,0,0,0.85)',
                        fontSize: '14px',
                        lineHeight: '22px',
                    }}
                >
                    Название
                </Typography>
            </Stack>

            {/* Text input with clear button */}
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '456px', maxWidth: '100%' }}
                InputProps={{
                    endAdornment: title ? (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={() => setTitle('')}
                                edge="end"
                                aria-label="clear input"
                            >
                                <ClearIcon sx={{ fontSize: '12px', color: 'text.secondary' }} />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
            />
        </Stack>
    );
};

export default BasicDetailsSection;
