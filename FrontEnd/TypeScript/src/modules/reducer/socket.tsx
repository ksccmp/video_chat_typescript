import * as actions from '../actions';
import { Ichat, Ivideo } from '../../api/interface';

export interface IinitSocketState {
    chatList: Ichat[];
    videoList: Ivideo[];
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
            let newVideoList: Ivideo[] = state.videoList.slice();
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

        case actions.socketFilterVideoList: {
            return {
                ...state,
                videoList: state.videoList.filter(
                    (video) => video.userId !== (action as actions.IsocketFilterVideoListAction).payload,
                ),
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
