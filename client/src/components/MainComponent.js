import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStream, setMe, setCall,setCallAccepted, setCallEnded } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';
import Peer from 'simple-peer'

const Main = () => {

  const dispatch = useDispatch();
  const call = useSelector(state => state.call);
  const stream = useSelector(state => state.stream);
  const me = useSelector(state => state.me);
  const name = useSelector(state => state.name);

  const acceptCall = (dispatch) =>{
    dispatch(setCallAccepted(true));
    const peer= new Peer({
        initiator: false,
        trickle: false,
        stream
      });
    peer.on('signal', (data)=>{
        socket.emit('acceptCall', {signal: data, to: call.from})
    });
    peer.on('stream', (currentStream) => {
      // userVideo.current.srcObject = currentStream;
      // TODO: set uservideo ref
    });
  peer.signal(call.signal);
  // TODO: set connection ref
}



const callUser = (id) => {
  const peer = new Peer({ initiator: true, trickle: false, stream });

  peer.on('signal', (data) => {
    socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
  });

  peer.on('stream', (currentStream) => {
    // userVideo.current.srcObject = currentStream;
    // TODO: set uservideo ref
  });

  socket.on('callAccepted', (signal) => {
    setCallAccepted(true);

    peer.signal(signal);
  });

  // connectionRef.current = peer;
  // TODO: set connection ref
};

const leaveCall = () => {
  dispatch(setCallEnded(true));

  // connectionRef.current.destroy();
  // TODO: destroy connectionRef

  window.location.reload();
};

  const setStates=()=>{
     navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      dispatch(setStream(stream));
      // TODO: set video refs
    })
      .catch((err) => {
        console.log(err);
      });

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

      {/* options */}
      {/* notifs */}
    </div>
  )
}

export default Main
