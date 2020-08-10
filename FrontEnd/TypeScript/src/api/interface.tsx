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
