import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const Notification = ({ acceptCallUtil, userVideoLocalRef,connectionRef}) => {
    const dispatch = useDispatch();
    const call = useSelector(state => state.call);
    const callAccepted = useSelector(state => state.callAccepted);
    return (
        <React.Fragment>
            {call && call.isReceivingCall && !callAccepted && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h1>{call.name} is calling:</h1>
                        <Button variant="contained" color="primary" onClick={() => { dispatch(acceptCallUtil(userVideoLocalRef,connectionRef)) }}>
                            Answer
                        </Button>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Notification
