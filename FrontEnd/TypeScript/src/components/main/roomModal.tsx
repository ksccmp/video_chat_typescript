import * as React from 'react';
import {
    StyledModalDiv1,
    StyledRoomModalDiv1,
    StyledInput4,
    StyledH2,
    StyledRadio1,
    StyledLabel1,
    StyledButton3,
    StyledH4,
    StyledH5,
} from '../../api/styled';
import { Iroom, Iuser, IopenAlertModal } from '../../api/interface';
import { useDispatch, useSelector } from 'react-redux';
import { roomInsertAction, roomOpenRoomModalAction, commonOpenAlertModalAction } from '../../modules/actions';
import { reducerState } from '../../modules/reducer';
import { getMax } from '../../api/constant';

const table1: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
};

const div1: React.CSSProperties = {
    width: '100%',
    display: 'flex',
};

const roomModal = () => {
    const dispatch = useDispatch();

    const user: Iuser = useSelector((state: reducerState) => state.user.user);

    const [useMax, setUseMax] = React.useState<boolean>(false);
    const [usePassword, setUsePassword] = React.useState<boolean>(false);

    const onUsePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsePassword(e.target.checked);
    };

    const onUseMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseMax(e.target.checked);
    };

    interface IinitState {
        contents: string;
        type: string;
        max: number;
        password: string;
    }

    type Iaction =
        | { type: typeof setContents; payload: string }
        | { type: typeof setType; payload: string }
        | { type: typeof setMax; payload: number }
        | { type: typeof setPassword; payload: string };

    const setContents: string = 'setContents';
    const setType: string = 'setType';
    const setMax: string = 'setMax';
    const setPassword: string = 'setPassword';
    const setReset: string = 'setReset';

    const initState: IinitState = {
        contents: '',
        type: '자유',
        max: 2,
        password: '',
    };

    const setContentsAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchRoomModal({
            type: setContents,
            payload: e.target.value,
        });
    };

    const setTypeAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchRoomModal({
            type: setType,
            payload: e.target.value,
        });
    };

    const setMaxAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchRoomModal({
            type: setMax,
            payload: e.target.value,
        });
    };

    const setPasswordAction = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchRoomModal({
            type: setPassword,
            payload: e.target.value,
        });
    };

    const roomModalReducer = (state: IinitState, action: Iaction) => {
        switch (action.type) {
            case setContents: {
                return {
                    ...state,
                    contents: action.payload as string,
                };
            }

            case setType: {
                return {
                    ...state,
                    type: action.payload as string,
                };
            }

            case setMax: {
                return {
                    ...state,
                    max: (action.payload as number) >= 2 ? (action.payload as number) : 2,
                };
            }

            case setPassword: {
                return {
                    ...state,
                    password: action.payload as string,
                };
            }

            default: {
                return {
                    ...state,
                };
            }
        }
    };

    const [localReducer, dispatchRoomModal] = React.useReducer(roomModalReducer, initState);

    const createRoom = () => {
        const room: Iroom = {
            roomId: 0,
            createId: user.userId,
            contents: localReducer.contents,
            password: usePassword ? localReducer.password : '',
            type: localReducer.type,
            max: useMax ? localReducer.max : getMax(),
            number: 1,
        };

        if (room.contents === '' || room.type === '' || room.max < 2) {
            const openAlertModal: IopenAlertModal = {
                contents: '정보를 확인해주세요',
                open: true,
            };

            dispatch(commonOpenAlertModalAction(openAlertModal));
        } else {
            dispatch(roomInsertAction(room));
        }
    };

    const cancleCreateRoom = () => {
        dispatch(roomOpenRoomModalAction(false));
    };

    return (
        <StyledModalDiv1>
            <StyledRoomModalDiv1>
                <StyledH2 style={{ marginBottom: '1rem', marginTop: '1rem' }}>방 생성</StyledH2>
                <table style={table1}>
                    <tbody>
                        <tr>
                            <td>
                                <StyledH4>내용</StyledH4>
                            </td>
                            <td></td>
                            <td>
                                <StyledInput4 type="text" onChange={setContentsAction}></StyledInput4>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <StyledH4>타입</StyledH4>
                            </td>
                            <td></td>
                            <td>
                                <div style={div1}>
                                    <StyledRadio1
                                        type="radio"
                                        name="type"
                                        id="radio1"
                                        value="자유"
                                        onChange={setTypeAction}
                                        defaultChecked
                                    ></StyledRadio1>
                                    <StyledLabel1 htmlFor="radio1">
                                        <StyledH5>자유</StyledH5>
                                    </StyledLabel1>
                                    <StyledRadio1
                                        type="radio"
                                        name="type"
                                        id="radio2"
                                        value="회의"
                                        onChange={setTypeAction}
                                    ></StyledRadio1>
                                    <StyledLabel1 htmlFor="radio2">
                                        <StyledH5>회의</StyledH5>
                                    </StyledLabel1>
                                    <StyledRadio1
                                        type="radio"
                                        name="type"
                                        id="radio3"
                                        value="스터디"
                                        onChange={setTypeAction}
                                    ></StyledRadio1>
                                    <StyledLabel1 htmlFor="radio3">
                                        <StyledH5>스터디</StyledH5>
                                    </StyledLabel1>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <StyledH4>최대인원</StyledH4>
                            </td>
                            <td>
                                <input type="checkbox" checked={useMax} onChange={onUseMax}></input>
                            </td>
                            <td>
                                <StyledInput4
                                    type="number"
                                    value={useMax ? localReducer.max : ''}
                                    min="2"
                                    onChange={setMaxAction}
                                    disabled={useMax ? false : true}
                                ></StyledInput4>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <StyledH4>비밀번호</StyledH4>
                            </td>
                            <td>
                                <input type="checkbox" checked={usePassword} onChange={onUsePassword}></input>
                            </td>
                            <td>
                                <StyledInput4
                                    type="password"
                                    value={usePassword ? localReducer.password : ''}
                                    disabled={usePassword ? false : true}
                                    onChange={setPasswordAction}
                                ></StyledInput4>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <StyledButton3 onClick={createRoom}>
                    <StyledH4>생성</StyledH4>
                </StyledButton3>
                <StyledButton3 onClick={cancleCreateRoom}>
                    <StyledH4>취소</StyledH4>
                </StyledButton3>
            </StyledRoomModalDiv1>
        </StyledModalDiv1>
    );
};

export default roomModal;
