import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../../modules/reducer/index';
import { Iuser, Iroom, IopenPasswordModal, IuseTime, IuserInfo } from '../../api/interface';
import { userLogoutAction, roomOpenRoomModalAction } from '../../modules/actions';
import Room from '../../components/main/room';
import { RouteComponentProps } from 'react-router';
import {
    StyledInput2,
    StyledButton2,
    StyledSelect2,
    StyledOption2,
    StyledTabRadio1,
    StyledTabLabel1,
    StyledTabSubdiv1,
    StyledTabDiv1,
    StyledTabUl1,
    StyledTabLi1,
    StyledImage1,
    StyledTableCell,
    StyledH5,
} from '../../api/styled';
import RoomModal from '../../components/main/roomModal';
import PasswordModal from '../../components/main/passwordModal';
import axios from '../../api/axios';
import SocketIO from 'socket.io-client';
import { getGabDefault } from '../../api/moment';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '0.8fr 11.2fr',
    width: '100%',
    height: '100%',
};

const div2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    border: '1px solid black',
    overflow: 'hidden',
};

const aside1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
};

const section1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'grid',
    gridTemplateRows: '1fr 9fr',
    overflow: 'hidden',
};

const aside2: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
};

const profile: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'grid',
    gridTemplateRows: '3fr 7fr',
};

const profileHeader: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'grid',
    gridTemplateColumns: '4fr 6fr',
};

const profileHeaderLeft: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    textAlign: 'center',
    display: 'table',
};

const profileHeaderRight: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    textAlign: 'center',
    display: 'table',
};

const p1: React.CSSProperties = {
    margin: '0',
    display: 'table-cell',
    verticalAlign: 'middle',
};

const profileFooter: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'table',
};

const ul2: React.CSSProperties = {
    display: 'table-cell',
    verticalAlign: 'middle',
};

const li2: React.CSSProperties = {
    margin: '1em 0',
};

const div4: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    position: 'relative',
};

const ul3: React.CSSProperties = {
    listStyleType: 'none',
    padding: '0',
    margin: '0 auto',
    display: 'table',
    textAlign: 'center',
    width: '100%',
};

const li3: React.CSSProperties = {
    display: 'table-cell',
    verticalAlign: 'middle',
    overflow: 'hidden',
};

const div5: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    display: 'table',
};

const div6: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    overflow: 'hidden',
};

const div7: React.CSSProperties = {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
};

const div8: React.CSSProperties = {
    width: '90%',
    margin: 'auto',
    height: '100%',
    border: '1px solid black',
    overflow: 'auto',
};

const div9: React.CSSProperties = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'table',
};

