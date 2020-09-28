import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../api/axios';

function* roomInsertSaga(action: actions.IroomInsertAction) {
    try {
        const res = yield call([axios, 'post'], '/room/insert', action.payload, {
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });
        if (res.data.data === 1) {
            alert('방 생성이 완료되었습니다.');
            yield put(actions.roomOpenRoomModalAction(false));
        } else {
            alert('방 생성에 실패했습니다.');
        }
    } catch (e) {
        alert(e);
    }
}

const saga = [takeEvery(actions.roomInsert, roomInsertSaga)];

export default saga;
