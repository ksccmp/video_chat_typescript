import React, { useState, useReducer } from 'react';

const signUp = () => {
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

    type Iaction = { type: typeof setUserId; payload: string };

    const setUserId: string = 'setUserId';

    const initState: IinitState = {
        userId: '',
        userPw: '',
        userNm: '',
        userGd: '',
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

    const signUpReducer = (state: IinitState, action: Iaction) => {
        switch (action.type) {
            case setUserId: {
                return {
                    ...state,
                    userId: action.payload,
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

    return (
        <div>
            <p>SignUp 페이지입니다.</p>
            <input type="text" onChange={setUserIdAction}></input>
            {localReducer.userId}
        </div>
    );
};

export default signUp;
