import { useState, useReducer } from 'react';
import { Layout } from 'components/Layout';
import { SearchHistory } from 'components/SearchHistory';
import { MovieCard } from 'components/MovieCard';
import { HistorySwitch } from 'components/HistorySwitch';
import { TextInputField } from 'components/TextInputField';
import { appStateReducer, initialState } from 'state/reducer';
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ACTION_TYPE } from 'types/global';
//@ts-ignore
import { getMedia } from 'services/getMedia.service';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
          <TextInputField
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
