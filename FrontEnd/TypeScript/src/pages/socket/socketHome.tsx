import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketIO from 'socket.io-client';
import { RouteComponentProps } from 'react-router';
import Video from '../../components/socket/video';
import ChatList from '../../components/socket/chatList';
import { Ivideochat, IpeerInfo, Ichat } from '../../api/interface';
import { reducerState } from '../../modules/reducer';
import {
    socketSetPeerInfoListAction,
    socketResetPeerInfoListAction,
    socketFilterPeerInfoListAction,
    socketSetPeerStreamAction,
} from '../../modules/actions';
import {
    StyledLeftOutlined,
    StyledRightOutlined,
    StyledSlideDiv1,
    StyledSlideFooter1,
    StyledSlideSubFooter1,
} from '../../api/styled';
import NoData from '../../common/noData';

interface ImatchParams {
    roomId: string;
    userId: string;
}

interface IsubFooterOpen {
    open: boolean;
    contents?: string;
}

const div1: React.CSSProperties = {
    width: '99.9%',
    height: '99.8%',
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
};

const section1: React.CSSProperties = {
    borderRight: '1px solid black',
    position: 'relative',
    width: '100%',
    height: '100%',
};

const section2: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '4fr 5fr',
    overflow: 'hidden',
};

const sectionHeader1: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    borderBottom: '1px solid black',
    overflow: 'auto',
};

const sectionFooter1: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
};

const div2: React.CSSProperties = {
    width: '47%',
    float: 'left',
    padding: '0.2em 0.2em 0px 0.2em',
};

const div3: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
};

