import { setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import Peer from 'simple-peer'
import { socket } from '../apis/socketApi';


const acceptCallUtil = (userVideoLocalRef, connectionRef) => (dispatch, getState) => {
    const state = getState()
    dispatch(setCallAccepted(true));
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: state.stream
    });
    peer.on('signal', (data) => 
    {
        socket.emit('acceptCall', { signal: data, to: state.call.from })
    });
    peer.on('stream', (currentStream) => {
        userVideoLocalRef.current.srcObject = currentStream;
    });
    peer.signal(state.call.signal);

    socket.on('callDisconnected', () => {
        dispatch(setCall(null));
        dispatch(setCallAccepted(false));
        dispatch(setCallEnded(true));
        window.location.reload();
    });
    connectionRef.current = peer;
}

export default acceptCallUtil;