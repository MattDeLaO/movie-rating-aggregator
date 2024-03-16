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
  console.log('what is the payload data', streamingData);
  const rows: any = [];
  let objectRef!: StreamingObject;

  streamingData.forEach((streamingService: StreamingServiceResult) => {
    const { service } = streamingService;
    if (
      !objectRef[service as keyof StreamingObject] &&
      streamingService.streamingType !== 'addon'
    ) {
      const coreProperties = {
        service,
        subscription: streamingService.streamingType === 'subscription',
      };
      //@ts-ignore
      objectRef[service as keyof StreamingObject] = coreProperties;

      if (streamingService.streamingType === 'buy') {
        //@ts-ignore

        objectRef[service as keyof StreamingObject].buy = true;
        //@ts-ignore

        objectRef[service as keyof StreamingObject].purchasePrice =
          streamingService.price.amount;
      } else if (streamingService.streamingType === 'rent') {
        //@ts-ignore

        objectRef[service as keyof StreamingObject].rent = true;
        //@ts-ignore

        objectRef[service as keyof StreamingObject].rentalPrice =
          streamingService.price.amount;
      }
    } else if (
      objectRef[service as keyof StreamingObject] &&
      streamingService.streamingType !== 'addon'
    ) {
      if (streamingService.streamingType === 'buy') {
        //@ts-ignore

        objectRef[service as keyof StreamingObject].buy = true;
        //@ts-ignore

        objectRef[service as keyof StreamingObject].purchasePrice =
          streamingService.price.amount;
      } else if (streamingService.streamingType === 'rent') {
        //@ts-ignore

        objectRef[service as keyof StreamingObject].rent = true;
        //@ts-ignore

        objectRef[service as keyof StreamingObject].rentalPrice =
          streamingService.price.amount;
      }
    }
  });
  for (const obj in objectRef) {
    rows.push(objectRef[obj as keyof StreamingObject]);
  }
  console.log('custom rows:', rows);
  return rows;
};
