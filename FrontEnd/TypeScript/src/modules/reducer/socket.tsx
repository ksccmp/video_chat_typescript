import * as actions from '../actions';
import { Ichat } from '../../api/interface';

export interface IinitSocketState {
    chatList: Ichat[];
    videoList: MediaStream[];
}

const initSocketState: IinitSocketState = {
    chatList: [],
    videoList: [],
};

const reducer = (state: IinitSocketState = initSocketState, action: actions.reducerAction) => {
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

        case actions.socketSetVideoList: {
            let newVideoList: MediaStream[] = state.videoList.slice();
            newVideoList.push((action as actions.IsocketSetVideoListAction).payload);
            return {
                ...state,
                videoList: newVideoList,
            };
        }

        case actions.socketResetVideoList: {
            return {
                ...state,
                videoList: initSocketState.videoList,
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
