import { all } from 'redux-saga/effects';
import user from './user';

function* rootSaga() {
    yield all([...user]);
}

export default rootSaga;
