import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { ActionTypes } from "../state/reducer";
import { Box, Typography } from "@mui/material";
import { StyledPercentage } from "./StyledPercentage";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HistorySwitch = styled(Switch)({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#39393D",
    opacity: 1,
  },
});

export const SearchHistory = ({ searchHistory, dispatch, isDesktopDevice }) => {
  const [isShowHistoryEnabled, setShowHistoryEnabledStatus] = useState(true);
  const isSearchHistory = Object.keys(searchHistory).length !== 0;
  return (
    isSearchHistory && (
      <Box sx={{ minHeight: 400, margin: 2 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mr={1}>
            Search History
          </Typography>
          <HistorySwitch
            checked={isShowHistoryEnabled}
            onChange={() => setShowHistoryEnabledStatus(!isShowHistoryEnabled)}
          />
        </div>
        {isShowHistoryEnabled && (
          <ImageList
            sx={{ maxWidth: 500, maxHeight: isDesktopDevice ? 700 : 450 }}
          >
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
                  }
                  p={1}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    )
  );
};
