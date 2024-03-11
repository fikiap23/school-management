// ---
import * as React from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
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
  return (
    <Container sx={{ width: '65%', border: 1 }} borderRadius={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500, width: '100%' }} aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Nama
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ width: '10%' }}>
                :
              </StyledTableCell>
              <StyledTableCell align="right">{account.displayName}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Email
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ width: '10%' }}>
                :
              </StyledTableCell>
              <StyledTableCell align="right">{account.email}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
