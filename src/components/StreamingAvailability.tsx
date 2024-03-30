import { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsXSquareFill } from 'react-icons/bs';
import { Media } from 'types/global';
import { getStreamingAvailability } from 'services/getStreamingAvailability.service';
import { useAppSelector } from 'state/hooks';

type StreamingAvailabilityProps = {
  currentMedia: null | Media;
};

type CheckMarkProps = {
  isAvailable: boolean;
};

const CheckMark = ({ isAvailable }: CheckMarkProps) => (
  <>
    {isAvailable ? (
      <BsCheckSquareFill style={{ color: '#00FF43' }} />
    ) : (
      <BsXSquareFill style={{ color: '#E90C00' }} />
    )}
  </>
);

export const StreamingAvailability = ({
  currentMedia,
}: StreamingAvailabilityProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentMedia?.imdbID) {
      getStreamingAvailability(dispatch, currentMedia.imdbID);
    }
  }, [currentMedia, dispatch]);

  const tableData = useAppSelector(state => state.streamingAvailability.data);
  const isTableLoading = useAppSelector(
    state => state.streamingAvailability.isLoading
  );

  return (
    <>
      {isTableLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          {tableData ? (
            <TableContainer
              component={Paper}
              sx={{
                marginBottom: 4,
                backgroundColor: '#020202',
                fontFamily: 'Bowlby One SC',
                minWidth: 350,
              }}>
              <Table
                sx={{
                  minWidth: 350,
                  '&.MuiTable-root': {
                    color: 'white',
                  },
                }}
                aria-label="simple table">
                <TableHead
                  sx={{
                    '& .MuiTableCell-root': {
                      color: '#FFFF',
                      textAlign: 'center',
                    },
                  }}>
                  <TableRow>
                    <TableCell>Streaming Service</TableCell>
                    <TableCell align="right">Subscription</TableCell>
                    <TableCell align="right">Rent</TableCell>
                    <TableCell align="right">Rental Cost</TableCell>
                    <TableCell align="right">Buy</TableCell>
                    <TableCell align="right">Purchase Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    '& .MuiTableCell-root': {
                      color: '#FFFF',
                      textAlign: 'center',
                    },
                  }}>
                  {tableData?.map((row: any) => (
                    <TableRow
                      key={row.service}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {row.service.toUpperCase()}
                      </TableCell>
                      <TableCell align="center">
                        <CheckMark isAvailable={row.subscription} />
                      </TableCell>
                      <TableCell align="center">
                        <CheckMark isAvailable={row.buy} />
                      </TableCell>
                      <TableCell align="center">
                        {row.purchasePrice ? `$${row.purchasePrice}` : 'N/A'}
                      </TableCell>
                      <TableCell align="center">
                        <CheckMark isAvailable={row.rent} />
                      </TableCell>
                      <TableCell align="right">
                        {row.rentalPrice ? `$${row.rentalPrice}` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              sx={{
                minWidth: 350,
                minHeight: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Bowlby One SC', textAlign: 'center' }}>
                Oh no!
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Bowlby One SC', textAlign: 'center' }}>
                Unable to get availability
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
