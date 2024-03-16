import { useState } from 'react';
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { IoClose, IoTrophySharp } from 'react-icons/io5';
import RottenTomatoes from 'images/RottenTomatoes.png';
import IMDb from 'images/IMDb.png';
import Metacritic from 'images/Metacritic.png';
import { Media, Rating } from 'types/global';
import { StreamingAvailability } from './StreamingAvailability';
import { useAppSelector } from 'state/hooks';

type ModalProps = {
  openDialogue: boolean;
  setOpenDialogue: (bool: boolean) => void;
};

type DetailsProps = {
  currentMedia: Media;
};

const Row = styled(Container)({
  maxWidth: 475,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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

const Details = ({ currentMedia }: DetailsProps) => (
  <>
    <Typography variant="h6" mb={2} sx={{ fontFamily: 'Urbanist' }}>
      {currentMedia.Genre &&
        currentMedia.Genre.split(',').map((genre: string) => (
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
      {currentMedia.Plot}
    </Typography>
    {currentMedia.Ratings?.map((rating: Rating) => (
      <Row key={rating.Source}>
        <div style={{ width: 50, height: 50 }}>
          <img
            src={determineSourcePicture(rating.Source)}
            alt="Movie Thumbnail"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <Typography fontWeight="bold">
          {rating.Source === 'Internet Movie Database' ? 'IMDb' : rating.Source}
        </Typography>
        <Typography fontWeight="bold">{rating.Value}</Typography>
      </Row>
    ))}
    {currentMedia.Awards !== 'N/A' && (
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
          {currentMedia.Awards}
        </Typography>
      </Row>
    )}
  </>
);

export const Modal = ({ openDialogue, setOpenDialogue }: ModalProps) => {
  const currentMedia = useAppSelector(state => state.media.currentMedia);
  const [showAvailability, setShowAvailability] = useState(false);
  return (
    <Dialog open={openDialogue} onClose={() => setOpenDialogue(false)}>
      <DialogTitle
        sx={{
          backgroundColor: '#0b010e',
          fontFamily: 'Bowlby One SC',
          fontWeight: 'bold',
          color: '#FFFF',
        }}>
        {
          //@ts-ignore
          `${currentMedia?.Title} (${currentMedia?.Year})`
        }
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
        {showAvailability ? (
          //@ts-ignore

          <StreamingAvailability currentMedia={currentMedia} />
        ) : (
          //@ts-ignore

          <Details currentMedia={currentMedia} />
        )}
        <Row sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            sx={{ color: '#FFFF', fontFamily: 'Bowlby One SC' }}
            onClick={() => {
              setShowAvailability(!showAvailability);
            }}>
            {showAvailability
              ? 'Back to Details'
              : 'Check Streaming Availability'}
          </Button>
        </Row>
      </DialogContent>
    </Dialog>
  );
};
