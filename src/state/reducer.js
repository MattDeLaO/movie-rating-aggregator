export const ActionTypes = {
  ADD_MOVIE: "ADD_MOVIE",
  REPLACE_CURRENT_MOVIE: "REPLACE_CURRENT_MOVIE",
  REMOVE_MOVIE: "REMOVE_MOVIE",
};

export const initialState = {
  currentMovie: {},
  searchHistory: [],
};

export const determineOverallAverage = (ratings) => {
  const ratingValues = [];
  const convertedRatings = [];

  ratings.map((rating) => ratingValues.push(rating.Value));

  ratingValues.map((value) => {
    if (value.includes("/")) {
      const splitValues = value.split("/");
      const percentage = (splitValues[0] / splitValues[1]) * 100;
      convertedRatings.push(percentage);
    } else if (value.includes("%")) {
      const valueWithoutPercent = parseInt(
        value.substring(0, value.length - 1)
      );
      convertedRatings.push(valueWithoutPercent);
    }
  });

  const sum = convertedRatings.reduce((a, b) => a + b);

  return Math.round(sum / convertedRatings.length);
};

const shouldAddSubmissionToSearchHistory = (state, movie) => {
  let isDuplicate = false;
  state.searchHistory.forEach((entry) => {
    if (entry.imdbID === movie.imdbID) {
      isDuplicate = true;
    }
  });

  return movie.Error || isDuplicate ? false : true;
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MOVIE: {
      if (action.payload.Ratings) {
        action.payload.averageRating = determineOverallAverage(
          action.payload.Ratings
        );
      }

      const movie = { ...action.payload };

      return {
        currentMovie: movie,
        searchHistory: shouldAddSubmissionToSearchHistory(state, movie)
          ? [movie, ...state.searchHistory]
          : [...state.searchHistory],
      };
    }
    case ActionTypes.REPLACE_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: action.payload,
      };
    case ActionTypes.REMOVE_MOVIE:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory.filter(
            (movie) => movie.Title !== action.payload.Title
          ),
        ],
      };
    default:
      return state;
  }
};
