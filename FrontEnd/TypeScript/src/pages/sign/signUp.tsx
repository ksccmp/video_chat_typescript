import React, { useReducer } from 'react';
import { StyledButton1, StyledInput2, StyledSelect1, StyledOption1, StyledH4 } from '../../api/styled';
import { useDispatch } from 'react-redux';
import { Iuser } from '../../api/interface';
import { userInsertAction } from '../../modules/actions';
import { RouteComponentProps, withRouter } from 'react-router';

const signUp: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    interface IinitState {
        userId: string;
        userPw: string;
        userNm: string;
        userGd: string;
        userAge: number;
        userPh: string;
        userMa: string;
        rgstTm: string;
        updtTm: string;
    }

    type Iaction =
        | { type: typeof setUserId; payload: string }
        | { type: typeof setUserPw; payload: string }
        | { type: typeof setUserNm; payload: string }
        | { type: typeof setUserGd; payload: string }
        | { type: typeof setUserAge; payload: number }
        | { type: typeof setUserPh; payload: string }
        | { type: typeof setUserMa; payload: string };

    const setUserId: string = 'setUserId';
    const setUserPw: string = 'setUserPw';
    const setUserNm: string = 'setUserNm';
    const setUserGd: string = 'setUserGd';
    const setUserAge: string = 'setUserAge';
    const setUserPh: string = 'setUserPh';
    const setUserMa: string = 'setUserMa';

    const initState: IinitState = {
        userId: '',
        userPw: '',
        userNm: '',
        userGd: 'M',
        userAge: 0,
        userPh: '',
        userMa: '',
        rgstTm: '',
        updtTm: '',
    };

    const setUserIdAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserId,
            payload: e.target.value,
        });
    };

    const setUserPwAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserPw,
            payload: e.target.value,
        });
    };

    const setUserNmAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserNm,
            payload: e.target.value,
        });
    };

    const setUserGdAction = (
        e: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>,
    ) => {
        dispatchSignUp({
            type: setUserGd,
            payload: e.target.value as string,
        });
    };

    const setUserAgeAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserAge,
            payload: e.target.value,
        });
    };

    const setUserPhAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserPh,
            payload: e.target.value,
        });
    };

    const setUserMaAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignUp({
            type: setUserMa,
            payload: e.target.value,
        });
    };

    const signUpReducer = (state: IinitState, action: Iaction) => {
        switch (action.type) {
            case setUserId: {
                return {
                    ...state,
                    userId: action.payload as string,
                };
            }

            case setUserPw: {
                return {
                    ...state,
                    userPw: action.payload as string,
                };
            }

            case setUserNm: {
                return {
                    ...state,
                    userNm: action.payload as string,
                };
            }

            case setUserGd: {
                return {
                    ...state,
                    userGd: action.payload as string,
                };
            }

            case setUserAge: {
                return {
                    ...state,
                    userAge: action.payload as number,
                };
            }

            case setUserPh: {
                return {
                    ...state,
                    userPh: action.payload as string,
                };
            }

            case setUserMa: {
                return {
                    ...state,
                    userMa: action.payload as string,
                };
            }

            default: {
                return {
                    ...state,
                };
            }
        }
    };

    const [localReducer, dispatchSignUp] = useReducer(signUpReducer, initState);

    const userSignUp = () => {
        const user: Iuser = {
            userId: localReducer.userId,
            userPw: localReducer.userPw,
            userNm: localReducer.userNm,
            userGd: localReducer.userGd,
            userAge: localReducer.userAge,
            userPh: localReducer.userPh,
            userMa: localReducer.userMa,
            rgstTm: '',
            updtTm: '',
        };
        dispatch(userInsertAction(user));
    };

    const Back = () => {
        history.push('/user/signIn');
    };

    return (
        <>
            <StyledInput2 type="text" placeholder="아이디" onChange={setUserIdAction}></StyledInput2> <br />
            <StyledInput2 type="password" placeholder="비밀번호" onChange={setUserPwAction}></StyledInput2> <br />
            <StyledInput2 type="text" placeholder="이름" onChange={setUserNmAction}></StyledInput2> <br />
            <StyledSelect1 onChange={setUserGdAction}>
                <StyledOption1 value="M">남자</StyledOption1>
                <StyledOption1 value="W">여자</StyledOption1>
            </StyledSelect1>
            <br />
            <StyledInput2 type="number" placeholder="나이" onChange={setUserAgeAction}></StyledInput2>
            <br />
            <StyledInput2 type="text" placeholder="전화번호" onChange={setUserPhAction}></StyledInput2>
            <br />
            <StyledInput2 type="number" placeholder="이메일" onChange={setUserMaAction}></StyledInput2>
            <br />
            <StyledButton1 onClick={userSignUp}>
                <StyledH4>SignUp</StyledH4>
            </StyledButton1>
            <br />
            <StyledButton1 onClick={Back}>
                <StyledH4>Back</StyledH4>
            </StyledButton1>
        </>
    );
};

export default withRouter(signUp);
