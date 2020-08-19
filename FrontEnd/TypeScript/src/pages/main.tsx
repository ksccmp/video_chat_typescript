import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../modules/reducer/index';
import { Iuser } from '../api/interface';
import { userLogoutAction } from '../modules/actions';
import { Typography, Button } from '@material-ui/core';
import Room from '../components/socket/room';
import { RouteComponentProps } from 'react-router';

const main: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const Logout = () => {
        dispatch(userLogoutAction());
        localStorage.removeItem('userToken');
        history.push('/user/signIn');
    };

    return (
        <>
            <div>
                <Typography variant="h5">{reduxUser.userNm}님 안녕하세요. Main Page 입니다~</Typography> <br />
                <Button variant="contained" color="primary" onClick={Logout}>
                    Logout
                </Button>
            </div>
            <div>
                <Room roomId="1" createId="KSC1" contents="첫 번째 개설 방입니다." />
                <Room roomId="2" createId="KSC2" contents="두 번째 개설 방입니다." />
            </div>
        </>
    );
};

export default main;
