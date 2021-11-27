import * as ActionTypes from './actionTypes';

const initialState={
    stream:null,
    me:'',
    call:{},
    callAccepted:false,
    callEnded:false,
    name:'',
};

export const reducer = (state = initialState, action )=>{
    switch(action.type){
        case ActionTypes.SET_USER_INFO:
            return {    
                // ...state,
                // userInfo:action.userInfo
            }
        default :
            return {...state};        
    }
}