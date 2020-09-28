export interface IuserAuth {
    userId: string;
    userPw: string;
}

export interface Iuser extends IuserAuth {
    userNm: string;
    userGd: string;
    userAge: number;
    userPh: string;
    userMa: string;
    rgstTm: string;
    updtTm: string;
}

export interface Ichat {
    roomId: string;
    userId: string;
    type: string;
    contents: string;
    rgstTm: string;
}

export interface Ivideochat {
    type: string;
    sdp?: RTCSessionDescriptionInit;
    label?: number | null;
    id?: string | null;
    candidate?: string;
    roomId: string;
    userId: string;
}

export interface Iroom {
    roomId: number;
    createId: string;
    contents: string;
    password: string;
    type: string;
    max: number;
    number: number;
}
