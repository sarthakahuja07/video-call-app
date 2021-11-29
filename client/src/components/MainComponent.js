import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStream, setMe, setCall, setCallAccepted, setCallEnded, } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';
import Peer from 'simple-peer'
import VideoPlayer from './VideoPlayerComponent';
import Controls from './ControlsComponent';
import Notification from './NotificationComponent';
import acceptCallUtil from '../utils/acceptCallUtil';
import callUserUtil from '../utils/callUserUtil';
import leaveCallUtil from '../utils/leaveCallUtil';
import setStatesUtil from '../utils/setStatesUtil'; 
// import { SocketContext } from '../context';


const Main = () => {

	const dispatch = useDispatch();
	const myVideoLocalRef = useRef();
	const userVideoLocalRef = useRef();

	useEffect(() => {
		dispatch(setStatesUtil(myVideoLocalRef))
	}, [])

	return (
		<div>
			<VideoPlayer ref={{ ref1: myVideoLocalRef, ref2: userVideoLocalRef }}></VideoPlayer>
			<Controls leaveCallUtil={leaveCallUtil} callUserUtil={callUserUtil} userVideoLocalRef={userVideoLocalRef} ></Controls>
			<Notification acceptCall={acceptCallUtil} userVideoLocalRef={userVideoLocalRef} />
		</div>
	)
}

export default Main
