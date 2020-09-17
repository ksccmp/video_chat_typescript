import * as React from 'react';
import { useSelector } from 'react-redux';
import { reducerState } from '../../modules/reducer/index';
import { Iuser } from '../../api/interface';
import {
    StyledCardDiv1,
    StyledCardHeader1,
    StyledCardArticle1,
    StyledCardFooter1,
    StyledCardFooterDiv1,
    StyledH4,
    StyledH6,
    StyledTableCell,
    StyledHeaderChange1,
    StyledKey,
} from '../../api/styled';

interface Iroom {
    roomId: string;
    createId: string;
    contents: string;
}

const label1: React.CSSProperties = {
    right: '1em',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
};

const span1: React.CSSProperties = {
    color: 'red',
    marginRight: '0.5em',
};

const styledh4_1: React.CSSProperties = {
    marginLeft: '0.5em',
};

const styledh6_1: React.CSSProperties = {
    marginLeft: '0.5em',
};

const div1: React.CSSProperties = {
    display: 'table',
    borderBottom: '1px solid black',
    width: '100%',
    height: '100%',
};

const room = ({ roomId, createId, contents }: Iroom) => {
    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const Open = () => {
        if (reduxUser.userId != '' && reduxUser.userId.length > 0) {
            window.open(`../socket/chat/${roomId}/${reduxUser.userId}`, 'windowName', 'toolbar=no, menubar=no');
        }
    };

    return (
        <StyledCardDiv1 onClick={Open}>
            <StyledCardHeader1 image="https://www.sisajournal.com/news/photo/201909/190944_95563_5753.jpg">
                <StyledHeaderChange1></StyledHeaderChange1>
            </StyledCardHeader1>
            <StyledCardArticle1>
                <header style={div1}>
                    <StyledTableCell>
                        <StyledH4 style={styledh4_1}>
                            <span style={span1}>{roomId}</span> {createId}
                        </StyledH4>
                    </StyledTableCell>
                </header>
                <StyledH6 style={styledh6_1}>{contents}</StyledH6>
            </StyledCardArticle1>
            <StyledCardFooter1>
                <StyledCardFooterDiv1>
                    <StyledKey></StyledKey>
                </StyledCardFooterDiv1>
            </StyledCardFooter1>
        </StyledCardDiv1>
    );
};

export default room;
