import { setStream, setMe, setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import Peer from 'simple-peer'
import { socket } from '../apis/socketApi';


const setStatesUtil = (myVideoLocalRef) => (dispatch) => {
    const getUserMedia = async () => {
        try {
            const currStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            dispatch(setStream(currStream));
            myVideoLocalRef.current.srcObject = currStream;
            // dispatch(setMyVideoRef(myVideoLocalRef));

        } catch (err) {
            console.log(err);
        }
    };
    getUserMedia();

    socket.on('me', (id) => {
        dispatch(setMe(id));
    })

    socket.on('callUser', ({ from, name, signal }) => {
        dispatch(setCall({ isReceivingCall: true, from, name, signal }));
    })

    // socket.on('callDisconnected', () => {
    //     dispatch(setCallEnded(true));
    // });
}

export default setStatesUtil;