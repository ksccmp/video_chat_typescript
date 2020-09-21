import * as React from 'react';
import styled from 'styled-components';
import { Ichat } from '../../api/interface';
import { StyledH6, StyledTableCell } from '../../api/styled';

interface IchatContents {
    chat: Ichat;
    owner: boolean;
}

interface IStyledChatContentsDiv1 {
    owner: boolean;
}

const StyledChatContentsDiv1 = styled.div`
    width: 80%;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
`;

const StyledChatContentsHeader1 = styled.header`
    clear: both;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
`;

const StyledChatContentsFooter1 = styled.footer`
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    clear: both;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
    padding: 0.2em 0.4em;
    display: table;
`;

const StyledChatContentsDiv2 = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

const chatContents = ({ chat, owner }: IchatContents) => {
    return (
        <>
            {chat.type !== 'alert' ? (
                <StyledChatContentsDiv1 owner={owner}>
                    <StyledChatContentsHeader1 owner={owner}>
                        <StyledH6>{chat.userId}</StyledH6>
                    </StyledChatContentsHeader1>
                    <StyledChatContentsFooter1 owner={owner}>
                        <StyledTableCell>
                            <StyledH6>{chat.contents}</StyledH6>
                        </StyledTableCell>
                    </StyledChatContentsFooter1>
                </StyledChatContentsDiv1>
            ) : (
                <StyledChatContentsDiv2>
                    <StyledH6>{chat.contents}</StyledH6>
                </StyledChatContentsDiv2>
            )}
        </>
    );
};

export default chatContents;
