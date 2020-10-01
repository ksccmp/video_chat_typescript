import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSelectByUserIdAction } from '../modules/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { StyledInput1, StyledButton1 } from '../api/styled';

const maindiv: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '1fr 2fr 1fr',
    height: '100%',
};

const div1: React.CSSProperties = {
    backgroundColor: '#ece5da',
    display: 'table',
    height: '100%',
    width: '100%',
};

const div2: React.CSSProperties = {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
};

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
            <div style={maindiv}>
                <header></header>

                <div style={div1}>
                    <div style={div2}>
                        <h1>SCVC Login</h1>
                        <StyledInput1
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={onUserId}
                            onKeyPress={onSignInEnter}
                        ></StyledInput1>
                        <br />
                        <StyledInput1
                            type="password"
                            placeholder="비밀번호"
                            value={userPw}
                            onChange={onUserPw}
                            onKeyPress={onSignInEnter}
                        ></StyledInput1>
                        <br /> <br />
                        <StyledButton1 onClick={onSignIn}>SignIn</StyledButton1> <br />
                        <StyledButton1 onClick={onSignUp}>SignUp</StyledButton1> <br />
                        <StyledButton1>Search</StyledButton1>
                    </div>
                </div>

                <footer></footer>
            </div>
        </>
    );
};

export default withRouter(signIn);
