import * as actions from '../actions';
import { Iuser } from '../../api/interface';

export interface IinitUserState {
    user: Iuser;
}

const initUserState: IinitUserState = {
    user: {
        userId: '',
        userPw: '',
        userNm: '',
        userGd: '',
        userAge: 0,
        userPh: '',
        userMa: '',
        rgstTm: '',
        updtTm: '',
    },
};

const reducer = (state: IinitUserState = initUserState, action: actions.reducerAction) => {
    switch (action.type) {
        // Saga
        case actions.userSelectByUserId: {
            return {
                ...state,
                payload: action.payload,
            };
        }

        // Not Saga
        case actions.userSetUser:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default reducer;
