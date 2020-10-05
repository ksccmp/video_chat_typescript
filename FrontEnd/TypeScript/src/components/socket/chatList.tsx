import * as React from 'react';
import { socketSetChatListAction, socketResetChatListAction } from '../../modules/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Ichat, Iuser } from '../../api/interface';
import { reducerState } from '../../modules/reducer';
import { StyledInput3, StyledTableCell, StyledRightCircleTwoTone } from '../../api/styled';
import ChatContents from './chatContents';

interface IchatList {
    socket: SocketIOClient.Socket;
    roomId: string;
    userId: string;
}

const div1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '9fr 1fr',
};

const header1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
};

const footer1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '8.3fr 1.2fr',
};

const div2: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'table',
    textAlign: 'center',
};

const div3: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'table',
};

const chatList = ({ socket, roomId, userId }: IchatList) => {
    const dispatch = useDispatch();

    const [text, setText] = React.useState<string>('');
    const reduxChatList: Ichat[] = useSelector((state: reducerState) => state.socket.chatList);
    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    React.useEffect(() => {
        dispatch(socketResetChatListAction());

        socket.emit('join room', {
            roomId: roomId,
            userId: userId,
            type: 'connect',
            contents: `${userId}님이 입장하셨습니다`,
        });

        socket.on('receive message', (msg: Ichat) => {
            console.log(msg);
            dispatch(socketSetChatListAction(msg));
        });
    }, []);

    React.useEffect(() => {
        const header1: HTMLDivElement = document.getElementById('header1') as HTMLDivElement;
        header1.scrollTop = header1.scrollHeight;
    }, [reduxChatList]);

    const Send = () => {
        if (text.length > 0) {
            socket.emit('send message', {
                roomId: roomId,
                userId: userId,
                type: 'chat',
                contents: text,
                rgstTm: '2020/08/07',
            });
            setText('');
        }
    };

    const EnterSend = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            Send();
        }
    };

    const onText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <>
            <div style={div1}>
                <header style={header1} id="header1">
                    {reduxChatList.map((chat, index) => (
                        <ChatContents
                            chat={chat}
                            key={index}
                            owner={reduxUser.userId === chat.userId ? true : false}
                        ></ChatContents>
                    ))}
                </header>
                <footer style={footer1}>
                    <div style={div2}>
                        <StyledTableCell>
                            <StyledInput3
                                type="text"
                                placeholder="내용을 입력해주세요"
                                onChange={onText}
                                onKeyPress={EnterSend}
                                value={text}
                            ></StyledInput3>
                        </StyledTableCell>
                    </div>
                    <div style={div3}>
                        <StyledTableCell>
                            <StyledRightCircleTwoTone onClick={Send}></StyledRightCircleTwoTone>
                        </StyledTableCell>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default chatList;
