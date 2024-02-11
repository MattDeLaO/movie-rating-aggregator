import { FiPlus, FiMinus } from "react-icons/fi";
import { ActionTypes } from "../state/reducer";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { StyledPercentage } from "./StyledPercentage";

const SearchHistorySection = styled(Box)({
  borderRadius: 2,
  width: 345,
  height: 345,
  margin: 8,
  overflow: "scroll",
  background: "rgba(0,0,0, .7)",
});

export const SearchHistory = ({
  dispatch,
  isSearchHistoryEnabled,
  searchHistory,
}) => {
  const isSearchHistory = Object.keys(searchHistory).length !== 0;
  const shouldRenderSearchHistory = isSearchHistory && isSearchHistoryEnabled;

  return (
    shouldRenderSearchHistory && (
      <SearchHistorySection>
        <List>
          {searchHistory.map((movie) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={movie.Title} src={movie.Poster} />
              </ListItemAvatar>
              <ListItemText sx={{ fontWeight: "bold" }}>
                {movie.Title}
                <StyledPercentage overallRating={movie.averageRating} small />
              </ListItemText>
              <ListItemSecondaryAction
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <ListItemButton
                  sx={{ color: "#00ff1a" }}
                  onClick={() =>
                    dispatch({
                      type: ActionTypes.REPLACE_CURRENT_MOVIE,
                      payload: movie,
                    })
                  }
                >
                  <FiPlus />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#ff0400" }}
                  onClick={() =>
                    dispatch({
                      type: ActionTypes.REMOVE_MOVIE,
                      payload: movie,
                    })
                  }
                >
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
