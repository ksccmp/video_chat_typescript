import * as React from 'react';
import { socketSetChatListAction, socketResetChatListAction } from '../../modules/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import { Ichat } from '../../api/interface';
import { reducerState } from '../../modules/reducer';

interface IchatList {
    socket: SocketIOClient.Socket;
    roomId: string;
    userId: string;
}

const chatList = ({ socket, roomId, userId }: IchatList) => {
    const dispatch = useDispatch();

    const [text, setText] = React.useState<string>('');
    const reduxChatList: Ichat[] = useSelector((state: reducerState) => state.socket.chatList);

    React.useEffect(() => {
        dispatch(socketResetChatListAction());

        socket.emit('join room', {
            roomId: roomId,
            userId: userId,
            type: 'alert',
            contents: `${userId}님이 입장하셨습니다`,
            rgstTm: '2020/08/23',
        });

        socket.on('receive message', (msg: Ichat) => {
            console.log(msg);
            dispatch(socketSetChatListAction(msg));
        });
    }, []);

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

export default chatList;
