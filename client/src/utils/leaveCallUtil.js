import { setStream, setMe, setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import Peer from 'simple-peer'
import { socket } from '../apis/socketApi';

const leaveCallUtil = () => (dispatch) => {
	dispatch(setCallEnded(true));

	// connectionRef.current.destroy();
	// TODO: destroy connectionRef

	window.location.reload();
};
export default leaveCallUtil;