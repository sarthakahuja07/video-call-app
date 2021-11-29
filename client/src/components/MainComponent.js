import React, { useEffect, useContext, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStream, setMe, setCall, setCallAccepted, setCallEnded, setMyVideoRef, setUserVideoRef } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';
import Peer from 'simple-peer'
import VideoPlayer from './VideoPlayerComponent';
import Controls from './ControlsComponent';
// import { SocketContext } from '../context';
export const func= ()=>{
	
}

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
			userVideoLocalRef.current.srcObject = currentStream;
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
			userVideoLocalRef.current.srcObject = currentStream;
		});

		socket.on('callAccepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});
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
				const currStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				dispatch(setStream(currStream));
				myVideoLocalRef.current.srcObject = currStream;
				// dispatch(setMyVideoRef(myVideoLocalRef));

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

			<VideoPlayer ref={{ ref1: myVideoLocalRef, ref2: userVideoLocalRef }}></VideoPlayer>
			<Controls leaveCall={leaveCall} callUser={callUser}></Controls>
			{/* notifs */}
		</div>
	)
}

export default Main 