const socketMain: React.FC<RouteComponentProps<ImatchParams>> = ({ match }) => {
    const dispatch = useDispatch();

    const [socket, setSocket] = React.useState<SocketIOClient.Socket | undefined>(undefined);
    const [localStream, setLocalStream] = React.useState<MediaStream | undefined>(undefined);
    const [videoStream, setVideoStream] = React.useState<MediaStream | undefined>(undefined);
    const [subFooterOpen, setSubFooterOpen] = React.useState<IsubFooterOpen>({
        open: false,
        contents: 'Me',
    });
    const [slideShow, setSlideShow] = React.useState<number>(0);
    const maxSlideShow: number = 2;

    const peerInfoList: IpeerInfo[] = useSelector((state: reducerState) => state.socket.peerInfoList);
    let localPeerInfoList: IpeerInfo[] = [];

    const iceServer = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
            { urls: 'turn:192.168.0.122:5349', username: 'sctest', credential: 'sctest' },
        ],
    };

    React.useEffect(() => {
        Close();
        dispatch(socketResetPeerInfoListAction());
        // const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000'); // 로컬
        const connect: SocketIOClient.Socket = SocketIO.connect('https://ksccmp.iptime.org', { secure: true }); // 배포
        setSocket(connect);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            console.log('userMedia');
            setLocalStream(stream);

            const removeStream: MediaStream = stream.clone();
            removeStream.getAudioTracks().forEach((track) => {
                removeStream.removeTrack(track);
            });
            setVideoStream(removeStream);

            console.log(stream);
            console.log(removeStream);
        });
    }, []);

    React.useEffect(() => {
        if (socket && localStream) {
            socket.on('connect video', (msg: Ichat) => {
                if (match.params.userId !== msg.userId) {
                    getPeerEnv(msg.userId, socket);

                    const message: Ivideochat = {
                        type: 'return',
                        roomId: msg.roomId,
                        senderId: match.params.userId,
                        receiverId: msg.userId,
                    };

                    socket.emit('send video', message);
                }
            });

            socket.on('receive video', (msg: Ivideochat) => {
                console.log(`${msg.senderId}, receive video`);
                console.log(msg);
                console.log(localPeerInfoList);
                if (msg.receiverId === match.params.userId) {
                    const peerInfo: IpeerInfo | undefined = localPeerInfoList.find(
                        (peerInfo) => peerInfo.userId === msg.senderId,
                    );
                    console.log(peerInfo);

                    if (msg.type === 'video-offer') {
                        handleVideoOfferMsg(msg, (peerInfo as IpeerInfo).peer);
                    } else if (msg.type === 'video-answer') {
                        handleVideoAnswerMsg(msg, (peerInfo as IpeerInfo).peer);
                    } else if (msg.type === 'candidate') {
                        const candidate: RTCIceCandidate = new RTCIceCandidate({
                            sdpMLineIndex: msg.label,
                            candidate: msg.candidate,
                        });
                        (peerInfo as IpeerInfo).peer.addIceCandidate(candidate);
                    } else if (msg.type === 'return') {
                        getPeerEnv(msg.senderId, socket);
                    }
                } else if (msg.type === 'disconnect') {
                    console.log('disconnect');
                    dispatch(socketFilterPeerInfoListAction(msg.senderId));
                    localPeerInfoList = localPeerInfoList.filter(
                        (localPeerInfo) => localPeerInfo.userId !== msg.senderId,
                    );
                    console.log(localPeerInfoList);
                }
            });
        }
    }, [socket, localStream]);

    // React.useEffect(() => {
    //     console.log('start');

    //     if (peerInfoList) {
    //         peerInfoList.map((peerInfo) => {
    //             if (!peerInfo.video) {
    //                 (localStream as MediaStream).getTracks().forEach((track) => {
    //                     console.log(`${match.params.userId}, addTrack`);
    //                     peerInfo.peer.addTrack(track, localStream as MediaStream);
    //                 });
    //             }
    //         });
    //     }
    // }, [peerInfoList]);

    const getPeerEnv = (receiverId: string, connect: SocketIOClient.Socket) => {
        const negotiationneeded = () => {
            console.log(`${match.params.userId}, negotiationeeded`);
            peer.createOffer()
                .then((offer) => {
                    return peer.setLocalDescription(offer);
                })
                .then(() => {
                    const message: Ivideochat = {
                        type: 'video-offer',
                        sdp: peer.localDescription as RTCSessionDescription,
                        roomId: match.params.roomId,
                        senderId: match.params.userId,
                        receiverId: receiverId,
                    };
                    connect.emit('send video', message);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const icecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                console.log(`${match.params.userId}, iceCandidate`);
                const message: Ivideochat = {
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    roomId: match.params.roomId,
                    senderId: match.params.userId,
                    receiverId: receiverId,
                };

                connect.emit('send video', message);
            }
        };

        const track = (event: RTCTrackEvent) => {
            if (event.track.kind === 'video') {
                console.log(`${match.params.userId}, onTrack`);

                dispatch(
                    socketSetPeerStreamAction({
                        userId: receiverId,
                        peer: peer,
                        video: event.streams[0],
                    }),
                );
            }
        };

        const peer: RTCPeerConnection = new RTCPeerConnection(iceServer);
        const peerInfo: IpeerInfo = {
            userId: receiverId,
            peer: peer,
        };

        console.log('push start');

        peer.onnegotiationneeded = negotiationneeded;
        peer.onicecandidate = icecandidate;
        peer.ontrack = track;

        // dispatch(socketSetPeerInfoListAction(peerInfo));
        localPeerInfoList.push(peerInfo);

        console.log('push end');
        console.log(localStream);

        (localStream as MediaStream).getTracks().forEach((track) => {
            console.log(`${match.params.userId}, addTrack`);
            peerInfo.peer.addTrack(track, localStream as MediaStream);
        });
    };

    const handleVideoOfferMsg = (msg: Ivideochat, peer: RTCPeerConnection) => {
        const desc = new RTCSessionDescription(msg.sdp);

        peer.setRemoteDescription(desc)
            .then(() => {
                return peer.createAnswer();
            })
            .then((answer) => {
                return peer.setLocalDescription(answer);
            })
            .then(() => {
                const message: Ivideochat = {
                    type: 'video-answer',
                    sdp: peer.localDescription as RTCSessionDescription,
                    roomId: match.params.roomId,
                    senderId: match.params.userId,
                    receiverId: msg.senderId,
                };
                (socket as SocketIOClient.Socket).emit('send video', message);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleVideoAnswerMsg = (msg: Ivideochat, peer: RTCPeerConnection) => {
        const desc = new RTCSessionDescription(msg.sdp);
        peer.setRemoteDescription(desc);
    };

    React.useEffect(() => {
        console.log('peerInfoList');
        console.log(peerInfoList);
    }, [peerInfoList]);

    // const pc: RTCPeerConnection = new RTCPeerConnection({
    //     iceServers: [
    //         {
    //             urls: 'stun:stun.l.google.com:19302',
    //         },
    //         // { urls: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' },
    //         { urls: 'turn:192.168.0.122:5349', username: 'sctest', credential: 'sctest' },
    //     ],
    // });

    // React.useEffect(() => {
    //     Close();
    //     dispatch(socketResetVideoListAction());
    //     // const connect: SocketIOClient.Socket = SocketIO.connect('http://localhost:4000'); // 로컬
    //     const connect: SocketIOClient.Socket = SocketIO.connect('https://ksccmp.iptime.org', { secure: true }); // 배포
    //     setSocket(connect);

    //     const handleVideoOfferMsg = (msg: Ivideochat) => {
    //         remoteStreamInfo.push({
    //             id: msg.streamId as string,
    //             userId: msg.senderId,
    //         });
    //         console.log('handleVideoOfferMsg');
    //         console.log(msg.sdp);
    //         const desc = new RTCSessionDescription(msg.sdp);
    //         console.log(desc);

    //         pc.setRemoteDescription(desc)
    //             .then(() => {
    //                 return pc.createAnswer();
    //             })
    //             .then((answer) => {
    //                 return pc.setLocalDescription(answer);
    //             })
    //             .then(() => {
    //                 const message: Ivideochat = {
    //                     type: 'video-answer',
    //                     sdp: pc.localDescription as RTCSessionDescription,
    //                     roomId: match.params.roomId,
    //                     hostId: msg.hostId,
    //                     senderId: match.params.userId,
    //                     streamId: streamInfo.id,
    //                 };
    //                 connect.emit('send video', message);
    //             })
    //             .catch((e) => {
    //                 console.log(e);
    //             });
    //     };

    //     const handleVideoAnswerMsg = (msg: Ivideochat) => {
    //         remoteStreamInfo.push({
    //             id: msg.streamId as string,
    //             userId: msg.senderId,
    //         });
    //         console.log('test');
    //         console.log(msg.sdp);
    //         const desc = new RTCSessionDescription(msg.sdp);
    //         pc.setRemoteDescription(desc);
    //     };

    //     connect.on('receive video', (msg: Ivideochat) => {
    //         console.log('receive video');
    //         console.log(msg);
    //         console.log(connect.id);
    //         if (msg.type === 'video-offer') {
    //             if (msg.hostId !== match.params.userId) {
    //                 handleVideoOfferMsg(msg);
    //             }
    //         } else if (msg.type === 'video-answer') {
    //             if (msg.hostId === match.params.userId) {
    //                 handleVideoAnswerMsg(msg);
    //             }
    //         } else if (msg.type === 'candidate') {
    //             const candidate: RTCIceCandidate = new RTCIceCandidate({
    //                 sdpMLineIndex: msg.label,
    //                 candidate: msg.candidate,
    //             });
    //             pc.addIceCandidate(candidate);
    //         } else if (msg.type === 'disconnect') {
    //             dispatch(socketFilterVideoListAction(msg.hostId));
    //         }
    //     });

    //     const pcnegotiationneeded = () => {
    //         console.log('pcnegotiationneeded');
    //         pc.createOffer()
    //             .then((offer) => {
    //                 console.log('createOffer');
    //                 console.log(offer);
    //                 return pc.setLocalDescription(offer);
    //             })
    //             .then(() => {
    //                 const message: Ivideochat = {
    //                     type: 'video-offer',
    //                     sdp: pc.localDescription as RTCSessionDescription,
    //                     roomId: match.params.roomId,
    //                     hostId: match.params.userId,
    //                     senderId: match.params.userId,
    //                     streamId: streamInfo.id,
    //                 };
    //                 connect.emit('send video', message);
    //             })
    //             .catch((e) => {
    //                 console.log(e);
    //             });
    //     };

    //     const pcicecandidate = (event: RTCPeerConnectionIceEvent) => {
    //         console.log('pcicecandidate');
    //         console.log(event);
    //         if (event.candidate) {
    //             const message: Ivideochat = {
    //                 type: 'candidate',
    //                 label: event.candidate.sdpMLineIndex,
    //                 id: event.candidate.sdpMid,
    //                 candidate: event.candidate.candidate,
    //                 roomId: match.params.roomId,
    //                 hostId: match.params.userId,
    //                 senderId: match.params.userId,
    //             };
    //             connect.emit('send video', message);
    //         }
    //     };

    //     const pctrack = (event: RTCTrackEvent) => {
    //         console.log('pctrack');
    //         const streamUser: IstreamInfo | undefined = remoteStreamInfo.find(
    //             (info) => info.id === event.streams[0].id,
    //         );
    //         console.log(event);
    //         console.log(event.streams[0]);

    //         if (event.track.kind === 'video') {
    //             dispatch(
    //                 socketSetVideoListAction({
    //                     userId: (streamUser as IstreamInfo).userId as string,
    //                     video: event.streams[0],
    //                 }),
    //             );
    //         }
    //     };

    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((pcstream) => {
    //         pc.onicecandidate = pcicecandidate;
    //         pc.onnegotiationneeded = pcnegotiationneeded;
    //         pc.ontrack = pctrack;
    //         streamInfo.id = pcstream.id;
    //         console.log(pcstream);

    //         pcstream.getTracks().forEach((track) => {
    //             console.log(track);
    //             pc.addTrack(track, pcstream);
    //         });

    //         pcstream.getAudioTracks().forEach((track) => {
    //             pcstream.removeTrack(track);
    //         });

    //         setLocalStream(pcstream);
    //         dispatch(socketSetVideoListAction({ userId: match.params.userId, video: pcstream }));
    //     });
    // }, []);

    const Close = () => {
        const sc: SocketIOClient.Socket = socket as SocketIOClient.Socket;
        if (sc) {
            sc.disconnect();
        }
    };

    const getSlideShowContents = (index: number): string => {
        if (index == 0) {
            return 'Me';
        } else {
            return 'Other';
        }
    };

    const onSubFooterOpenRight = () => {
        setSubFooterOpen({
            open: true,
            contents: getSlideShowContents((slideShow + 1) % maxSlideShow),
        });
        setSlideShow((slideShow + 1) % maxSlideShow);
    };

    const onSubFooterOpenLeft = () => {
        setSubFooterOpen({
            open: true,
            contents: getSlideShowContents((slideShow - 1 + maxSlideShow) % maxSlideShow),
        });
        setSlideShow((slideShow - 1 + maxSlideShow) % maxSlideShow);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setSubFooterOpen({
                open: false,
            });
        }, [2000]);
        return () => clearTimeout(timer);
    }, [subFooterOpen]);

    return (
        <>
            <div style={div1}>
                <section style={section1}>
                    <StyledSlideDiv1 open={slideShow === 0 ? true : false}>
                        {videoStream ? <Video stream={videoStream} type="main"></Video> : ''}
                    </StyledSlideDiv1>
                    <StyledSlideDiv1 open={slideShow === 1 ? true : false}>
                        <NoData />
                    </StyledSlideDiv1>
                    <StyledSlideFooter1>
                        <StyledLeftOutlined onClick={onSubFooterOpenLeft} />
                        <StyledSlideSubFooter1 open={subFooterOpen.open}>
                            {subFooterOpen.contents}
                        </StyledSlideSubFooter1>
                        <StyledRightOutlined onClick={onSubFooterOpenRight} />
                    </StyledSlideFooter1>
                </section>
                <section style={section2}>
                    <header style={sectionHeader1}>
                        {peerInfoList
                            ? peerInfoList.map((peer, index) => (
                                  <div style={div2}>
                                        <Video stream={peer.video as MediaStream} type="sub" key={index} />
                                  </div>
                              ))
                            : ''}
                    </header>
                    <footer style={sectionFooter1}>
                        {socket && videoStream ? (
                            <ChatList
                                socket={socket as SocketIOClient.Socket}
                                roomId={match.params.roomId}
                                userId={match.params.userId}
                            ></ChatList>
                        ) : (
                            ''
                        )}
                    </footer>
                </section>
            </div>
        </>
    );
};

export default socketMain;
