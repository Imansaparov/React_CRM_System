import React from 'react';
import { Box, Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  if (count <= 1) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" my={3}>
      <MuiPagination
        count={count}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};
