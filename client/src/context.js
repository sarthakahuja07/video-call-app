import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    return (
        <SocketContext.Provider value={{
            myVideo,
            userVideo,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };