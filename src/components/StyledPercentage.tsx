import { Typography } from '@mui/material';

type StyledPercentageProps = {
  overallRating: number;
  small?: boolean;
};

export const StyledPercentage = ({
  overallRating,
  small,
}: StyledPercentageProps) => {
  return (
    <Typography
      variant={small ? 'h6' : 'h2'}
      sx={{
        color:
          overallRating >= 90
            ? '#00FF43'
            : overallRating >= 80
            ? '#00FF43'
            : overallRating >= 70
            ? '#0AF5A1'
            : overallRating >= 60
            ? '#F0FF00'
            : overallRating >= 50
            ? '#FAD000'
            : '#E90C00',
        fontFamily: 'Bowlby One SC',
      }}>
      {`${overallRating}%`}
    </Typography>
  );
};
