import { Iuser, IuserAuth } from '../api/interface';

// Saga
export const userSelectByUserId: string = 'userSelectByUserId';
export const userSelectByUserToken: string = 'userSelectByUserToken';
export const userInsert: string = 'userInsert';

export interface IuserSelectByUserIdAction {
    type: typeof userSelectByUserId;
    payload: IuserAuth;
}

export interface IuserSelectByUserTokenAction {
    type: typeof userSelectByUserToken;
}

export interface IuserInsertAction {
    type: typeof userInsert;
    payload: Iuser;
}

export const userSelectByUserIdAction = (res: IuserAuth): IuserSelectByUserIdAction => {
    return {
        type: userSelectByUserId,
        payload: res,
    };
};

export const userSelectByUserTokenAction = (): IuserSelectByUserTokenAction => {
    return {
        type: userSelectByUserToken,
    };
};

export const userInsertAction = (res: Iuser): IuserInsertAction => {
    return {
        type: userInsert,
        payload: res,
    };
};

// Not Saga
export const userSetUser: string = 'userSetUser';
export const userLogout: string = 'userLogout';

export interface IuserSetUserAction {
    type: typeof userSetUser;
    payload: Iuser;
}

export interface IuserLogoutAction {
    type: typeof userLogout;
}

export const userSetUserAction = (res: Iuser): IuserSetUserAction => {
    return {
        type: userSetUser,
        payload: res,
    };
};

export const userLogoutAction = (): IuserLogoutAction => {
    return {
        type: userLogout,
    };
};

// return
export type reducerAction =
    | IuserSelectByUserIdAction
    | IuserSetUserAction
    | IuserSelectByUserTokenAction
    | IuserLogoutAction
    | IuserInsertAction;
