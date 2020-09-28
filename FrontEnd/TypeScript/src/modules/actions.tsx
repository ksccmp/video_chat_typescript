import { Iuser, IuserAuth, Ichat, Iroom } from '../api/interface';

// Saga
export const userSelectByUserId: string = 'userSelectByUserId';
export const userSelectByUserToken: string = 'userSelectByUserToken';
export const userInsert: string = 'userInsert';
export const roomInsert: string = 'roomInsert';

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

export interface IroomInsertAction {
    type: typeof roomInsert;
    payload: Iroom;
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

export const roomInsertAction = (res: Iroom): IroomInsertAction => {
    return {
        type: roomInsert,
        payload: res,
    };
};

// Not Saga
export const userSetUser: string = 'userSetUser';
export const userLogout: string = 'userLogout';
export const socketSetChatList: string = 'socketSetChatList';
export const socketResetChatList: string = 'socketResetChatList';
export const socketSetVideoList: string = 'socketSetVideoList';
export const socketResetVideoList: string = 'socketResetVideoList';
export const roomOpenRoomModal: string = 'roomOpenRoomModal';

export interface IuserSetUserAction {
    type: typeof userSetUser;
    payload: Iuser;
}

export interface IuserLogoutAction {
    type: typeof userLogout;
}

export interface IsocketSetChatList {
    type: typeof socketSetChatList;
    payload: Ichat;
}

export interface IsocketResetChatList {
    type: typeof socketResetChatList;
}

export interface IsocketSetVideoListAction {
    type: typeof socketSetVideoList;
    payload: MediaStream;
}

export interface IsocketResetVideoListAction {
    type: typeof socketResetVideoList;
}

export interface IroomOpenRoomModalAction {
    type: typeof roomOpenRoomModal;
    payload: boolean;
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

export const socketSetChatListAction = (res: Ichat): IsocketSetChatList => {
    return {
        type: socketSetChatList,
        payload: res,
    };
};

export const socketResetChatListAction = (): IsocketResetChatList => {
    return {
        type: socketResetChatList,
    };
};

export const socketSetVideoListAction = (res: MediaStream): IsocketSetVideoListAction => {
    return {
        type: socketSetVideoList,
        payload: res,
    };
};

export const socketResetVideoListAction = (): IsocketResetVideoListAction => {
    return {
        type: socketResetVideoList,
    };
};

export const roomOpenRoomModalAction = (res: boolean): IroomOpenRoomModalAction => {
    return {
        type: roomOpenRoomModal,
        payload: res,
    };
};

// return
export type reducerAction =
    | IuserSelectByUserIdAction
    | IuserSetUserAction
    | IuserSelectByUserTokenAction
    | IuserLogoutAction
    | IuserInsertAction
    | IsocketSetChatList
    | IsocketResetChatList
    | IsocketSetVideoListAction
    | IsocketResetVideoListAction
    | IroomInsertAction
    | IroomOpenRoomModalAction;
