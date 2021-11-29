import { setStream, setMe, setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import Peer from 'simple-peer'
import { socket } from '../apis/socketApi';


const acceptCallUtil = (userVideoLocalRef) => (dispatch, getState) => {
    const state = getState()
    dispatch(setCallAccepted(true));
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: state.stream
    });
    peer.on('signal', (data) => {
        socket.emit('acceptCall', { signal: data, to: state.call.from })
    });
    peer.on('stream', (currentStream) => {
        userVideoLocalRef.current.srcObject = currentStream;
    });
    peer.signal(state.call.signal);
    // TODO: set connection ref
    // connectionRef.current = peer;
}

export default acceptCallUtil;