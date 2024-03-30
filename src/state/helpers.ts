import {
  Media,
  Rating,
  StreamingServiceResult,
  StreamingObject,
} from 'types/global';
import { SearchHistoryState } from 'state/slices/searchHistorySlice';

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

export const shouldAddSubmissionToSearchHistory = (
  state: SearchHistoryState,
  movie: Media
) => {
  if (state.history?.length > 0) {
    let isDuplicate = false;
    state.history?.forEach((entry: Media) => {
      if (entry.imdbID === movie.imdbID) {
        isDuplicate = true;
      }
    });

    return movie.Error || isDuplicate ? false : true;
  } else {
    return true;
  }
};

export const createStreamTableData = (streamingData: any) => {
  const rows: any = [];
  let objectRef: any = {};
  streamingData.forEach((streamingService: StreamingServiceResult) => {
    const { service } = streamingService;

    if (streamingService.streamingType === 'addon') {
      return;
    }

    if (!(service in objectRef)) {
      objectRef[service] = {
        service,
      };
    }
    objectRef[service][streamingService.streamingType] =
      streamingService.streamingType;

    if (
      'buy' in objectRef[service] &&
      !('purchasePrice' in objectRef[service])
    ) {
      objectRef[service].purchasePrice = streamingService?.price.amount;
    }

    if (
      'rent' in objectRef[service] &&
      !('rentalPrice' in objectRef[service])
    ) {
      objectRef[service].rentalPrice = streamingService?.price.amount;
    }
  });

  for (let obj in objectRef) {
    rows.push(objectRef[obj]);
  }
  return rows;
};
