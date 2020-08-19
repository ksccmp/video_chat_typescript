import { combineReducers } from 'redux';
import user from './user';
import { IinitUserState } from './user';
import { IinitSocketState } from './socket';
import socket from './socket';

export interface reducerState {
    user: IinitUserState;
    socket: IinitSocketState;
}

const rootReducer = combineReducers({
    user,
    socket,
});

export default rootReducer;
