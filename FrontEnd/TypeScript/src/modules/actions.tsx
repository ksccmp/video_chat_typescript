import { Iuser, IuserAuth, Ichat, Iroom, IopenPasswordModal, IopenAlertModal, IpeerInfo } from '../api/interface';

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
export const socketSetPeerInfoList: string = 'socketSetPeerInfoList';
export const socketResetPeerInfoList: string = 'socketResetPeerInfoList';
export const socketFilterPeerInfoList: string = 'socketFilterPeerInfoList';
export const socketSetPeerStream: string = 'socketSetPeerStream';
export const roomOpenRoomModal: string = 'roomOpenRoomModal';
export const roomOpenPasswordModal: string = 'roomOpenPasswordModal';
export const roomResetOpenPasswordModal: string = 'roomResetOpenPasswordModal';
export const commonOpenAlertModal: string = 'commonOpenAlertModal';
export const commonResetOpenAlertModal: string = 'commonResetOpenAlertModal';

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

export interface IsocketSetPeerInfoListAction {
    type: typeof socketSetPeerInfoList;
    payload: IpeerInfo;
}

export interface IsocketResetPeerInfoListAction {
    type: typeof socketResetPeerInfoList;
}

export interface IsocketFilterPeerInfoListAction {
    type: typeof socketFilterPeerInfoList;
    payload: string;
}

export interface IsocketSetPeerStreamAction {
    type: typeof socketSetPeerStream;
    payload: IpeerInfo;
}

export interface IroomOpenRoomModalAction {
    type: typeof roomOpenRoomModal;
    payload: boolean;
}

export interface IroomOpenPasswordModalAction {
    type: typeof roomOpenPasswordModal;
    payload: IopenPasswordModal;
}

export interface IroomResetOpenPasswordModalAction {
    type: typeof roomResetOpenPasswordModal;
}

export interface IcommonOpenAlertModalAction {
    type: typeof commonOpenAlertModal;
    payload: IopenAlertModal;
}

export interface IcommonResetOpenAlertModalAction {
    type: typeof commonResetOpenAlertModal;
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

export const socketSetPeerInfoListAction = (res: IpeerInfo): IsocketSetPeerInfoListAction => {
    return {
        type: socketSetPeerInfoList,
        payload: res,
    };
};

export const socketResetPeerInfoListAction = (): IsocketResetPeerInfoListAction => {
    return {
        type: socketResetPeerInfoList,
    };
};

export const socketFilterPeerInfoListAction = (res: string): IsocketFilterPeerInfoListAction => {
    return {
        type: socketFilterPeerInfoList,
        payload: res,
    };
};

export const socketSetPeerStreamAction = (res: IpeerInfo): IsocketSetPeerStreamAction => {
    return {
        type: socketSetPeerStream,
        payload: res,
    };
};

export const roomOpenRoomModalAction = (res: boolean): IroomOpenRoomModalAction => {
    return {
        type: roomOpenRoomModal,
        payload: res,
    };
};

export const roomOpenPasswordModalAction = (res: IopenPasswordModal): IroomOpenPasswordModalAction => {
    return {
        type: roomOpenPasswordModal,
        payload: res,
    };
};

export const roomResetOpenPasswordModalAction = (): IroomResetOpenPasswordModalAction => {
    return {
        type: roomResetOpenPasswordModal,
    };
};

export const commonOpenAlertModalAction = (res: IopenAlertModal): IcommonOpenAlertModalAction => {
    return {
        type: commonOpenAlertModal,
        payload: res,
    };
};

export const commonResetOpenAlertModalAction = (): IcommonResetOpenAlertModalAction => {
    return {
        type: commonResetOpenAlertModal,
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
    | IsocketSetPeerInfoListAction
    | IsocketResetPeerInfoListAction
    | IsocketFilterPeerInfoListAction
    | IsocketSetPeerStreamAction
    | IroomInsertAction
    | IroomOpenRoomModalAction
    | IroomOpenPasswordModalAction
    | IroomResetOpenPasswordModalAction
    | IcommonOpenAlertModalAction
    | IcommonResetOpenAlertModalAction;
