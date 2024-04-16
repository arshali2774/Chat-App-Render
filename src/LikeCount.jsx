import { Typography } from '@mui/material';

const LikeCount = ({ likeCount }) => {
  return (
    <Typography variant='caption'>
      {likeCount > 0 ? likeCount : 'No Likes'}
    </Typography>
  );
};
export default LikeCount;
