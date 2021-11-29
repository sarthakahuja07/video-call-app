import { setStream, setMe, setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import Peer from 'simple-peer'
import { socket } from '../apis/socketApi';

const callUserUtil = (id, userVideoLocalRef) => (dispatch, getState) => {
    console.log("Hi");
    const state = getState()
    const peer = new Peer({ initiator: true, trickle: false, stream: state.stream });

    peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: state.me, name: state.name });
    });

    peer.on('stream', (currentStream) => {
        userVideoLocalRef.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
        dispatch(setCallAccepted(true));
        peer.signal(signal);
    });
    // TODO: set connection ref
    // connectionRef.current = peer;
};

export default callUserUtil;