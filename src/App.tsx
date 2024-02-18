import { useState, useReducer } from 'react';
import { Layout } from './components/Layout';
import { SearchHistory } from './components/SearchHistory';
import { MovieCard } from './components/MovieCard';
import { appStateReducer, initialState } from './state/reducer';
import {
  Box,
  CircularProgress,
  Switch,
  TextField,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ACTION_TYPE } from 'types/global';
//@ts-ignore
import { getMedia } from './services/getMedia.service';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const HistorySwitch = styled(Switch)({
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

const StyledTextField = styled(TextField)({
  '& label': {
    color: 'rgba(188, 237, 246, 1)',
    fontFamily: 'Urbanist',
  },
  '& label.Mui-focused': {
    color: 'rgba(188, 237, 246, 1)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgba(14, 0, 94, 1)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(14, 0, 94, 1)',
      borderWidth: 3,
    },
    '&:hover fieldset': {
      borderColor: '#FFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(188, 237, 246, 1)',
    },
  },
  input: {
    color: '#FFFF',
  },
  background: 'rgba(14, 0, 94, .6)',
  borderRadius: 3,
  width: 300,
});

const ResultsSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: 4,
});

export const App: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  const [searchInput, setSearchInput] = useState('');
  const isDesktopDevice = useMediaQuery('(min-width:805px)');

  const handleOnChange = (input: string) => {
    if (state.searchError) {
      dispatch({ type: ACTION_TYPE.SEARCH_ERROR, payload: false });
      dispatch({ type: ACTION_TYPE.REPLACE_CURRENT_MOVIE, payload: {} });
    }
    setSearchInput(input);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchInput) {
      getMedia(dispatch, searchInput);
      setSearchInput('');
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h2" sx={{ fontFamily: 'Honk', letterSpacing: 2 }}>
          Worth the Watch?
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: 'Urbanist', letterSpacing: 1 }}>
          Type in a movie or show to get its average. Averages are compiled by
          combining IMDb, Metacritic, and Rotten Tomatoes scores. Select your
          result to see the breakdown.
        </Typography>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            id="outlined-basic"
            label="Search Movies"
            variant="outlined"
            margin="normal"
            onChange={event => handleOnChange(event.target.value)}
            value={searchInput}
          />
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
              checked={state.isSearchHistoryEnabled}
              onChange={() =>
                dispatch({ type: ACTION_TYPE.TOGGLE_SEARCH_HISTORY })
              }
            />
          </Box>
          {state.isLoading && <CircularProgress />}
        </Form>
      </Container>
      <ResultsSection
        sx={{ flexDirection: isDesktopDevice ? 'row' : 'column' }}>
        <MovieCard
          currentMovie={state.currentMovie}
          isSearchError={state.searchError}
          dispatch={dispatch}
        />
        <SearchHistory
          dispatch={dispatch}
          isSearchHistoryEnabled={state.isSearchHistoryEnabled}
          searchHistory={state.searchHistory}
        />
      </ResultsSection>
    </Layout>
  );
};
