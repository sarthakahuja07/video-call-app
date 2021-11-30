import React ,{forwardRef} from 'react'
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const VideoPlayer =  forwardRef((props, ref) => {
    const stream = useSelector(state => state.stream);
    const callAccepted = useSelector(state => state.callAccepted);
    const callEnded = useSelector(state => state.callEnded);
    const call = useSelector(state => state.call);
    const name = useSelector(state => state.name);
    const { ref1, ref2 } = ref;
    return (
        <Grid container>
          {stream && (
            <Paper >
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                <video playsInline muted ref={ref1} autoPlay />
              </Grid>
            </Paper>
          )}
          {call && callAccepted && !callEnded &&(
            <Paper>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                <video playsInline ref={ref2} autoPlay />
              </Grid>
            </Paper>
          )}
        </Grid>
      );
});

export default VideoPlayer
