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
import { Media } from '../types/global';
import { useDispatch } from 'react-redux';
import { removeFromSearchHistory } from 'state/slices/searchHistorySlice';
import { replaceCurrentMedia } from 'state/slices/mediaSlice';
import { useAppSelector } from 'state/hooks';
import { FaTrashAlt } from 'react-icons/fa';

const SearchHistorySection = styled(Box)({
  borderRadius: 2,
  width: 345,
  height: '100%',
  maxHeight: 600,
  margin: 8,
  overflow: 'scroll',
  background: 'rgba(0,0,0, .7)',
});

export const SearchHistory = () => {
  const dispatch = useDispatch();
  const searchHistory = useAppSelector(state => state.searchHistory.history);
  const isSearchHistoryEnabled = useAppSelector(
    state => state.searchHistory.isEnabled
  );
  const isSearchHistory = Object.keys(searchHistory).length !== 0;
  const shouldRenderSearchHistory = isSearchHistory && isSearchHistoryEnabled;
  return (
    shouldRenderSearchHistory && (
      <SearchHistorySection>
        <List>
          {searchHistory.map((media: Media) => (
            <ListItem key={media.imdbID}>
              <ListItemButton
                onClick={() => dispatch(replaceCurrentMedia(media))}>
                <ListItemAvatar>
                  <Avatar alt={media.Title} src={media.Poster} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: 'bold', fontFamily: 'Urbanist' }}>
                  {media.Title}
                  <StyledPercentage overallRating={media.averageRating} small />
                </ListItemText>
              </ListItemButton>
              <ListItemSecondaryAction
                sx={{ display: 'flex', flexDirection: 'row' }}>
                <ListItemButton
                  sx={{ color: '#ff0400' }}
                  onClick={() => dispatch(removeFromSearchHistory(media))}>
                  <FaTrashAlt />
                </ListItemButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </SearchHistorySection>
    )
  );
};
