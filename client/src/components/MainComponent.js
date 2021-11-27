import React, { useEffect } from 'react'
import { io, Socket } from 'socket.io-client';
import peer from 'simple-peer';
import { useDispatch, useSelector } from 'react-redux';
import { setStream, setMe, setCall } from '../redux/actionCreator';
import { socket } from '../apis/socketApi';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      dispatch(setStream(stream));
      // TODO: set video refs
    })
      .catch((err) => {
        console.log(err);
      });

    socket.on('currentUser', (id) => {
      dispatch(setMe(id));
    })

    socket.on('callUser', ({ from, name, signal }) => {
      dispatch(setCall({ isReceivingCall: true, from, name, signal }));
    })

  }, [])

  return (
    <div>
      {/* Video player */}

      {/* options */}
      {/* notifs */}
    </div>
  )
}

export default Main
