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
    StyledLockTwoTone,
} from '../../api/styled';
import { roomOpenPasswordModalAction } from '../../modules/actions';
import Conference from '../../assets/img/conference.png';
import Free from '../../assets/img/free.png';
import Study from '../../assets/img/study.png';
import { getMax } from '../../api/constant';

const span1: React.CSSProperties = {
    color: '#61b3cb',
    marginRight: '0.5em',
};

const styledh4_1: React.CSSProperties = {
    marginLeft: '0.5rem',
};

const styledh4_2: React.CSSProperties = {
    float: 'right',
    marginRight: '0.5rem',
    color: '#61b3cb',
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

    const getImage = (type: string): string => {
        if (type === '자유') {
            return Free;
        } else if (type === '회의') {
            return Conference;
        } else {
            return Study;
        }
    };

    return (
        <StyledCardDiv1 onClick={Open}>
            <StyledCardHeader1 image={getImage(type)}>
                <StyledHeaderChange1></StyledHeaderChange1>
            </StyledCardHeader1>
            <StyledCardArticle1>
                <header style={div1}>
                    <StyledTableCell>
                        <StyledH4 style={styledh4_1}>
                            <span style={span1}>{roomId}</span>
                            {createId}
                        </StyledH4>
                        <StyledH4 style={styledh4_2}>
                            {type} ({number}/{max == getMax() ? '∞' : max})
                        </StyledH4>
                    </StyledTableCell>
                </header>
                <StyledH6 style={styledh6_1}>{contents}</StyledH6>
            </StyledCardArticle1>
            <StyledCardFooter1>
                <StyledCardFooterDiv1>
                    {password !== '' ? <StyledLockTwoTone></StyledLockTwoTone> : ''}
                </StyledCardFooterDiv1>
            </StyledCardFooter1>
        </StyledCardDiv1>
    );
};

export default room;
