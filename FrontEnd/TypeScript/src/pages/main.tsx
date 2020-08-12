import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../modules/reducer/index';
import { Iuser } from '../api/interface';
import { userLogoutAction } from '../modules/actions';
import { Typography, Button } from '@material-ui/core';

const main = () => {
    const dispatch = useDispatch();

    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const Logout = () => {
        dispatch(userLogoutAction());
        localStorage.removeItem('userToken');
    };
    return (
        <>
            <div>
                <Typography variant="h5">{reduxUser.userNm}님 안녕하세요. Main Page 입니다~</Typography> <br />
                <Button variant="contained" color="primary" onClick={Logout}>
                    Logout
                </Button>
            </div>
        </>
    );
};

export default main;
