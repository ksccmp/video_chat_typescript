import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../../modules/reducer/index';
import { Iuser, Iroom, IopenPasswordModal, IuseTime, IuserInfo, IopenAlertModal } from '../../api/interface';
import { userLogoutAction, roomOpenRoomModalAction, commonOpenAlertModalAction } from '../../modules/actions';
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
    StyledH4,
    StyledH3,
} from '../../api/styled';
import RoomModal from '../../components/main/roomModal';
import PasswordModal from '../../components/main/passwordModal';
import axios from '../../api/axios';
import SocketIO from 'socket.io-client';
import { getGabDefault } from '../../api/moment';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import NoData from '../../common/noData';
import NoImage from '../../assets/img/noImage.png';

const div2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    overflow: 'hidden',
};

const aside1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRight: '1px solid black',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
};

const section1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRight: '1px solid black',
    display: 'grid',
    gridTemplateRows: '1fr 9fr',
    overflow: 'hidden',
};

const aside2: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
};

const profile: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '3fr 7fr',
};

const profileHeader: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid black',
    display: 'grid',
    gridTemplateColumns: '4fr 6fr',
};

const profileHeaderLeft: React.CSSProperties = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'table',
};

const profileHeaderRight: React.CSSProperties = {
    width: '100%',
    height: '100%',
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
    borderBottom: '1px solid black',
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
    display: 'table',
};

const div6: React.CSSProperties = {
    width: '100%',
    height: '100%',
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
    overflow: 'auto',
};

const div9: React.CSSProperties = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderBottom: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const div10: React.CSSProperties = {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
                    const openAlertModal: IopenAlertModal = {
                        contents: '정보 저장 중 오류 발생',
                        open: true,
                    };

                    dispatch(commonOpenAlertModalAction(openAlertModal));
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
                                    <StyledImage1 image={NoImage}></StyledImage1>
                                </StyledTableCell>
                            </aside>
                            <aside style={profileHeaderRight}>
                                <p style={p1}>
                                    <StyledH3>반갑습니다!</StyledH3> <br />
                                    <StyledH3>{reduxUser.userNm}님</StyledH3> <br />
                                    <StyledButton2 onClick={Logout}>
                                        <StyledH4>Logout</StyledH4>
                                    </StyledButton2>
                                </p>
                            </aside>
                        </header>
                        <footer style={profileFooter}>
                            <ul style={ul2}>
                                <li style={li2}>
                                    <StyledH4>사용횟수 : {userInfo ? (userInfo as IuserInfo).useCount : 0} 건</StyledH4>
                                </li>
                                <li style={li2}>
                                    <StyledH4>사용시간 : {userInfo ? (userInfo as IuserInfo).useTime : 0} 분</StyledH4>
                                </li>
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
                                    <StyledTableCell>
                                        <TeamOutlined />
                                        <StyledH4>친구</StyledH4>
                                    </StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>
                                    <ul style={{ padding: '0' }}>
                                        <li style={{ listStyleType: 'none', textAlign: 'initial' }}>
                                            <UserOutlined style={{ color: 'red', marginRight: '1rem' }} />
                                            <StyledH5>aaa</StyledH5>
                                        </li>
                                        <li style={{ listStyleType: 'none', textAlign: 'initial' }}>
                                            <UserOutlined style={{ color: 'blue', marginRight: '1rem' }} />
                                            <StyledH5>qqq</StyledH5>
                                        </li>
                                    </ul>
                                </StyledTabSubdiv1>
                            </StyledTabLi1>
                            <StyledTabLi1>
                                <StyledTabRadio1 type="radio" name="tab" id="tablabel2"></StyledTabRadio1>
                                <StyledTabLabel1 htmlFor="tablabel2">
                                    <StyledTableCell>
                                        <StyledH4>Tab2</StyledH4>
                                    </StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>
                                    <NoData />
                                </StyledTabSubdiv1>
                            </StyledTabLi1>
                            <StyledTabLi1>
                                <StyledTabRadio1 type="radio" name="tab" id="tablabel3"></StyledTabRadio1>
                                <StyledTabLabel1 htmlFor="tablabel3">
                                    <StyledTableCell>
                                        <StyledH4>Tab3</StyledH4>
                                    </StyledTableCell>
                                </StyledTabLabel1>
                                <StyledTabSubdiv1>
                                    <NoData />
                                </StyledTabSubdiv1>
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
                            <StyledButton2 onClick={roomSelectByTopic}>
                                <StyledH4>검색</StyledH4>
                            </StyledButton2>
                            <StyledButton2 onClick={onOpenRoomModal}>
                                <StyledH4>생성</StyledH4>
                            </StyledButton2>
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
                                <NoData />
                            )}
                        </div>
                    </div>
                </section>

                <aside style={aside2}>
                    <div style={div9}>
                        <StyledH3>광고 두실 분 찾습니다.</StyledH3>
                    </div>
                    <div style={div10}>
                        <StyledH3>광고 두실 분 찾습니다.</StyledH3>
                    </div>
                </aside>
            </div>

            {openRoomModal ? <RoomModal /> : ''}
            {openPasswordModal.open ? <PasswordModal /> : ''}
        </>
    );
};

export default home;
