import * as React from 'react';
import { StyledVideo1, StyledVideo2 } from '../../api/styled';

interface Ivideo {
    stream: MediaStream;
    sort: string;
    key?: number;
}

const video = ({ stream, sort }: Ivideo) => {
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
            {sort === 'main' ? (
                <StyledVideo2 ref={(node: HTMLVideoElement) => setVideoData(node)} autoPlay={true}></StyledVideo2>
            ) : (
                <StyledVideo1 ref={(node: HTMLVideoElement) => setVideoData(node)} autoPlay={true}></StyledVideo1>
            )}
        </>
    );
};

export default video;
