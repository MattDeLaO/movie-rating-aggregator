import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TextInputField = styled(TextField)({
  '& label': {
    color: 'rgba(188, 237, 246, 1)',
    fontFamily: 'Urbanist',
  },
  '& label.Mui-focused': {
    color: 'rgba(188, 237, 246, 1)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgba(14, 0, 94, 1)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(14, 0, 94, 1)',
      borderWidth: 3,
    },
    '&:hover fieldset': {
      borderColor: '#FFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(188, 237, 246, 1)',
    },
  },
  input: {
    color: '#FFFF',
  },
  background: 'rgba(14, 0, 94, .6)',
  borderRadius: 3,
  width: 300,
});
