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

        // const handleVideoOfferMsg = (msg: Ivideochat) => {
        //     console.log('handleVideoOfferMsg');
        //     const desc = new RTCSessionDescription(msg.sdp);
        //     pc2.setRemoteDescription(desc)
        //         .then(() => {
        //             return pc2.createAnswer();
        //         })
        //         .then((answer) => {
        //             return pc2.setLocalDescription(answer);
        //         })
        //         .then(() => {
        //             connect.emit('videoTest', {
        //                 type: 'video-answer',
        //                 sdp: pc2.localDescription,
        //                 roomId: match.params.roomId,
        //                 userId: msg.userId,
        //             });
        //         });

        //     // pc.setRemoteDescription(desc)
        //     //     .then(() => {
        //     //         return pc.createAnswer();
        //     //     })
        //     //     .then((answer) => {
        //     //         return pc.setLocalDescription(answer);
        //     //     })
        //     //     .then(() => {
        //     //         connect.emit('videoTest', {
        //     //             type: 'video-answer',
        //     //             sdp: pc.localDescription,
        //     //             roomId: match.params.roomId,
        //     //             userId: msg.userId,
        //     //         });
        //     //     })
        //     //     .catch((e) => {
        //     //         console.log(e);
        //     //     });
        // };

        // const handleVideoAnswerMsg = (msg: Ivideochat) => {
        //     console.log('test');
        //     console.log(msg.sdp);
        //     const desc = new RTCSessionDescription(msg.sdp);
        //     pc1.setRemoteDescription(desc);
        //     // pc.setRemoteDescription(desc);
        // };

        // connect.on('receiveTest', (msg: Ivideochat) => {
        //     console.log('receiveTest');
        //     console.log(msg);
        //     console.log(connect.id);
        //     if (msg.type === 'video-offer') {
        //         // if (msg.userId !== match.params.userId) {
        //         handleVideoOfferMsg(msg);
        //         // }
        //     } else if (msg.type === 'video-answer') {
        //         // if (msg.userId === match.params.userId) {
        //         handleVideoAnswerMsg(msg);
        //         // }
        //     }
        // });

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

        // // const pcnegotiationneeded = () => {
        // //     console.log('pcnegotiationneeded');
        // //     pc.createOffer()
        // //         .then((offer) => {
        // //             console.log('createOffer');
        // //             console.log(offer);
        // //             return pc.setLocalDescription(offer);
        // //         })
        // //         .then(() => {
        // //             connect.emit('videoTest', {
        // //                 type: 'video-offer',
        // //                 sdp: pc.localDescription,
        // //                 roomId: match.params.roomId,
        // //                 userId: match.params.userId,
        // //             });
        // //         })
        // //         .catch((e) => {
        // //             console.log(e);
        // //         });
        // // };

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

        // // const pcicecandidate = (event: RTCPeerConnectionIceEvent) => {
        // //     console.log('pcicecandidate');
        // //     console.log(event);
        // //     if (event.candidate) {
        // //         const candidate = new RTCIceCandidate(event.candidate);
        // //         pc.addIceCandidate(candidate).catch((e) => {
        // //             console.log(e);
        // //         });
        // //     }
        // // };

        // const pc2track = (event: RTCTrackEvent) => {
        //     console.log('pc2track');
        //     console.log(event.streams[0].getTracks());

        //     if (event.track.kind == 'video') {
        //         // setVideos([...videos, event.streams[0]]);
        //         dispatch(socketSetVideoListAction(event.streams[0]));
        //     }
        // };

        // // const pctrack = (event: RTCTrackEvent) => {
        // //     console.log('pctrack');
        // //     console.log(event.streams[0].getTracks());

        // //     if (event.track.kind == 'video') {
        // //         // setVideos([...videos, event.streams[0]]);
        // //         dispatch(socketSetVideoListAction(event.streams[0]));
        // //     }
        // // };

        // const pc1: RTCPeerConnection = new RTCPeerConnection(pcConfig);
        // const pc2: RTCPeerConnection = new RTCPeerConnection(pcConfig);
        // // let pc: RTCPeerConnection;

        // // const pcconnect = () => {
        // //     pc = new RTCPeerConnection(pcConfig);

        // //     pc.onicecandidate = pcicecandidate;
        // //     pc.onnegotiationneeded = pcnegotiationneeded;
        // //     pc.ontrack = pctrack;
        // // };

        // pc1.onicecandidate = pc1icecandidate;
        // pc1.onnegotiationneeded = pc1negotiationneeded;
        // pc2.onicecandidate = pc2icecandidate;
        // pc2.ontrack = pc2track;

        // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((pcstream) => {
        //     // pcconnect();
        //     dispatch(socketSetVideoListAction(pcstream));
        //     // setVideos([...videos, pc1stream]);
        //     pcstream.getTracks().forEach((track) => {
        //         console.log(track);
        //         // pc1.addTrack(track, pc1stream);
        //         pc1.addTrack(track, pcstream);
        //     });
        // });
        interface Imessage {
            type: string;
            label?: number | null;
            id?: string | null;
            candidate?: string;
            description?: RTCSessionDescriptionInit;
            roomId: string;
        }

        let isChannelReady: boolean = true;
        let isInitiator: boolean = match.params.userId === 'aaa' ? true : false;
        let isStarted: boolean = false;
        let localStream: MediaStream;
        let remoteStream: MediaStream;
        let pc: RTCPeerConnection;

        const doAnswer = () => {
            console.log('Sending Answer to peer');
            pc.createAnswer().then((sessionDescription) => {
                pc.setLocalDescription(sessionDescription);
                console.log(`setLocalAndSendMessage sending message, ${sessionDescription}`);
                sendMessage({
                    type: 'answer',
                    description: sessionDescription,
                    roomId: match.params.roomId,
                });
            });
        };

        connect.on('message', (message: Imessage) => {
            console.log(`Client received message, `);
            console.log(message);
            if (message.type === 'got user media') {
                maybeStart();
            } else if (message.type === 'offer') {
                if (!isInitiator && !isStarted) {
                    maybeStart();
                }
                pc.setRemoteDescription(new RTCSessionDescription(message.description));
                doAnswer();
            } else if (message.type === 'answer' && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message.description));
            } else if (message.type === 'candidate' && isStarted) {
                let candidate: RTCIceCandidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate,
                });
                pc.addIceCandidate(candidate);
            }
        });

        const sendMessage = (message: Imessage) => {
            console.log(`Client sending message,`);
            console.log(message);
            connect.emit('messageServer', message);
        };

        const doCall = () => {
            console.log('Sending offer to peer');
            pc.createOffer().then((sessionDescription) => {
                pc.setLocalDescription(sessionDescription);
                console.log(`setLocalAndSendMessage sending message, ${sessionDescription}`);
                sendMessage({
                    type: 'offer',
                    description: sessionDescription,
                    roomId: match.params.roomId,
                });
            });
        };

        const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
            console.log(`icecandidate event, `);
            console.log(event);
            if (event.candidate) {
                sendMessage({
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    roomId: match.params.roomId,
                });
            } else {
                console.log('End of candidates');
            }
        };

        const handleRemoteStreamAdded = (event: RTCTrackEvent) => {
            console.log('Remote stream added');
            console.log(event);
            remoteStream = event.streams[0];
            dispatch(socketSetVideoListAction(remoteStream));
        };

        const handleRemoteStreamRemoved = (event: RTCRtpSender) => {
            console.log(`Remote stream removed,`);
            console.log(event);
        };

        const createPeerConnection = () => {
            try {
                pc = new RTCPeerConnection(pcConfig);
                pc.onicecandidate = handleIceCandidate;
                pc.ontrack = handleRemoteStreamAdded;
                pc.removeTrack = handleRemoteStreamRemoved;
                console.log('Created RTCPeerConnection');
            } catch (e) {
                alert(`createPeerConnection error: ${e}`);
                return;
            }
        };

        const maybeStart = () => {
            console.log(`maybeStart, ${isStarted}, ${localStream}, ${isChannelReady}`);
            if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
                console.log('creating peer connection');
                createPeerConnection();
                localStream.getTracks().forEach((track) => {
                    console.log(track);
                    pc.addTrack(track, localStream);
                });
                isStarted = true;
                console.log(`isInitiator, ${isInitiator}`);
                if (isInitiator) {
                    doCall();
                }
            }
        };

        const gotStream = (stream: MediaStream) => {
            console.log('Adding local stream');
            localStream = stream;
            dispatch(socketSetVideoListAction(stream));
            sendMessage({
                type: 'got user media',
                roomId: match.params.roomId,
            });
            if (isInitiator) {
                maybeStart();
            }
        };

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then(gotStream)
            .catch((e) => {
                alert(e);
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
