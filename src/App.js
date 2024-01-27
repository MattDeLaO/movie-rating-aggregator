import { useState, useReducer } from "react";
import { Layout, SearchHistory, MovieCard } from "./components";
import { appStateReducer, initialState, ActionTypes } from "./state/reducer";
import {
  Box,
  TextField,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Form = styled("form")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
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

  const searchMovies = (movieTitle) => {
    fetch(`http://www.omdbapi.com/?t=${movieTitle}&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.ADD_MOVIE, payload: data });
        setSearchInput("");
      });
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
          A simple app designed to give you the average rating from IMDb,
          RottenTomatoes, and (when available) Metacritic.
        </Typography>
        <Form onSubmit={handleSubmit}>
          <StyledTextField
            id="outlined-basic"
            label="Search Movies"
            variant="outlined"
            margin="normal"
            onChange={(event) => setSearchInput(event.target.value)}
            value={searchInput}
          />
        </Form>
      </Container>
      <ResultsSection
        sx={{ flexDirection: isDesktopDevice ? "row" : "column" }}
      >
        <MovieCard
          currentMovie={state.currentMovie}
          isDesktopDevice={isDesktopDevice}
        />
        <SearchHistory
          searchHistory={state.searchHistory}
          dispatch={dispatch}
          isDesktopDevice={isDesktopDevice}
        />
      </ResultsSection>
    </Layout>
  );
};
