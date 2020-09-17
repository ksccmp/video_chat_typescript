import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../api/axios';
import JwtDecode from 'jwt-decode';
import { Iuser } from '../../api/interface';

interface IuserToken {
    user: Iuser;
}

function* userSelectByUserIdSaga(action: actions.IuserSelectByUserIdAction) {
    try {
        const res = yield call([axios, 'get'], '/user/selectByUserId', {
            params: {
                userId: action.payload.userId,
                userPw: action.payload.userPw,
            },
        });

        if (res.data.data === 0) {
            alert('로그인 실패');
        } else {
            yield put(actions.userSetUserAction(res.data.data));
            localStorage.userToken = res.headers['jwt-user-token']; // jwt-user-token으로 response온 값을 localStorage에 저장
            alert('로그인 성공');
            window.location.href = '/main/home'; // 변경 필요
        }
    } catch (e) {
        alert(e);
    }
}

function* userSelectByUserTokenSaga() {
    try {
        const res = yield call([axios, 'get'], '/user/selectByUserToken', {
            params: {
                userToken: localStorage.userToken,
            },
        });

        yield put(actions.userSetUserAction(res.data.data));
    } catch (e) {
        const userToken: IuserToken = JwtDecode(localStorage.userToken); // 기존의 Storage에 저장되어 있던 토큰 복호화
        try {
            const res = yield call([axios, 'get'], '/user/selectByUserRefreshToken', {
                params: {
                    userId: userToken.user.userId,
                },
            });
            yield put(actions.userSetUserAction(res.data.data));
            localStorage.userToken = res.headers['jwt-user-token'];
        } catch (ee) {
            localStorage.removeItem('userToken'); // 갱신 토큰도 만료되었을 시 재 로그인
            alert('다시 로그인 해주세요');
            window.location.href = '/user/signIn'; // 변경 필요
        }
    }
}

function* userInsertSaga(action: actions.IuserInsertAction) {
    try {
        const res = yield call([axios, 'post'], '/user/insert', action.payload);
        if (res.data.data === 1) {
            alert('회원가입 성공');
            window.location.href = '/user/signIn'; // 변경 필요
        }
    } catch (e) {
        alert(e);
    }
}

const saga = [
    takeEvery(actions.userSelectByUserId, userSelectByUserIdSaga),
    takeEvery(actions.userSelectByUserToken, userSelectByUserTokenSaga),
    takeEvery(actions.userInsert, userInsertSaga),
];

export default saga;
