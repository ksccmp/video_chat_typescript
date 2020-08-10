import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Iuser, IuserAuth } from '../api/interface';
import { userSetUserAction, userSelectByUserIdAction } from '../modules/actions';
import { reducerState } from '../modules/reducer';

const signIn = () => {
    const dispatch = useDispatch();
    const user: Iuser = useSelector((state: reducerState) => state.user.user);

    const testClick = () => {
        const setUser: Iuser = {
            userId: 'userId',
            userPw: 'userPw',
            userNm: 'userNm',
            userGd: 'userGd',
            userAge: 0,
            userPh: 'userPh',
            userMa: 'userMa',
            rgstTm: 'rgstTm',
            updtTm: 'updtTm',
        };

        dispatch(userSetUserAction(setUser));
    };

    const sagaTest = () => {
        const testUser: IuserAuth = {
            userId: 'asd',
            userPw: 'asd',
        };
        dispatch(userSelectByUserIdAction(testUser));
    };

    return (
        <div>
            <p>SignIn 페이지입니다.</p>
            <input type="button" value="로그인" onClick={testClick}></input>
            <input type="button" value="사가테스트" onClick={sagaTest}></input>
            {user.userNm}
        </div>
    );
};

export default signIn;
