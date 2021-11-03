import React from 'react';
import Navigation from './Navigation';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { dummyData } from '../dummyData';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  padding: 40,
  width: '50%'
}));

const StatPage = () => {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}
    >
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} mb={4} >
        <Item><strong>Total km</strong><br />
        500km</Item>
        <Item><strong>Total duration</strong><br />
        60 hours</Item>
      </Stack>


      <TableContainer component={Paper} sx={{ minHeight: 350, marginBottom: 10 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Kilometers</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((entry, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {entry.date}
                </TableCell>
                <TableCell>{entry.kilometers}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>{entry.difficulty}</TableCell>
                <TableCell><DeleteForeverIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Navigation />
    </Box>
  );
};

export default StatPage;