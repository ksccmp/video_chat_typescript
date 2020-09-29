import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../../modules/reducer/index';
import { Iuser, Iroom, IopenPasswordModal } from '../../api/interface';
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
import axios from '../../api/axios';
import { roomOpenPasswordModalAction } from '../../modules/actions';

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

const span2: React.CSSProperties = {
    color: 'blue',
};

const styledh4_1: React.CSSProperties = {
    marginLeft: '0.5rem',
};

const styledh4_2: React.CSSProperties = {
    float: 'right',
    marginRight: '0.5rem',
};

const styledh6_1: React.CSSProperties = {
    marginLeft: '0.5rem',
};

const div1: React.CSSProperties = {
    display: 'table',
    borderBottom: '1px solid black',
    width: '100%',
    height: '100%',
};

const room = ({ roomId, createId, contents, type, password, max, number }: Iroom) => {
    const dispatch = useDispatch();

    const reduxUser: Iuser = useSelector((state: reducerState) => state.user.user);

    const Open = async () => {
        if (reduxUser.userId != '' && reduxUser.userId.length > 0) {
            const openPasswordModal: IopenPasswordModal = {
                roomId: roomId,
                password: password,
                open: true,
            };

            dispatch(roomOpenPasswordModalAction(openPasswordModal));
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
                        <StyledH4 style={styledh4_2}>
                            <span style={span2}>
                                {type} ({number}/{max})
                            </span>
                        </StyledH4>
                    </StyledTableCell>
                </header>
                <StyledH6 style={styledh6_1}>{contents}</StyledH6>
            </StyledCardArticle1>
            <StyledCardFooter1>
                <StyledCardFooterDiv1>{password !== '' ? <StyledKey></StyledKey> : ''}</StyledCardFooterDiv1>
            </StyledCardFooter1>
        </StyledCardDiv1>
    );
};

export default room;
