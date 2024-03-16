import { useState } from 'react';
import { Layout } from 'components/Layout';
import { SearchHistory } from 'components/SearchHistory';
import { MediaCard } from 'components/MediaCard';
import { HistorySwitch } from 'components/HistorySwitch';
import { TextInputField } from 'components/TextInputField';
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
//@ts-ignore
import { getMedia } from 'services/getMedia.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  replaceCurrentMedia,
  updateSearchError,
  //@ts-ignore
} from 'state/slices/mediaSlice';
//@ts-ignore
import { updateSearchHistoryToggle } from 'state/slices/searchHistorySlice';

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
  const dispatch = useDispatch();
  //@ts-ignore
  const isError = useSelector(state => state.media.isError);
  //@ts-ignore
  const searchHistory = useSelector(state => state.searchHistory.history);
  //@ts-ignore
  const isSearchLoading = useSelector(state => state.media.isLoading);
  const isSearchHistoryEnabled = useSelector(
    //@ts-ignore
    state => state.searchHistory.isEnabled
  );

  const [searchInput, setSearchInput] = useState('');
  const isDesktopDevice = useMediaQuery('(min-width:805px)');

  const handleOnChange = (input: string) => {
    if (isError) {
      dispatch(updateSearchError(false));
      //@ts-ignore
      dispatch(replaceCurrentMedia({}));
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
        </Form>
        {searchHistory.length > 0 && (
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
        )}
        {isSearchLoading && <CircularProgress />}
      </Container>
      <ResultsSection
        sx={{ flexDirection: isDesktopDevice ? 'row' : 'column' }}>
        <MediaCard />
        <SearchHistory />
      </ResultsSection>
    </Layout>
  );
};
