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
import { useSelector, useDispatch } from 'react-redux';
//@ts-ignore
import { removeFromSearchHistory } from 'state/slices/searchHistorySlice';
//@ts-ignore
import { replaceCurrentMedia } from 'state/slices/mediaSlice';

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
  //@ts-ignore
  const searchHistory = useSelector(state => state.searchHistory.history);
  const isSearchHistoryEnabled = useSelector(
    //@ts-ignore
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
              <ListItemAvatar>
                <Avatar alt={media.Title} src={media.Poster} />
              </ListItemAvatar>
              <ListItemText sx={{ fontWeight: 'bold', fontFamily: 'Urbanist' }}>
                {media.Title}
                <StyledPercentage overallRating={media.averageRating} small />
              </ListItemText>
              <ListItemSecondaryAction
                sx={{ display: 'flex', flexDirection: 'row' }}>
                <ListItemButton
                  sx={{ color: '#00ff1a' }}
                  onClick={() => dispatch(replaceCurrentMedia(media))}>
                  <FiPlus />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: '#ff0400' }}
                  onClick={() => dispatch(removeFromSearchHistory(media))}>
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
