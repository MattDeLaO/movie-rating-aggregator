import { FiPlus, FiMinus } from "react-icons/fi";
import { ActionTypes } from "../state/reducer";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const SearchHistorySection = styled(Box)({
  borderRadius: 2,
  maxHeight: 800,
  margin: 8,
  overflow: "scroll",
  background: "rgba(0,0,0, .7)",
});

export const SearchHistory = ({
  dispatch,
  isDesktopDevice,
  isSearchHistoryEnabled,
  searchHistory,
}) => {
  const isSearchHistory = Object.keys(searchHistory).length !== 0;
  return (
    isSearchHistory && (
      <SearchHistorySection>
        {isSearchHistoryEnabled && (
          <ImageList maxWidth={500} maxHeight={isDesktopDevice ? 700 : 450}>
            {searchHistory.map((movie) => (
              <ImageListItem key={movie.Poster}>
                <img
                  srcSet={`${movie.Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${movie.Poster}?w=248&fit=crop&auto=format`}
                  alt={movie.Title}
                  loading="lazy"
                />
                <ImageListItemBar
                  subtitle={movie.Title}
                  actionIcon={
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <IconButton
                        sx={{ color: "#ff0400" }}
                        aria-label={`info about ${movie.Title}`}
                        onClick={() =>
                          dispatch({
                            type: ActionTypes.REMOVE_MOVIE,
                            payload: movie,
                          })
                        }
                      >
                        <FiMinus />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#00ff1a" }}
                        aria-label={`info about ${movie.Title}`}
                        onClick={() =>
                          dispatch({
                            type: ActionTypes.REPLACE_CURRENT_MOVIE,
                            payload: movie,
                          })
                        }
                      >
                        <FiPlus />
                      </IconButton>
                    </div>
                  }
                  p={1}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </SearchHistorySection>
    )
  );
};
