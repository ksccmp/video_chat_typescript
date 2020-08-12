import React, { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Iuser } from '../api/interface';
import { userInsertAction } from '../modules/actions';

const signUp = () => {
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

    return (
        <>
            <div>
                <TextField id="standard-basic" label="아이디" onChange={setUserIdAction} required /> <br />
                <TextField id="standard-basic" label="비밀번호" type="password" onChange={setUserPwAction} required />
                <br />
                <TextField id="standard-basic" label="이름" onChange={setUserNmAction} required /> <br />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={localReducer.userGd}
                    onChange={setUserGdAction}
                >
                    <MenuItem value="M">남자</MenuItem>
                    <MenuItem value="W">여자</MenuItem>
                </Select>
                <br />
                <TextField id="standard-basic" label="나이" type="number" onChange={setUserAgeAction} required /> <br />
                <TextField id="standard-basic" label="전화번호" onChange={setUserPhAction} required /> <br />
                <TextField id="standard-basic" label="이메일" onChange={setUserMaAction} required /> <br /> <br />
            </div>
            <Button variant="contained" color="primary" onClick={userSignUp}>
                SignUp
            </Button>
        </>
    );
};

export default signUp;
