import { Iuser, IuserAuth } from '../api/interface';

// Saga
export const userSelectByUserId: string = 'userSelectByUserId';

// Not Saga
export const userSetUser: string = 'userSetUser';

// Saga
interface IuserSelectByUserIdAction {
    type: typeof userSelectByUserId;
    payload: IuserAuth;
}

// Not Saga
interface IuserSetUserAction {
    type: typeof userSetUser;
    payload: Iuser;
}

// Saga
export const userSelectByUserIdAction = (res: IuserAuth): IuserSelectByUserIdAction => {
    return {
        type: userSelectByUserId,
        payload: res,
    };
};

// Not Saga
export const userSetUserAction = (res: Iuser): IuserSetUserAction => {
    return {
        type: userSetUser,
        payload: res,
    };
};

export type reducerAction = IuserSelectByUserIdAction | IuserSetUserAction;
