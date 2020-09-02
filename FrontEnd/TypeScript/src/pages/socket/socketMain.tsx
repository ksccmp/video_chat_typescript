import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketIO from 'socket.io-client';
import { RouteComponentProps } from 'react-router';
import Video from '../../components/socket/video';
import ChatList from '../../components/socket/chatList';
import { Ivideochat } from '../../api/interface';
import { reducerState } from '../../modules/reducer';
import { socketResetVideoListAction, socketSetVideoListAction } from '../../modules/actions';

interface ImatchParams {
    roomId: string;
    userId: string;
}

const socketMain: React.FC<RouteComponentProps<ImatchParams>> = ({ match }) => {
    const dispatch = useDispatch();

    const [socket, setSocket] = React.useState<SocketIOClient.Socket | undefined>(undefined);

    const videoList: MediaStream[] = useSelector((state: reducerState) => state.socket.videoList);

    const pc: RTCPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
            { urls: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' },
        ],
    });

    React.useEffect(() => {
        Close();
        dispatch(socketResetVideoListAction());
        // const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000'); // 로컬
        const connect: SocketIOClient.Socket = SocketIO.connect('https://ksccmp.iptime.org/', { secure: true }); // 배포
        setSocket(connect);

        const handleVideoOfferMsg = (msg: Ivideochat) => {
            console.log('handleVideoOfferMsg');
            const desc = new RTCSessionDescription(msg.sdp);

            pc.setRemoteDescription(desc)
                .then(() => {
                    return pc.createAnswer();
                })
                .then((answer) => {
                    return pc.setLocalDescription(answer);
                })
                .then(() => {
                    connect.emit('send video', {
                        type: 'video-answer',
                        sdp: pc.localDescription,
                        roomId: match.params.roomId,
                        userId: msg.userId,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const handleVideoAnswerMsg = (msg: Ivideochat) => {
            console.log('test');
            console.log(msg.sdp);
            const desc = new RTCSessionDescription(msg.sdp);
            pc.setRemoteDescription(desc);
        };

        connect.on('receive video', (msg: Ivideochat) => {
            console.log('receive video');
            console.log(msg);
            console.log(connect.id);
            if (msg.type === 'video-offer') {
                if (msg.userId !== match.params.userId) {
                    handleVideoOfferMsg(msg);
                }
            } else if (msg.type === 'video-answer') {
                if (msg.userId === match.params.userId) {
                    handleVideoAnswerMsg(msg);
                }
            } else if (msg.type === 'candidate') {
                const candidate: RTCIceCandidate = new RTCIceCandidate({
                    sdpMLineIndex: msg.label,
                    candidate: msg.candidate,
                });
                pc.addIceCandidate(candidate);
            }
        });

        const pcnegotiationneeded = () => {
            console.log('pcnegotiationneeded');
            pc.createOffer()
                .then((offer) => {
                    console.log('createOffer');
                    console.log(offer);
                    return pc.setLocalDescription(offer);
                })
                .then(() => {
                    connect.emit('send video', {
                        type: 'video-offer',
                        sdp: pc.localDescription,
                        roomId: match.params.roomId,
                        userId: match.params.userId,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const pcicecandidate = (event: RTCPeerConnectionIceEvent) => {
            console.log('pcicecandidate');
            console.log(event);
            if (event.candidate) {
                connect.emit('send video', {
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    roomId: match.params.roomId,
                    userId: match.params.userId,
                });
            }
        };

        const pctrack = (event: RTCTrackEvent) => {
            console.log('pctrack');
            console.log(event.streams[0].getTracks());

            if (event.track.kind == 'video') {
                dispatch(socketSetVideoListAction(event.streams[0]));
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((pcstream) => {
            pc.onicecandidate = pcicecandidate;
            pc.onnegotiationneeded = pcnegotiationneeded;
            pc.ontrack = pctrack;
            dispatch(socketSetVideoListAction(pcstream));
            pcstream.getTracks().forEach((track) => {
                console.log(track);
                pc.addTrack(track, pcstream);
            });
        });
    }, []);

    const Close = () => {
        const sc: SocketIOClient.Socket = socket as SocketIOClient.Socket;
        if (sc) {
            sc.disconnect();
        }
    };

    return (
        <>
            {socket ? (
                <ChatList
                    socket={socket as SocketIOClient.Socket}
                    roomId={match.params.roomId}
                    userId={match.params.userId}
                ></ChatList>
            ) : (
                ''
            )}

            <div>{videoList ? videoList.map((video, index) => <Video stream={video} key={index} />) : ''}</div>
        </>
    );
};

export default socketMain;
