import { EmojiEmotions, Send, ThumbUpSharp } from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LikeCount from './LikeCount';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const App = () => {
  const user_list = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const handleLikes = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes = (updatedMessages[index].likes || 0) + 1;
    setMessages(updatedMessages);
  };

  const handleEmoji = ({ emoji }) => {
    setInputValue((prev) => prev + ' ' + emoji);
    setIsEmojiOpen(false);
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    const randomIndex = Math.floor(Math.random() * user_list.length);
    const user = user_list[randomIndex];
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: user, likes: 0 }]);
      setInputValue('');
    }
  };

  return (
    <Stack
      bgcolor={'rgba(0,0,0,.5)'}
      height={'100vh'}
      boxSizing={'border-box'}
    >
      <AppBar sx={{ padding: '2rem' }}>
        <Typography variant='h5'>Chat App</Typography>
      </AppBar>

      <Stack
        marginTop={'6rem'}
        bgcolor={'whitesmoke'}
        padding={'1rem'}
        spacing={'2rem'}
        height={'90%'}
        sx={{ overflowY: 'auto' }}
      >
        <Paper
          elevation={2}
          sx={{
            width: '30rem',
            alignSelf: 'flex-start',
            backgroundColor: 'rgb(82, 236, 185)',
            padding: '.5rem 1rem',
            position: 'relative',
          }}
        >
          <Typography
            variant='caption'
            color={'rgb(6, 140, 85)'}
            fontSize={'13px'}
          >
            {user_list[0]}
          </Typography>
          <Typography>Enter your message in the input field</Typography>
        </Paper>
        {messages.map((mssg, index) => (
          <Paper
            elevation={2}
            sx={{
              width: '30rem',
              alignSelf: 'flex-end',
              backgroundColor: 'rgb(73, 190, 208)',
              padding: '.5rem 1rem',
              position: 'relative',
            }}
            key={index}
          >
            <IconButton
              sx={{
                position: 'absolute',
                left: mssg.likes ? '-5rem' : '-7rem',
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: '10px',
              }}
              onClick={() => handleLikes(index)}
            >
              <ThumbUpSharp />
              <LikeCount likeCount={mssg.likes} />
            </IconButton>
            <Typography
              variant='caption'
              color={'rgb(0, 66, 86)'}
              fontSize={'13px'}
            >
              {mssg.sender}
            </Typography>
            <Typography>{mssg.text}</Typography>
          </Paper>
        ))}
      </Stack>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: '2rem',
          display: 'flex',
          gap: '1rem',
          backgroundColor: 'rgb(255, 97, 76)',
          position: 'relative',
        }}
      >
        <TextField
          sx={{
            width: '100%',
            backgroundColor: 'rgb(247, 239, 229)',
            borderRadius: '10px',
          }}
          placeholder='Type Message Here...'
          value={inputValue}
          onChange={handleInput}
        />
        <EmojiPicker
          open={isEmojiOpen}
          onEmojiClick={handleEmoji}
          style={{ position: 'absolute', top: '-28rem', right: '1rem' }}
        />
        <Button
          type='button'
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
        >
          <EmojiEmotions sx={{ color: 'black' }} />
        </Button>
        <Button type='submit'>
          <Send sx={{ color: 'black' }} />
        </Button>
      </form>
    </Stack>
  );
};
export default App;
