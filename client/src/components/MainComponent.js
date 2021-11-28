import React, { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStream, setMe, setCall, setCallAccepted, setCallEnded, setMyVideoRef, setUserVideoRef } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';
import Peer from 'simple-peer'
import VideoPlayer from './VideoPlayerComponent';
// import { SocketContext } from '../context';

const Main = () => {

  // const { myVideo, userVideo} = useContext(SocketContext);
  const dispatch = useDispatch();
  const call = useSelector(state => state.call);
  const stream = useSelector(state => state.stream);
  const me = useSelector(state => state.me);
  const name = useSelector(state => state.name);
  const myVideoLocalRef = useRef();
  const userVideoLocalRef = useRef();

  const acceptCall = (dispatch) => {
    dispatch(setCallAccepted(true));
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });
    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: call.from })
    });
    peer.on('stream', (currentStream) => {
      // userVideo.current.srcObject = currentStream;
      // TODO: set uservideo ref
      // userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    // TODO: set connection ref
    // connectionRef.current = peer;
  }



  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      // userVideo.current.srcObject = currentStream;
      // TODO: set uservideo ref
      // userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    // connectionRef.current = peer;
    // TODO: set connection ref
    // connectionRef.current = peer;
  };

  const leaveCall = () => {
    dispatch(setCallEnded(true));

    // connectionRef.current.destroy();
    // TODO: destroy connectionRef

    window.location.reload();
  };

  
  const setStates = () => {

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        myVideoLocalRef.current.srcObject = stream;
        dispatch(setStream(stream));
        dispatch(setMyVideoRef(myVideoLocalRef));

      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();

    socket.on('currentUser', (id) => {
      dispatch(setMe(id));
    })

    socket.on('callUser', ({ from, name, signal }) => {
      dispatch(setCall({ isReceivingCall: true, from, name, signal }));
    })

  }

  useEffect(() => {
    setStates();
  }, [])

  return (
    <div>
      {/* Video player */}

      <VideoPlayer></VideoPlayer>
      {/* options */}
      {/* notifs */}
    </div>
  )
}

export default Main
