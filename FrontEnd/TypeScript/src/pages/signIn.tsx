import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSelectByUserIdAction } from '../modules/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Typography, Button, TextField } from '@material-ui/core';

const signIn: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState<string>('');
    const [userPw, setUserPw] = useState<string>('');

    const onUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const onUserPw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPw(e.target.value);
    };

    const onSignUp = () => {
        history.push('/user/signUp');
    };

    const onSignIn = () => {
        dispatch(userSelectByUserIdAction({ userId, userPw }));
    };

    const onSignInEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSignIn();
        }
    };

    return (
        <>
            <div>
                <Typography variant="h3">SCVC Login</Typography>
                <TextField id="standard-basic" label="아이디" onChange={onUserId} onKeyPress={onSignInEnter} required />
                <br />
                <TextField
                    id="standard-basic"
                    label="비밀번호"
                    type="password"
                    required
                    onChange={onUserPw}
                    onKeyPress={onSignInEnter}
                />
                <br /> <br />
                <Button variant="contained" color="primary" onClick={onSignIn}>
                    SignIn
                </Button>
                <Button variant="contained" color="primary" onClick={onSignUp}>
                    SignUp
                </Button>
                <Button variant="contained" color="primary">
                    Search
                </Button>
            </div>
        </>
    );
};

export default withRouter(signIn);
