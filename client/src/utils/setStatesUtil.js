import { setStream, setMe, setCall} from '../redux/actionCreator';
import { socket } from '../apis/socketApi';


const setStatesUtil = (myVideoLocalRef) => (dispatch) => {
    const getUserMedia = async () => {
        try {
            const currStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            dispatch(setStream(currStream));
            myVideoLocalRef.current.srcObject = currStream;

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

  
}

export default setStatesUtil;