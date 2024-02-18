export const enum ACTION_TYPE {
  ADD_MOVIE = 'ADD_MOVIE',
  ADD_STREAMING_AVAILABILITY = 'ADD_STREAMING_AVAILABILITY',
  REPLACE_CURRENT_MOVIE = 'REPLACE_CURRENT_MOVIE',
  REMOVE_MOVIE = 'REMOVE_MOVIE',
  TOGGLE_SEARCH_HISTORY = 'TOGGLE_SEARCH_HISTORY',
  LOADING = 'LOADING',
  SEARCH_ERROR = 'SEARCH_ERROR',
}

export type Action = {
  type: string;
  payload?: any;
};

export type Rating = {
  Value: string;
  Source: string;
};

export type Movie = {
  Awards: string;
  imdbID: string;
  Title: string;
  Error?: string;
  averageRating: number;
  Poster: string;
  Year: string;
  Plot: string;
  Genre: string;
  Ratings: Rating[];
};
