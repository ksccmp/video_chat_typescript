import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../api/axios';

function* userSelectByUserIdSaga(action: actions.reducerAction) {
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
            alert('로그인 성공');
        }
    } catch (e) {
        alert(e);
    }
}

const saga = [takeEvery(actions.userSelectByUserId, userSelectByUserIdSaga)];

export default saga;
