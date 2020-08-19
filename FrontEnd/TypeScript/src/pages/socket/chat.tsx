import * as React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Ichat, Iuser } from '../../api/interface';
import { reducerState } from '../../modules/reducer';
import { socketResetChatListAction, socketSetChatListAction } from '../../modules/actions';
import SocketIO from 'socket.io-client';
import { RouteComponentProps } from 'react-router';

interface ImatchParams {
    roomId: string;
    userId: string;
}

const chat: React.FC<RouteComponentProps<ImatchParams>> = ({ match }) => {
    const dispatch = useDispatch();

    const [text, setText] = React.useState<string>('');
    const [socket, setSocket] = React.useState<SocketIOClient.Socket | undefined>(undefined);

    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);
    const reduxChatList: Ichat[] = useSelector((state: reducerState) => state.socket.chatList);

    React.useEffect(() => {
        Close();
        dispatch(socketResetChatListAction());
        const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000');
        connect.id = match.params.userId;
        console.log(connect);
        setSocket(connect);

        connect.emit('join room', {
            roomId: match.params.roomId,
            userId: match.params.userId,
            type: 'alert',
            contents: `${match.params.userId}님이 입장하셨습니다`,
            rgstTm: '2020/08/07',
        });

        connect.on('receive message', (msg: Ichat) => {
            console.log(msg);
            dispatch(socketSetChatListAction(msg));
        });
    }, []);

    const Close = () => {
        const sc: SocketIOClient.Socket = socket as SocketIOClient.Socket;
        if (sc) {
            sc.disconnect();
        }
    };

    const Send = () => {
        if (text.length > 0) {
            const sc: SocketIOClient.Socket = socket as SocketIOClient.Socket;
            sc.emit('send message', {
                roomId: match.params.roomId,
                userId: reduxUser.userId,
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
            <div>
                <TextField
                    id="standard-basic"
                    label="대화"
                    value={text}
                    onChange={onText}
                    onKeyPress={EnterSend}
                    required
                />
                <Button variant="contained" color="secondary" onClick={Send}>
                    Send
                </Button>
                {reduxChatList.map((chat, index) => (
                    <Typography variant="h5" key={index}>
                        {chat.type === 'alert' ? chat.contents : chat.userId + ' : ' + chat.contents}
                    </Typography>
                ))}
            </div>
        </>
    );
};

export default chat;
