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

