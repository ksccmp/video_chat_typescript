import { combineReducers } from 'redux';
import user from './user';
import { IinitUserState } from './user';
import { IinitSocketState } from './socket';
import { IinitRoomState } from './room';
import socket from './socket';
import room from './room';
import common from './common';
import { IinitCommonState } from './common';

export interface reducerState {
    user: IinitUserState;
    socket: IinitSocketState;
    room: IinitRoomState;
    common: IinitCommonState;
}

const rootReducer = combineReducers({
    user,
    socket,
    room,
    common,
});

export default rootReducer;
