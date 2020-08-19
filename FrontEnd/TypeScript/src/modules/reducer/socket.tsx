import * as actions from '../actions';
import { Ichat } from '../../api/interface';

export interface IinitSocketState {
    chatList: Ichat[];
}

const initSocketState: IinitSocketState = {
    chatList: [],
};

const reducer = (state = initSocketState, action: actions.reducerAction) => {
    switch (action.type) {
        case actions.socketSetChatList: {
            let newChatList: Ichat[] = state.chatList.slice();
            newChatList.push((action as actions.IsocketSetChatList).payload);
            return {
                ...state,
                chatList: newChatList,
            };
        }

        case actions.socketResetChatList: {
            return {
                ...state,
                chatList: initSocketState.chatList,
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
};

export default reducer;
