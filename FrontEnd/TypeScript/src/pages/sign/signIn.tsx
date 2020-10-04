import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSelectByUserIdAction } from '../../modules/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { StyledInput1, StyledButton1, StyledH1, StyledH4 } from '../../api/styled';

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

    const onSearch = () => {
        history.push('/user/search');
    };

    const onSignInEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSignIn();
        }
    };

    return (
        <>
            <StyledH1 style={{ marginBottom: '2rem' }}>SCVC Login</StyledH1>
            <div onKeyPress={onSignInEnter}>
                <StyledInput1 type="text" placeholder="아이디" value={userId} onChange={onUserId}></StyledInput1>
                <br />
                <StyledInput1 type="password" placeholder="비밀번호" value={userPw} onChange={onUserPw}></StyledInput1>
            </div>
            <br />
            <StyledButton1 onClick={onSignIn}>
                <StyledH4>SignIn</StyledH4>
            </StyledButton1>
            <br />
            <StyledButton1 onClick={onSignUp}>
                <StyledH4>SignUp</StyledH4>
            </StyledButton1>
            <br />
            <StyledButton1 onClick={onSearch}>
                <StyledH4>Search</StyledH4>
            </StyledButton1>
        </>
    );
};

export default withRouter(signIn);
