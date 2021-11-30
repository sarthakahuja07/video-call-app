import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import VideoPlayer from './VideoPlayerComponent';
import Controls from './ControlsComponent';
import Notification from './NotificationComponent';
import acceptCallUtil from '../utils/acceptCallUtil';
import callUserUtil from '../utils/callUserUtil';
import leaveCallUtil from '../utils/leaveCallUtil';
import setStatesUtil from '../utils/setStatesUtil'; 


const Main = () => {

	const dispatch = useDispatch();
	const myVideoLocalRef = useRef();
	const userVideoLocalRef = useRef();
	const connectionRef  = useRef();

	useEffect(() => {
		dispatch(setStatesUtil(myVideoLocalRef))
	}, [])

	return (
		<div>
			<VideoPlayer ref={{ ref1: myVideoLocalRef, ref2: userVideoLocalRef }}></VideoPlayer>
			<Controls leaveCallUtil={leaveCallUtil} callUserUtil={callUserUtil} userVideoLocalRef={userVideoLocalRef} connectionRef = {connectionRef}></Controls>
			<Notification acceptCallUtil={acceptCallUtil} userVideoLocalRef={userVideoLocalRef} connectionRef = {connectionRef} />
		</div>
	)
}

export default Main
