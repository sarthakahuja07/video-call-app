import * as ActionTypes from './actionTypes';

export const setStream =(stream)=>{
    return {
        type: ActionTypes.SET_STREAM,
        payload : {
            stream
        }
    }
}

export const setMe =(id)=>{
    return {
        type: ActionTypes.SET_ME,
        payload : {
            id
        }
    }
}

export const setName =(name)=>{
    return {
        type: ActionTypes.SET_NAME,
        payload : {
            name
        }
    }
}

export const setCall = (data)=>{
    return {
        type: ActionTypes.SET_CALL,
        payload : {
            data
        }
    }
}

export const setCallAccepted = (bool)=>{
    return {
        type: ActionTypes.SET_CALL_ACCEPTED,
        payload : {
            bool
        }
    }
}
export const setCallEnded = (bool)=>{
    return {
        type: ActionTypes.SET_CALL_ENDED,
        payload : {
            bool
        }
    }
}

export const setMyVideoRef= (myVideoRef) =>{
    return{
        type: ActionTypes.SET_MY_VIDEO_REF,
        payload: {
            myVideoRef
        }
    }
}

export const setUserVideoRef= (userVideoRef) =>{
    return{
        type: ActionTypes.SET_USER_VIDEO_REF,
        payload: {
            userVideoRef
        }
    }
}