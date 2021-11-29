import React from 'react'
import { } from '../redux/actionCreator';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const Notification = ({ acceptCall }) => {
    const call = useSelector(state => state.call);
    const callAccepted = useSelector(state => state.callAccepted);
    return (
        <React.Fragment>
            {!call.isReceivingCall && !callAccepted && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h1>{call.name} is calling:</h1>
                        <Button variant="contained" color="primary" onClick={acceptCall}>
                            Answer
                        </Button>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Notification
