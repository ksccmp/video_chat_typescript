import * as React from 'react';

interface Ivideo {
    stream: MediaStream;
}

const video = ({ stream }: Ivideo) => {
    const [videoData, setVideoData] = React.useState<HTMLMediaElement | undefined>(undefined);

    React.useEffect(() => {
        if (videoData) {
            console.log('video');
            console.log(stream);
            (videoData as HTMLMediaElement).srcObject = stream;
        }
    }, [videoData]);

    return (
        <>
            <div>
                <video ref={(node: HTMLVideoElement) => setVideoData(node)} width="480px" autoPlay={true}></video>
            </div>
        </>
    );
};

export default video;
