import * as actions from '../actions';
import { Iuser } from '../../api/interface';

export interface IinitUserState {
    user: Iuser;
    isSignIn: boolean;
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
    isSignIn: false,
};

const reducer = (state: IinitUserState = initUserState, action: actions.reducerAction) => {
    switch (action.type) {
        // Saga
        case actions.userSelectByUserId: {
            return {
                ...state,
                payload: (action as actions.IuserSelectByUserIdAction).payload,
            };
        }

        case actions.userSelectByUserToken: {
            return {
                ...state,
            };
        }

        case actions.userInsert: {
            return {
                ...state,
                payload: (action as actions.IuserInsertAction).payload,
            };
        }

        // Not Saga
        case actions.userSetUser:
            return {
                ...state,
                user: (action as actions.IuserSetUserAction).payload,
                isSignIn: true,
            };

        case actions.userLogout:
            return {
                ...state,
                user: initUserState.user,
                isSignIn: false,
            };

        default:
            return {
                ...state,
            };
    }
};

export default reducer;
