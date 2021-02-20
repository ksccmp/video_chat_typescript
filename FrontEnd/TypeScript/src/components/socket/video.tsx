import * as React from 'react';
import { StyledVideo1, StyledVideo2 } from '../../api/styled';

interface Ivideo {
    stream: MediaStream;
    key?: number;
    type: string;
}

const video = ({ stream, type }: Ivideo) => {
    const [videoData, setVideoData] = React.useState<HTMLMediaElement | undefined>(undefined);

    React.useEffect(() => {
        if (videoData) {
            // console.log('video');
            // console.log(stream);
            (videoData as HTMLMediaElement).srcObject = stream;
        }
    }, [videoData]);

    return (
        <>
            {type === 'main' ? (
                <StyledVideo1 ref={(node: HTMLVideoElement) => setVideoData(node)} autoPlay={true}></StyledVideo1>
            ) : (
                <StyledVideo2 ref={(node: HTMLVideoElement) => setVideoData(node)} autoPlay={true}></StyledVideo2>
            )}
        </>
    );
};

export default video;