const home: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);
    const openRoomModal: boolean = useSelector((state: reducerState) => state.room.openRoomModal);
    const openPasswordModal: IopenPasswordModal = useSelector((state: reducerState) => state.room.openPasswordModal);

    const [existRoomList, setExistRoomList] = React.useState<Iroom[]>([]);
    const [topic, setTopic] = React.useState<string>('roomId');
    const [contents, setContents] = React.useState<string>('');
    const [userInfo, setUserInfo] = React.useState<IuserInfo | undefined>(undefined);

    React.useEffect(() => {
        if (reduxUser.userId !== '') {
            const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000'); // 로컬
            // const connect: SocketIOClient.Socket = SocketIO.connect('https://ksccmp.iptime.org', { secure: true }); // 배포

            connect.emit('join page', {
                userId: reduxUser.userId,
            });

            connect.on('self message', async (msg: IuseTime) => {
                const userInfo: IuserInfo = {
                    userId: reduxUser.userId,
                    useCount: 1,
                    useTime: getGabDefault(msg.end, msg.start),
                };

                const res1 = await axios.put('/userInfo/updateTime', userInfo, {
                    headers: {
                        'jwt-user-token': localStorage.userToken,
                    },
                });

                const res2 = await axios.put(
                    '/room/updateNumber',
                    {
                        roomId: msg.roomId,
                        number: -1,
                    },
                    {
                        headers: {
                            'jwt-user-token': localStorage.userToken,
                        },
                    },
                );

                if (res1.data.data === 1 && res2.data.data === 1) {
                    userInfoSelectByUserId();
                } else {
                    alert('정보 저장 중 오류 발생');
                }
            });

            userInfoSelectByUserId();
        }
    }, [reduxUser]);

    React.useEffect(() => {
        roomSelectExist();
    }, []);

    const Logout = () => {
        dispatch(userLogoutAction());
        localStorage.removeItem('userToken');
        history.push('/user/signIn');
    };

    const onOpenRoomModal = () => {
        dispatch(roomOpenRoomModalAction(true));
    };

    const roomSelectExist = async () => {
        const res = await axios.get('/room/selectExist', {
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });

        setExistRoomList(res.data.data);
    };

    const roomSelectByTopic = async () => {
        const res = await axios.get('/room/selectByTopic', {
            params: {
                topic: topic,
                contents: contents,
            },
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });

        setExistRoomList(res.data.data);
    };

    const userInfoSelectByUserId = async () => {
        const res = await axios.get('/userInfo/selectByUserId', {
            params: {
                userId: reduxUser.userId,
            },
            headers: {
                'jwt-user-token': localStorage.userToken,
            },
        });

        if (res.data.data === null) {
            setUserInfo({
                userId: reduxUser.userId,
                useCount: 0,
                useTime: 0,
            });
        } else {
            res.data.data.useTime = Math.ceil(res.data.data.useTime / 60 / 1000);
            setUserInfo(res.data.data);
        }
    };

    const onTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTopic(e.target.value);
    };

    const onContents = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContents(e.target.value);
    };

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            roomSelectByTopic();
        }
    };

    return (
        <>
            <div style={div2}>
                <aside style={aside1}>
                    <div style={profile}>
                        <header style={profileHeader}>
                            <aside style={profileHeaderLeft}>
                                <StyledTableCell>
                                    <StyledImage1 image="data:image/jpeg;base64,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"></StyledImage1>
                                </StyledTableCell>
                            </aside>
                            <aside style={profileHeaderRight}>
                                <p style={p1}>
                                    반갑습니다! <br />
                                    {reduxUser.userNm}님 <br />
                                    <StyledButton2 onClick={Logout}>
                                        <StyledH5>Logout</StyledH5>
                                    </StyledButton2>
                                </p>
                            </aside>
                        </header>
                        <footer style={profileFooter}>
                            <ul style={ul2}>
                                <li style={li2}>사용횟수 : {userInfo ? (userInfo as IuserInfo).useCount : 0} 건</li>
                                <li style={li2}>사용시간 : {userInfo ? (userInfo as IuserInfo).useTime : 0} 분</li>
                            </ul>
                        </footer>
                    </div>
                    <StyledTabDiv1>
                        <StyledTabUl1>
                            <StyledTabLi1>
                                <StyledTabRadio1
                                    type="radio"
                                    name="tab"
                                    id="tablabel1"
                                    defaultChecked
                                ></StyledTabRadio1>
                                <StyledTabLabel1 htmlFor="tablabel1">
                                    <StyledTableCell>친구</StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>
                                    <ul>
                                        <li>aaa</li>
                                        <li>qqq</li>
                                    </ul>
                                </StyledTabSubdiv1>
                            </StyledTabLi1>
                            <StyledTabLi1>
                                <StyledTabRadio1 type="radio" name="tab" id="tablabel2"></StyledTabRadio1>
                                <StyledTabLabel1 htmlFor="tablabel2">
                                    <StyledTableCell>Tab2</StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>내용내용내용112121</StyledTabSubdiv1>
                            </StyledTabLi1>
                            <StyledTabLi1>
                                <StyledTabRadio1 type="radio" name="tab" id="tablabel3"></StyledTabRadio1>
                                <StyledTabLabel1 htmlFor="tablabel3">
                                    <StyledTableCell>Tab3</StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>헤헤헤헤헤헤 이런것도 되넹 신기하다!</StyledTabSubdiv1>
                            </StyledTabLi1>
                        </StyledTabUl1>
                    </StyledTabDiv1>
                </aside>

                <section style={section1}>
                    <div style={div5}>
                        <div style={div7}>
                            <StyledSelect2 onChange={onTopic}>
                                <StyledOption2 value="roomId">방번호</StyledOption2>
                                <StyledOption2 value="contents">방내용</StyledOption2>
                                <StyledOption2 value="createId">생성자아이디</StyledOption2>
                            </StyledSelect2>
                            <StyledInput2
                                type="text"
                                placeholder="내용"
                                onChange={onContents}
                                onKeyPress={onPressEnter}
                            ></StyledInput2>
                            <StyledButton2 onClick={roomSelectByTopic}>검색</StyledButton2>
                            <StyledButton2 onClick={onOpenRoomModal}>생성</StyledButton2>
                        </div>
                    </div>
                    <div style={div6}>
                        <div style={div8}>
                            {existRoomList.length !== 0 ? (
                                existRoomList.map((existRoom, index) => {
                                    return (
                                        <Room
                                            key={index}
                                            roomId={existRoom.roomId}
                                            createId={existRoom.createId}
                                            contents={existRoom.contents}
                                            type={existRoom.type}
                                            password={existRoom.password}
                                            max={existRoom.max}
                                            number={existRoom.number}
                                        ></Room>
                                    );
                                })
                            ) : (
                                <div>방없떠용!</div>
                            )}
                        </div>
                    </div>
                </section>

                <aside style={aside2}>
                    <div style={div9}>
                        <StyledTableCell>광고 두실 분 찾습니다.</StyledTableCell>
                    </div>
                    <div style={div9}>
                        <StyledTableCell>광고 두실 분 찾습니다.</StyledTableCell>
                    </div>
                </aside>
            </div>

            {openRoomModal ? <RoomModal></RoomModal> : ''}
            {openPasswordModal.open ? <PasswordModal></PasswordModal> : ''}
        </>
    );
};

export default home;
