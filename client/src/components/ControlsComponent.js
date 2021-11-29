import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';

import { setStream, setMe, setCall, setCallAccepted, setCallEnded, setMyVideoRef, setUserVideoRef, setName } from '../redux/actionCreator';


import { useDispatch, useSelector } from 'react-redux';


const Controls = ({ leaveCall, callUser }) => {
	const [idToCall, setIdToCall] = useState('');
	const callAccepted = useSelector(state => state.callAccepted);
	const callEnded = useSelector(state => state.callEnded);
	const name = useSelector(state => state.name);
	const me = useSelector(state => state.me);


	const setNameFunc = (e) => {
		setName(e.target.value);
	}


	return (
		<Container >
			<Paper >
				<form noValidate autoComplete="off">
					<Grid container >
						<Grid item xs={12} md={6} >
							<Typography gutterBottom variant="h6">Account Info</Typography>
							<TextField label="Name" value={name} onChange={(e) => setNameFunc()} fullWidth />
							<CopyToClipboard text={me} >
								<Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
									Copy Your ID
								</Button>
							</CopyToClipboard>
						</Grid>
						<Grid item xs={12} md={6} >
							<Typography gutterBottom variant="h6">Make a call</Typography>
							<TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
							{callAccepted && !callEnded ? (
								<Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} >
									Hang Up
								</Button>
							) : (
								<Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} >
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