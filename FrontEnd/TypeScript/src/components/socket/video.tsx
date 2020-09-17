import * as React from 'react';
import { StyledVideo1 } from '../../api/styled';

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
            <StyledVideo1 ref={(node: HTMLVideoElement) => setVideoData(node)} autoPlay={true}></StyledVideo1>
        </>
    );
};

export default video;
