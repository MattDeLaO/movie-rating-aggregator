export const ActionTypes = {
  ADD_MOVIE: "ADD_MOVIE",
  REPLACE_CURRENT_MOVIE: "REPLACE_CURRENT_MOVIE",
  REMOVE_MOVIE: "REMOVE_MOVIE",
  TOGGLE_SEARCH_HISTORY: "TOGGLE_SEARCH_HISTORY",
  LOADING: "LOADING",
  SEARCH_ERROR: "SEARCH_ERROR",
};

export const initialState = {
  currentMovie: {},
  searchHistory: [],
  isSearchHistoryEnabled: true,
  isLoading: false,
  searchError: false,
};

export const determineOverallAverage = (ratings) => {
  const ratingValues = [];
  const convertedRatings = [];

  ratings.map((rating) => ratingValues.push(rating.Value));

  ratingValues.forEach((value) => {
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
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.ADD_MOVIE: {
      if (payload.Ratings) {
        payload.averageRating = determineOverallAverage(payload.Ratings);
      }
      const movie = { ...payload };
      return {
        ...state,
        currentMovie: movie,
        searchHistory: shouldAddSubmissionToSearchHistory(state, movie)
          ? [movie, ...state.searchHistory]
          : [...state.searchHistory],
      };
    }
    case ActionTypes.REPLACE_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: payload,
      };
    case ActionTypes.REMOVE_MOVIE:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory.filter(
            (movie) => movie.Title !== payload.Title
          ),
        ],
      };
    case ActionTypes.TOGGLE_SEARCH_HISTORY:
      return {
        ...state,
        isSearchHistoryEnabled: !state.isSearchHistoryEnabled,
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ActionTypes.SEARCH_ERROR:
      return {
        ...state,
        searchError: payload,
      };
    default:
      return state;
  }
};
