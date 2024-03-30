import { Switch, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { updateSearchHistoryToggle } from 'state/slices/searchHistorySlice';
import { useAppSelector } from 'state/hooks';

export const HistorySwitch = styled(Switch)({
  width: 42,
  height: 26,
  padding: 0,
  fontFamily: 'Urbanist',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#00ff1a',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#39393D',
    opacity: 1,
  },
});

export const SearchHistoryToggle = () => {
  const dispatch = useDispatch();
  const searchHistory = useAppSelector(state => state.searchHistory.history);
  const isSearchHistoryEnabled = useAppSelector(
    state => state.searchHistory.isEnabled
  );

  return (
    searchHistory.length > 0 && (
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        margin={3}>
        <Typography variant="h6" fontWeight="bold" mr={1}>
          Search History
        </Typography>
        <HistorySwitch
          checked={isSearchHistoryEnabled}
          onChange={() =>
            dispatch(updateSearchHistoryToggle(!isSearchHistoryEnabled))
          }
        />
      </Box>
    )
  );
};
