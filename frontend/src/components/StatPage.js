import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { getUserEntry } from '../services/entry';
import returnSum from '../utils/stat';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  padding: 40,
  width: '50%'
}));

const StatPage = ({ user }) => {
  const [entryData, setEntryData] = useState([]);
  let distanceSum = 0;
  let durationSum = 0;

  if (entryData.length >= 1) {
    distanceSum = returnSum(entryData.map(x => x.distance));
    durationSum = returnSum(entryData.map(x => x.duration));
  }

  useEffect(async () => {
    const userEntry = await getUserEntry(user.token);
    setEntryData(userEntry);
  }, []);

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
        <Item><strong>Total distance</strong><br />
          {distanceSum.toFixed(1)} km
        </Item>
        <Item><strong>Total duration</strong><br />
          {(durationSum / 60).toFixed(1)} hours
        </Item>
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
            {entryData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((entry, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {entry.date}
                </TableCell>
                <TableCell>{entry.distance}</TableCell>
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