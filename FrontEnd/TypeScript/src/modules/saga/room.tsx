import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../api/axios';
import { IopenAlertModal } from '../../api/interface';

function* roomInsertSaga(action: actions.IroomInsertAction) {
    try {
        const res = yield call([axios, 'post'], '/room/insert', action.payload, {
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });
        if (res.data.data !== 0) {
            action.payload.roomId = res.data.data;

            yield put(actions.roomOpenRoomModalAction(false));

            window.open(
                `../socket/chat/${action.payload.roomId}/${action.payload.createId}`,
                'windowName',
                'toolbar=no, menubar=no',
            );
        } else {
            const openAlertModal: IopenAlertModal = {
                contents: '방 생성에 실패했습니다.',
                open: true,
            };

            yield put(actions.commonOpenAlertModalAction(openAlertModal));
        }
    } catch (e) {
        alert(e);
    }
}

const saga = [takeEvery(actions.roomInsert, roomInsertSaga)];

export default saga;
