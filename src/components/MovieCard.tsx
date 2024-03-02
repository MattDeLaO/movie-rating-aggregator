import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledPercentage } from './StyledPercentage';
import { IoClose, IoTrophySharp } from 'react-icons/io5';
import RottenTomatoes from 'images/RottenTomatoes.png';
import IMDb from 'images/IMDb.png';
import Metacritic from 'images/Metacritic.png';
import { Movie } from 'types/global';
import { getStreamingAvailability } from 'services/getStreamingAvailability.service';

type MovieCardProps = {
  currentMovie: Movie;
  isSearchError: boolean;
  dispatch: any;
};

const Row = styled(Container)({
  maxWidth: 475,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

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

const determineSourcePicture = (source: string) => {
  switch (source) {
    case 'Internet Movie Database':
      return IMDb;
    case 'Rotten Tomatoes':
      return RottenTomatoes;
    case 'Metacritic':
      return Metacritic;
    default:
      return;
  }
};

export const MovieCard = ({
  currentMovie,
  isSearchError,
  dispatch,
}: MovieCardProps) => {
  const shouldRenderMovieCard =
    !currentMovie.Error && Object.keys(currentMovie).length !== 0;
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
                image={currentMovie.Poster}
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
                  {`${currentMovie.Title} (${currentMovie.Year})`}
                </Typography>
                <Typography sx={{ color: '#FFFF', fontFamily: 'Urbanist' }}>
                  More Details
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}>
                  Average Rating:
                </Typography>
                <StyledPercentage overallRating={currentMovie.averageRating} />
              </CardContent>
            </CardActionArea>
          </Card>
        </GradientBackground>
        <Dialog open={openDialogue} onClose={() => setOpenDialogue(false)}>
          <DialogTitle
            sx={{
              backgroundColor: '#0b010e',
              fontFamily: 'Bowlby One SC',
              fontWeight: 'bold',
              color: '#FFFF',
            }}>
            {`${currentMovie.Title} (${currentMovie.Year})`}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialogue(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey',
            }}>
            <IoClose />
          </IconButton>
          <DialogContent
            sx={{
              backgroundImage: 'linear-gradient(#0b010e, rgba(14, 0, 94, 1))',
              fontFamily: 'Urbanist',
              color: '#FFFF',
            }}>
            <Typography variant="h6" mb={2} sx={{ fontFamily: 'Urbanist' }}>
              {currentMovie.Genre &&
                currentMovie.Genre.split(',').map(genre => (
                  <Chip
                    key={genre}
                    label={genre}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      fontFamily: 'Urbanist',
                      marginRight: 1,
                    }}
                  />
                ))}
            </Typography>
            <Typography mb={4} sx={{ fontFamily: 'Urbanist' }}>
              {currentMovie.Plot}
            </Typography>
            {currentMovie.Ratings?.map(rating => (
              <Row key={rating.Source}>
                <div style={{ width: 50, height: 50 }}>
                  <img
                    src={determineSourcePicture(rating.Source)}
                    alt="Movie Thumbnail"
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
                <Typography fontWeight="bold">
                  {rating.Source === 'Internet Movie Database'
                    ? 'IMDb'
                    : rating.Source}
                </Typography>
                <Typography fontWeight="bold">{rating.Value}</Typography>
              </Row>
            ))}
            {currentMovie.Awards !== 'N/A' && (
              <Row sx={{ justifyContent: 'flex-start' }}>
                <IoTrophySharp
                  style={{
                    height: 52,
                    width: 52,
                    color: 'gold',
                    paddingRight: 12,
                    margin: '5%',
                  }}
                />
                <Typography fontWeight="bold" fontFamily="Urbanist">
                  {currentMovie.Awards}
                </Typography>
              </Row>
            )}
            <Row sx={{ justifyContent: 'center' }}>
              <Button
                variant="outlined"
                sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}
                onClick={() =>
                  getStreamingAvailability(dispatch, currentMovie.imdbID)
                }>
                Check Streaming Availability
              </Button>
            </Row>
          </DialogContent>
        </Dialog>
      </>
    );
  }
};
