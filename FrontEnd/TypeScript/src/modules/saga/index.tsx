import { all } from 'redux-saga/effects';
import user from './user';
import room from './room';

function* rootSaga() {
    yield all([...user, ...room]);
}

export default rootSaga;
