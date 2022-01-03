import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { getUserEntry, deleteEntry } from '../services/entry';
import returnSum from '../utils/stat';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  padding: 40,
  width: '50%'
}));

const StatPage = () => {
  const [entryData, setEntryData] = useState([]);
  const user = useSelector(state => state);
  let distanceSum = 0;
  let durationSum = 0;

  if (entryData.length >= 1) {
    distanceSum = returnSum(entryData.map(x => x.distance));
    durationSum = returnSum(entryData.map(x => x.duration));
  }

  const fetchUserData = async () => {
    const userEntry = await getUserEntry(user.token);
    setEntryData(userEntry);
  };

  const promptDelete = async ({ date, id }) => {
    if (window.confirm(`Delete entry ${date} ?`)) {
      try {
        await deleteEntry(id, user.token);
        fetchUserData();

      } catch ({ message }) {
        console.error('Something went wrong when deleting entry: ', message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
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
                <TableCell><DeleteForeverIcon id='delete-icon' onClick={() => promptDelete(entry)} /></TableCell>
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