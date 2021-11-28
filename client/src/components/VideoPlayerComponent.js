import React ,{useContext} from 'react'
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { SocketContext } from '../context';

const VideoPlayer = () => {
    const stream = useSelector(state => state.stream);
    const callAccepted = useSelector(state => state.callAccepted);
    const callEnded = useSelector(state => state.callEnded);
    const call = useSelector(state => state.call);
    const name = useSelector(state => state.name);
    const myVideoRef = useSelector(state => state.myVideoRef);
    const userVideoRef = useSelector(state => state.userVideoRef);
    // const {  myVideo, userVideo } = useContext(SocketContext);
    return (
        <Grid container>
          {stream && (
            <Paper >
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                <video playsInline muted ref={myVideoRef} autoPlay />
              </Grid>
            </Paper>
          )}
          {callAccepted && !callEnded && (
            <Paper>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                <video playsInline ref={userVideoRef} autoPlay />
              </Grid>
            </Paper>
          )}
        </Grid>
      );
}

export default VideoPlayer
