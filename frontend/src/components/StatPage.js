import React from 'react';
import Navigation from './Navigation';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const dummyData = [
  {
    date: '12-01-2020',
    kilometers: '10.5',
    duration: '30',
    difficulty: '6'
  },
  {
    date: '15-02-2021',
    kilometers: '6.6',
    duration: '20',
    difficulty: '5'
  },
  {
    date: '13-06-2021',
    kilometers: '15.6',
    duration: '45',
    difficulty: '5'
  }
];

const StatPage = () => {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Kilometers</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell>Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((entry) => (
              <TableRow key={entry.date}>
                <TableCell component='th' scope='row'>
                  {entry.date}
                </TableCell>
                <TableCell>{entry.kilometers}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>{entry.difficulty}</TableCell>
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