import { useState, useReducer } from "react";
import { Layout, SearchHistory, MovieCard } from "./components";
import { appStateReducer, initialState, ActionTypes } from "./state/reducer";
import {
  Box,
  Switch,
  TextField,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingSpinner from "./images/Loading.gif";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

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
        backgroundColor: "#00ff1a",
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

const StyledTextField = styled(TextField)({
  "& label": {
    color: "rgba(188, 237, 246, 1)",
  },
  "& label.Mui-focused": {
    color: "rgba(188, 237, 246, 1)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(14, 0, 94, 1)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(14, 0, 94, 1)",
      borderWidth: 3,
    },
    "&:hover fieldset": {
      borderColor: "#FFFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(188, 237, 246, 1)",
    },
  },
  input: {
    color: "#FFFF",
  },
  background: "rgba(14, 0, 94, .6)",
  borderRadius: 3,
  width: 300,
});

const ResultsSection = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: 4,
});

export const App = () => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  const [searchInput, setSearchInput] = useState("");
  const isDesktopDevice = useMediaQuery("(min-width:805px)");
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  console.log("rendered with state", state);

  const searchMovies = (movieTitle) => {
    setSearchInput("");
    dispatch({ type: ActionTypes.LOADING, payload: true });
    fetch(`http://www.omdbapi.com/?t=${movieTitle}&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        if (data.Error) {
          dispatch({ type: ActionTypes.SEARCH_ERROR, payload: true });
        } else {
          dispatch({ type: ActionTypes.ADD_MOVIE, payload: data });
        }
      })
      .catch((e) => {
        dispatch({ type: ActionTypes.LOADING, payload: false });
        console.log(e.message);
      });
  };
  const handleOnChange = (input) => {
    setSearchInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      searchMovies(searchInput);
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h2">Worth the Watch?</Typography>
        <Typography variant="body2">
          Type in a movie to get it's average - compiled by combining IMDb,
          Metacritic, and Rotten Tomatoes scores. Select your result to see the
          breakdown.
        </Typography>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            id="outlined-basic"
            label="Search Movies"
            variant="outlined"
            margin="normal"
            onChange={(event) => handleOnChange(event.target.value)}
            value={searchInput}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            margin={3}
          >
            <Typography variant="h6" fontWeight="bold" mr={1}>
              Search History
            </Typography>
            <HistorySwitch
              checked={state.isSearchHistoryEnabled}
              onChange={() =>
                dispatch({ type: ActionTypes.TOGGLE_SEARCH_HISTORY })
              }
            />
          </Box>
          {state.isLoading && (
            <img
              src={LoadingSpinner}
              style={{ height: 75, width: 75, margin: 4 }}
              alt="Loading Spinner"
            />
          )}
        </Form>
      </Container>
      <ResultsSection
        sx={{ flexDirection: isDesktopDevice ? "row" : "column" }}
      >
        <MovieCard
          currentMovie={state.currentMovie}
          isDesktopDevice={isDesktopDevice}
          isSearchError={state.searchError}
        />
        <SearchHistory
          dispatch={dispatch}
          isDesktopDevice={isDesktopDevice}
          isSearchHistoryEnabled={state.isSearchHistoryEnabled}
          searchHistory={state.searchHistory}
        />
      </ResultsSection>
    </Layout>
  );
};
