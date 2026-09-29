import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Box my={3}>
      <Alert severity="error" action={onRetry && (
        <Button color="inherit" size="small" onClick={onRetry}>
          Tentar Novamente
        </Button>
      )}>
        <AlertTitle>Erro</AlertTitle>
        {message || 'Ocorreu um erro ao carregar as informações da API.'}
      </Alert>
    </Box>
  );
}