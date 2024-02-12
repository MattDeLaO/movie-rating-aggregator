import Tickets from '../images/TicketsBackground.svg';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const BgImage = styled(Box)({
  minHeight: '100vh',
  width: '100vw',
  background: '#0b010e',
  backgroundImage: `url(${Tickets})`,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'fill',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const BgGradientOverlay = styled(Box)({
  minHeight: '100vh',
  width: '100vw',
  backgroundImage:
    'linear-gradient(#0b010e, rgba(11,1,14,0.7), rgba(14,0,94,0.05))',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  paddingTop: 4,
  paddingBottom: 8,
});

export const Layout = ({ children }: any) => (
  <BgImage>
    <BgGradientOverlay>{children}</BgGradientOverlay>
  </BgImage>
);
