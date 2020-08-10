import { combineReducers } from 'redux';
import user from './user';
import { IinitUserState } from './user';

export interface reducerState {
    user: IinitUserState;
}

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
