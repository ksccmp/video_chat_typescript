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
    // const [videos, setVideos] = React.useState<MediaStream[]>([]);

    const videoList: MediaStream[] = useSelector((state: reducerState) => state.socket.videoList);

    const pcConfig = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
            { urls: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' },
        ],
    };

    React.useEffect(() => {
        Close();
        dispatch(socketResetVideoListAction());
        // const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000'); // 로컬
        const connect: SocketIOClient.Socket = SocketIO.connect('https://ksccmp.iptime.org/', { secure: true }); // 배포
        setSocket(connect);

        const handleVideoOfferMsg = (msg: Ivideochat) => {
            console.log('handleVideoOfferMsg');
            const desc = new RTCSessionDescription(msg.sdp);
            // pc2.setRemoteDescription(desc)
            //     .then(() => {
            //         return pc2.createAnswer();
            //     })
            //     .then((answer) => {
            //         return pc2.setLocalDescription(answer);
            //     })
            //     .then(() => {
            //         connect.emit('videoTest', {
            //             type: 'video-answer',
            //             sdp: pc2.localDescription,
            //             roomId: match.params.roomId,
            //             userId: msg.userId,
            //         });
            //     });

            pc.setRemoteDescription(desc)
                .then(() => {
                    return pc.createAnswer();
                })
                .then((answer) => {
                    return pc.setLocalDescription(answer);
                })
                .then(() => {
                    connect.emit('videoTest', {
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
            // pc1.setRemoteDescription(desc);
            pc.setRemoteDescription(desc);
        };

        connect.on('receiveTest', (msg: Ivideochat) => {
            console.log('receiveTest');
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
            }
        });

        // const pc1negotiationneeded = () => {
        //     console.log('pc1negotiationneeded');
        //     pc1.createOffer()
        //         .then((offer) => {
        //             console.log('createOffer');
        //             console.log(offer);
        //             return pc1.setLocalDescription(offer);
        //         })
        //         .then(() => {
        //             connect.emit('videoTest', {
        //                 type: 'video-offer',
        //                 sdp: pc1.localDescription,
        //                 roomId: match.params.roomId,
        //                 userId: match.params.userId,
        //             });
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         });
        // };

        const pcnegotiationneeded = () => {
            console.log('pcnegotiationneeded');
            pc.createOffer()
                .then((offer) => {
                    console.log('createOffer');
                    console.log(offer);
                    return pc.setLocalDescription(offer);
                })
                .then(() => {
                    connect.emit('videoTest', {
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

        // const pc1icecandidate = (event: RTCPeerConnectionIceEvent) => {
        //     console.log('pc1icecandidate');
        //     console.log(event);
        //     if (event.candidate) {
        //         const candidate = new RTCIceCandidate(event.candidate);
        //         pc1.addIceCandidate(candidate).catch((e) => {
        //             console.log(e);
        //         });
        //     }
        // };

        // const pc2icecandidate = (event: RTCPeerConnectionIceEvent) => {
        //     console.log('pc2icecandidate');
        //     console.log(event);
        //     if (event.candidate) {
        //         const candidate = new RTCIceCandidate(event.candidate);
        //         pc2.addIceCandidate(candidate).catch((e) => {
        //             console.log(e);
        //         });
        //     }
        // };

        const pcicecandidate = (event: RTCPeerConnectionIceEvent) => {
            console.log('pcicecandidate');
            console.log(event);
            if (event.candidate) {
                const candidate = new RTCIceCandidate(event.candidate);
                pc.addIceCandidate(candidate).catch((e) => {
                    console.log(e);
                });
            }
        };

        // const pc2track = (event: RTCTrackEvent) => {
        //     console.log('pc2track');
        //     console.log(event.streams[0].getTracks());

        //     if (event.track.kind == 'video') {
        //         // setVideos([...videos, event.streams[0]]);
        //         dispatch(socketSetVideoListAction(event.streams[0]));
        //     }
        // };

        const pctrack = (event: RTCTrackEvent) => {
            console.log('pctrack');
            console.log(event.streams[0].getTracks());

            if (event.track.kind == 'video') {
                // setVideos([...videos, event.streams[0]]);
                dispatch(socketSetVideoListAction(event.streams[0]));
            }
        };

        // const pc1: RTCPeerConnection = new RTCPeerConnection(pcConfig);
        // const pc2: RTCPeerConnection = new RTCPeerConnection(pcConfig);
        let pc: RTCPeerConnection;

        const pcconnect = () => {
            pc = new RTCPeerConnection(pcConfig);

            pc.onicecandidate = pcicecandidate;
            pc.onnegotiationneeded = pcnegotiationneeded;
            pc.ontrack = pctrack;
        };

        // pc1.onicecandidate = pc1icecandidate;
        // pc1.onnegotiationneeded = pc1negotiationneeded;
        // pc2.onicecandidate = pc2icecandidate;
        // pc2.ontrack = pc2track;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((pcstream) => {
            pcconnect();
            dispatch(socketSetVideoListAction(pcstream));
            // setVideos([...videos, pc1stream]);
            pcstream.getTracks().forEach((track) => {
                console.log(track);
                // pc1.addTrack(track, pc1stream);
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
