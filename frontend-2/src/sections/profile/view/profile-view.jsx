// ---
import * as React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { account } from 'src/_mock/account';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
export default function ProfileView() {
  const birthDate = `${account.location}, ${account.birthDate.getDate()}-${account.birthDate.getMonth()}-${account.birthDate.getFullYear()}`;
  return (
    <Container sx={{ width: '100%' }} borderRadius={2}>
      <Card
        component={Stack}
        spacing={3}
        direction="column"
        sx={{
          px: 3,
          py: 5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500, width: '100%', boxShadow: 3 }} aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row" sx={{ width: '40%' }}>
                  Nama
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: '10%' }}>
                  :
                </StyledTableCell>
                <StyledTableCell align="left">{account.displayName}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Email
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: '10%' }}>
                  :
                </StyledTableCell>
                <StyledTableCell align="left">{account.email}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Tempat, Tanggal Lahir
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: '10%' }}>
                  :
                </StyledTableCell>
                <StyledTableCell align="left">{birthDate}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Jenis Kelamin
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: '10%' }}>
                  :
                </StyledTableCell>
                <StyledTableCell align="left">{account.gender}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Agama
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ width: '10%' }}>
                  :
                </StyledTableCell>
                <StyledTableCell align="left">{account.religion}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
