import { Media, Rating, StreamingService, StreamingObject } from 'types/global';

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

//@ts-ignore
export const shouldAddSubmissionToSearchHistory = (state, movie: Media) => {
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

export const createRowData = (streamingData: any) => {
  console.log('what is the payload data', streamingData);
  const rows: any = [];
  //@ts-ignore
  const objectRef: StreamingObject = {};

  streamingData.forEach((streamingService: StreamingService) => {
    const { service } = streamingService;
    if (
      //@ts-ignore
      !objectRef[service] &&
      streamingService.streamingType !== 'addon'
    ) {
      const coreProperties = {
        service,
        //@ts-ignore
        subscription: streamingService.streamingType === 'subscription',
      };
      //@ts-ignore
      objectRef[service] = coreProperties;

      //@ts-ignore

      if (streamingService.streamingType === 'buy') {
        //@ts-ignore

        objectRef[service].buy = true;
        //@ts-ignore

        objectRef[service].purchasePrice = streamingService.price.amount;
        //@ts-ignore
      } else if (streamingService.streamingType === 'rent') {
        //@ts-ignore

        objectRef[service].rent = true;
        //@ts-ignore

        objectRef[service].rentalPrice = streamingService.price.amount;
      }
    } else if (
      //@ts-ignore
      objectRef[service] &&
      streamingService.streamingType !== 'addon'
    ) {
      //@ts-ignore

      if (streamingService.streamingType === 'buy') {
        //@ts-ignore

        objectRef[service].buy = true;
        //@ts-ignore

        objectRef[service].purchasePrice = streamingService.price.amount;
        //@ts-ignore
      } else if (streamingService.streamingType === 'rent') {
        //@ts-ignore

        objectRef[service].rent = true;
        //@ts-ignore

        objectRef[service].rentalPrice = streamingService.price.amount;
      }
    }
  });
  //@ts-ignore
  for (const obj in objectRef) {
    //@ts-ignore
    rows.push(objectRef[obj]);
  }
  console.log('custom rows:', rows);
  return rows;
};
