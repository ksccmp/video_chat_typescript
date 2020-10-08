import * as React from 'react';
import { Ichat } from '../../api/interface';
import {
    StyledH4,
    StyledH5,
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
                            <StyledH5>{chat.userId}</StyledH5>
                        </StyledChatContentsHeader1>
                    )}
                    <StyledChatContentsFooter1 owner={owner}>
                        <StyledTableCell>
                            <StyledH5>{chat.contents}</StyledH5>
                        </StyledTableCell>
                    </StyledChatContentsFooter1>
                </StyledChatContentsDiv1>
            ) : (
                <StyledChatContentsDiv2>
                    <StyledH4>{chat.contents}</StyledH4>
                </StyledChatContentsDiv2>
            )}
        </>
    );
};

export default chatContents;
