import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    StyledModalDiv1,
    StyledPasswordModalDiv1,
    StyledH2,
    StyledInput5,
    StyledButton4,
    StyledH4,
} from '../../api/styled';
import { roomResetOpenPasswordModalAction, commonOpenAlertModalAction } from '../../modules/actions';
import axios from '../../api/axios';
import { IopenPasswordModal, Iroom, Iuser, IopenAlertModal } from '../../api/interface';
import { reducerState } from '../../modules/reducer';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    width: '100%',
    height: '100%',
};

const div2: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    textAlign: 'center',
};

const div3: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0.3rem',
};

const passwordModal = () => {
    const dispatch = useDispatch();

    const openPasswordModal: IopenPasswordModal = useSelector((state: reducerState) => state.room.openPasswordModal);
    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const [inputPassword, setInputPassword] = React.useState<string>('');

    React.useEffect(() => {
        if (openPasswordModal.password === '') {
            openSocketHome();
        }
    }, []);

    const onInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    };

    const cancleOpenRoom = () => {
        dispatch(roomResetOpenPasswordModalAction());
    };

    const openRoom = async () => {
        if (openPasswordModal.password === inputPassword) {
            openSocketHome();
        } else {
            const openAlertModal: IopenAlertModal = {
                contents: '비밀번호가 틀렸습니다.',
                open: true,
            };

            dispatch(commonOpenAlertModalAction(openAlertModal));
        }
    };

    const openSocketHome = async () => {
        cancleOpenRoom();

        const res = await axios.get('/room/selectByRoomId', {
            params: {
                roomId: openPasswordModal.roomId,
            },
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });

        const room: Iroom = res.data.data;
        const possibleNumber: number = room.max - room.number;

        if (possibleNumber > 0) {
            const res = await axios.put(
                '/room/updateNumber',
                {
                    roomId: room.roomId,
                    number: 1,
                },
                {
                    headers: {
                        'jwt-user-token': localStorage.userToken,
                    },
                },
            );

            if (res.data.data === 1) {
                window.open(
                    `../socket/chat/${openPasswordModal.roomId}/${reduxUser.userId}`,
                    'windowName',
                    'toolbar=no, menubar=no',
                );
            }
        } else {
            const openAlertModal: IopenAlertModal = {
                contents: '방이 꽉찼습니다. 다른 방을 이용해주세요.',
                open: true,
            };

            dispatch(commonOpenAlertModalAction(openAlertModal));
        }
    };

    return (
        <>
            <StyledModalDiv1>
                <StyledPasswordModalDiv1>
                    <div style={div1}>
                        <div style={div3}>
                            <StyledH2>비밀번호 입력</StyledH2>
                        </div>
                        <div style={div2}>
                            <div style={div3}>
                                <StyledInput5 type="password" onChange={onInputPassword}></StyledInput5>
                            </div>
                            <div style={div3}>
                                <StyledButton4 onClick={openRoom}>
                                    <StyledH4>확인</StyledH4>
                                </StyledButton4>
                                <StyledButton4 onClick={cancleOpenRoom}>
                                    <StyledH4>취소</StyledH4>
                                </StyledButton4>
                            </div>
                        </div>
                    </div>
                </StyledPasswordModalDiv1>
            </StyledModalDiv1>
        </>
    );
};

export default passwordModal;
