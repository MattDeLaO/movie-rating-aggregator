import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const rows: any[] = [];
export const StreamingAvailability = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Streaming Service</TableCell>
          <TableCell align="right">Subscription</TableCell>
          <TableCell align="right">Rent</TableCell>
          <TableCell align="right">Rental Cost</TableCell>
          <TableCell align="right">Buy</TableCell>
          <TableCell align="right">Purchase Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row: any) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
