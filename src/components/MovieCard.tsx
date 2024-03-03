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
import { useSelector } from 'react-redux';

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

export const MovieCard = () => {
  //@ts-ignore
  const currentMedia = useSelector(state => state.media.currentMedia);
  //@ts-ignore
  const isSearchError = useSelector(state => state.media.isError);
  const shouldRenderMovieCard =
    !currentMedia.Error && Object.keys(currentMedia).length !== 0;
  const [openDialogue, setOpenDialogue] = useState(false);

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
                image={currentMedia.Poster}
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
                  {`${currentMedia.Title} (${currentMedia.Year})`}
                </Typography>
                <Typography sx={{ color: '#FFFF', fontFamily: 'Urbanist' }}>
                  More Details
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}>
                  Average Rating:
                </Typography>
                <StyledPercentage overallRating={currentMedia.averageRating} />
              </CardContent>
            </CardActionArea>
          </Card>
        </GradientBackground>
        <Modal openDialogue={openDialogue} setOpenDialogue={setOpenDialogue} />
      </>
    );
  }
};
