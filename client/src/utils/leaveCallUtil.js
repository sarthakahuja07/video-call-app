import { setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';

const leaveCallUtil = (connectionRef) => (dispatch,getState) => {
	dispatch(setCallAccepted(false));
	dispatch(setCallEnded(true));

	const state = getState();
	console.log(state.call.from);
	socket.emit('callDisconnect', { from: state.call.from });
	dispatch(setCall(null));
	connectionRef.current.destroy();
	window.location.reload();
};
export default leaveCallUtil;