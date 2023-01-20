import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TablePaginationButtons from "./TablePaginationButtons";
import {TableHeaderCell} from "../style/styles";


function createData(name: string, calories: number, fat: number, status: string) {
  return {name, calories, fat, status};
}

const rows = [
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기'),
  createData('Nougat', 360, 10000, '대기')
]

const TogoTable = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 9;

// Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };


  return (
    <div className={'h-full p-2'}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{backgroundColor: 'rgb(14 165 233)'}}>
              <TableHeaderCell align="center">주문번호</TableHeaderCell>
              <TableHeaderCell align="center">주문일시</TableHeaderCell>
              <TableHeaderCell align="center">주문타입</TableHeaderCell>
              <TableHeaderCell align="center">주문상태</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationButtons onPageChange={handleChangePage} page={page} rowsPerPage={rowsPerPage}
                              count={rows.length}/>
    </div>
  );
}


export default TogoTable
