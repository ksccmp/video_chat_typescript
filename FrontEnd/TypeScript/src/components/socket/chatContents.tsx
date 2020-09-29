import * as React from 'react';
import { Ichat } from '../../api/interface';
import {
    StyledH6,
    StyledTableCell,
    StyledChatContentsDiv1,
    StyledChatContentsHeader1,
    StyledChatContentsFooter1,
    StyledChatContentsDiv2,
} from '../../api/styled';

interface IchatContents {
    chat: Ichat;
    owner: boolean;
}

const chatContents = ({ chat, owner }: IchatContents) => {
    return (
        <>
            {chat.type === 'chat' ? (
                <StyledChatContentsDiv1 owner={owner}>
                    {owner ? (
                        ''
                    ) : (
                        <StyledChatContentsHeader1 owner={owner}>
                            <StyledH6>{chat.userId}</StyledH6>
                        </StyledChatContentsHeader1>
                    )}
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
