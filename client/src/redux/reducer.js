import * as ActionTypes from './actionTypes';

const initialState = {
    stream: null,
    me: '',
    call: {},
    callAccepted: false,
    callEnded: false,
    name: '',
    myVideoRef: null,
    userVideoRef: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_STREAM: {
            return { ...state, stream: action.payload.stream };
        }
        case ActionTypes.SET_ME:
            return { ...state, me: action.payload.id }
        case ActionTypes.SET_CALL:
            return { ...state, call: action.payload.data }
        case ActionTypes.SET_CALL_ACCEPTED:
            return { ...state, callAccepted: action.payload.bool }
        case ActionTypes.SET_CALL_ENDED:
            return { ...state, callEnded: action.payload.bool }
        case ActionTypes.SET_MY_VIDEO_REF:
            return { ...state, myVideoRef: action.payload.myVideoRef }
        case ActionTypes.SET_USER_VIDEO_REF:
            return { ...state, userVideoRef: action.payload.userVideoRef }
        case ActionTypes.SET_NAME:
            return { ...state, name: action.payload.name }
        default:
            return { ...state, };
    }
}