import { ACTION_TYPE, Movie, Action, Rating } from '../types/global';

export type AppState = {
  currentMovie: Movie;
  searchHistory: Movie[] | [];
  isSearchHistoryEnabled: boolean;
  isLoading: boolean;
  searchError: boolean;
  streamingAvailability: any;
};

export const initialState = {
  currentMovie: {},
  searchHistory: [],
  isSearchHistoryEnabled: true,
  isLoading: false,
  searchError: false,
  streamingAvailability: [],
};

export const determineOverallAverage = (ratings: Rating[]): number => {
  const ratingValues: any[] = [];
  const convertedRatings: number[] = [];

  ratings.map(rating => ratingValues.push(rating.Value));

  ratingValues.forEach(value => {
    if (value.includes('/')) {
      const splitValues = value.split('/');
      const percentage = (splitValues[0] / splitValues[1]) * 100;
      convertedRatings.push(percentage);
    } else if (value.includes('%')) {
      const valueWithoutPercent = parseInt(
        value.substring(0, value.length - 1)
      );
      convertedRatings.push(valueWithoutPercent);
    }
  });

  const sum: number = convertedRatings.reduce((a: number, b: number) => a + b);

  return Math.round(sum / convertedRatings.length);
};

const shouldAddSubmissionToSearchHistory = (state: AppState, movie: Movie) => {
  let isDuplicate = false;
  state.searchHistory.forEach((entry: Movie) => {
    if (entry.imdbID === movie.imdbID) {
      isDuplicate = true;
    }
  });

  return movie.Error || isDuplicate ? false : true;
};

export const appStateReducer = (state: AppState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.ADD_MOVIE: {
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
    case ACTION_TYPE.ADD_STREAMING_AVAILABILITY: {
      return {
        ...state,
        streamingAvaiability: payload,
      };
    }
    case ACTION_TYPE.REPLACE_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: payload,
      };
    case ACTION_TYPE.REMOVE_MOVIE:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory.filter(
            (movie: Movie) => movie.Title !== payload.Title
          ),
        ],
      };
    case ACTION_TYPE.TOGGLE_SEARCH_HISTORY:
      return {
        ...state,
        isSearchHistoryEnabled: !state.isSearchHistoryEnabled,
      };
    case ACTION_TYPE.LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ACTION_TYPE.SEARCH_ERROR:
      return {
        ...state,
        searchError: payload,
      };
    default:
      return state;
  }
};
