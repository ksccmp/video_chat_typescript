import { combineReducers } from 'redux';
import user from './user';
import { IinitUserState } from './user';
import { IinitSocketState } from './socket';
import { IinitRoomState } from './room';
import socket from './socket';
import room from './room';

export interface reducerState {
    user: IinitUserState;
    socket: IinitSocketState;
    room: IinitRoomState;
}

const rootReducer = combineReducers({
    user,
    socket,
    room,
});

export default rootReducer;
