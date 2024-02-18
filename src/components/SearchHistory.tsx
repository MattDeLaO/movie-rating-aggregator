import { FiPlus, FiMinus } from 'react-icons/fi';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledPercentage } from './StyledPercentage';
import { ACTION_TYPE, Movie } from '../types/global';

type SearchHistoryProps = {
  dispatch: any;
  isSearchHistoryEnabled: boolean;
  searchHistory: Movie[];
};

const SearchHistorySection = styled(Box)({
  borderRadius: 2,
  width: 345,
  height: '100%',
  maxHeight: 600,
  margin: 8,
  overflow: 'scroll',
  background: 'rgba(0,0,0, .7)',
});

export const SearchHistory = ({
  dispatch,
  isSearchHistoryEnabled,
  searchHistory,
}: SearchHistoryProps) => {
  const isSearchHistory = Object.keys(searchHistory).length !== 0;
  const shouldRenderSearchHistory = isSearchHistory && isSearchHistoryEnabled;
  return (
    shouldRenderSearchHistory && (
      <SearchHistorySection>
        <List>
          {searchHistory.map((movie: Movie) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={movie.Title} src={movie.Poster} />
              </ListItemAvatar>
              <ListItemText sx={{ fontWeight: 'bold', fontFamily: 'Urbanist' }}>
                {movie.Title}
                <StyledPercentage overallRating={movie.averageRating} small />
              </ListItemText>
              <ListItemSecondaryAction
                sx={{ display: 'flex', flexDirection: 'row' }}>
                <ListItemButton
                  sx={{ color: '#00ff1a' }}
                  onClick={() =>
                    dispatch({
                      type: ACTION_TYPE.REPLACE_CURRENT_MOVIE,
                      payload: movie,
                    })
                  }>
                  <FiPlus />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: '#ff0400' }}
                  onClick={() =>
                    dispatch({
                      type: ACTION_TYPE.REMOVE_MOVIE,
                      payload: movie,
                    })
                  }>
                  <FiMinus />
                </ListItemButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </SearchHistorySection>
    )
  );
};
