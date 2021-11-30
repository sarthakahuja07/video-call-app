import React, { useState} from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';

import { setName } from '../redux/actionCreator';


import { useDispatch, useSelector } from 'react-redux';


const Controls = ({ leaveCallUtil, callUserUtil, userVideoLocalRef,connectionRef }) => {
	const dispatch = useDispatch();
	const [idToCall, setIdToCall] = useState('');
	const callAccepted = useSelector(state => state.callAccepted);
	const callEnded = useSelector(state => state.callEnded);
	const call = useSelector(state => state.call);
	const name = useSelector(state => state.name);
	const me = useSelector(state => state.me);


	const setNameFunc = (e) => {
		dispatch(setName(e.target.value));
	}

	const callFunc = () => {
		dispatch(callUserUtil(idToCall, userVideoLocalRef,connectionRef));
	}

	return (
		<Container >
			<Paper >
				<form noValidate autoComplete="off">
					<Grid container >
						<Grid item xs={12} md={6} >
							<Typography gutterBottom variant="h6">Account Info</Typography>
							<TextField label="Name" value={name} onChange={(e) => setNameFunc(e)} fullWidth />
							<CopyToClipboard text={me} >
								<Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
									Copy Your ID
								</Button>
							</CopyToClipboard>
						</Grid>
						<Grid item xs={12} md={6} >
							<Typography gutterBottom variant="h6">Make a call</Typography>
							<TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
							{call && callAccepted && !callEnded ? (
								<Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={() => { dispatch(leaveCallUtil(connectionRef)) }} >
									Hang Up
								</Button>
							) : (
								<Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={callFunc} >
									Call
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Controls;