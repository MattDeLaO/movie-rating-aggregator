import { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledPercentage } from './StyledPercentage';
import { Modal } from 'components/Modal';
import { useAppSelector } from 'state/hooks';

const GradientBackground = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 4,
  minHeight: 600,
  width: 355,
  flexDirection: 'column',
  border: '2px solid rgba(188, 237, 246, 0.3)',
  borderRadius: 2,
  backgroundImage: 'linear-gradient(#0b010e, rgba(14, 0, 94, 1))',
});

export const MediaCard = () => {
  const currentMedia = useAppSelector(state => state.media.currentMedia);
  const isSearchError = useAppSelector(state => state.media.isError);
  const [openDialogue, setOpenDialogue] = useState(false);

  if (currentMedia === null) {
    return;
  }

  const shouldRenderMovieCard =
    !currentMedia.Error && Object.keys(currentMedia).length !== 0;

  if (isSearchError) {
    return (
      <GradientBackground>
        <Typography>No results found</Typography>
      </GradientBackground>
    );
  } else if (shouldRenderMovieCard) {
    return (
      <>
        <GradientBackground>
          <Card sx={{ backgroundColor: 'transparent' }}>
            <CardActionArea onClick={() => setOpenDialogue(true)}>
              <CardMedia
                component="img"
                height="auto"
                image={currentMedia?.Poster}
                alt="Movie Poster"
                sx={{
                  borderRadius: 1,
                  width: 352,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}>
                  {`${currentMedia?.Title} (${currentMedia?.Year})`}
                </Typography>
                <Typography sx={{ color: '#FFFF', fontFamily: 'Urbanist' }}>
                  More Details
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}>
                  Average Rating:
                </Typography>

                <StyledPercentage
                  overallRating={currentMedia?.averageRating || 0}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </GradientBackground>
        <Modal openDialogue={openDialogue} setOpenDialogue={setOpenDialogue} />
      </>
    );
  }
};
