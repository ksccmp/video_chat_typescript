import * as actions from '../actions';
import { Ichat, IpeerInfo } from '../../api/interface';

export interface IinitSocketState {
    chatList: Ichat[];
    peerInfoList: IpeerInfo[];
}

const initSocketState: IinitSocketState = {
    chatList: [],
    peerInfoList: [],
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

        case actions.socketSetPeerInfoList: {
            let newPeerInfoList: IpeerInfo[] = state.peerInfoList.slice();
            newPeerInfoList.push((action as actions.IsocketSetPeerInfoListAction).payload);
            return {
                ...state,
                peerInfoList: newPeerInfoList,
            };
        }

        case actions.socketResetPeerInfoList: {
            return {
                ...state,
                peerInfoList: initSocketState.peerInfoList,
            };
        }

        case actions.socketFilterPeerInfoList: {
            let newPeerInfoList: IpeerInfo[] = state.peerInfoList.filter(
                (peerInfo) => peerInfo.userId !== (action as actions.IsocketFilterPeerInfoListAction).payload,
            );

            console.log(`target: ${(action as actions.IsocketFilterPeerInfoListAction).payload}`);
            console.log(newPeerInfoList);
            return {
                ...state,
                peerInfoList: newPeerInfoList,
            };
        }

        case actions.socketSetPeerStream: {
            let newPeerInfoList: IpeerInfo[] = state.peerInfoList.filter(
                (peerInfo) => peerInfo.userId !== (action as actions.IsocketSetPeerStreamAction).payload.userId,
            );
            newPeerInfoList.push((action as actions.IsocketSetPeerInfoListAction).payload);
            return {
                ...state,
                peerInfoList: newPeerInfoList,
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
