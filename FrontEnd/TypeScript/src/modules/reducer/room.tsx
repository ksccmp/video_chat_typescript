import * as actions from '../actions';
import { IopenPasswordModal } from '../../api/interface';

export interface IinitRoomState {
    openRoomModal: boolean;
    openPasswordModal: IopenPasswordModal;
}

const initRoomState: IinitRoomState = {
    openRoomModal: false,
    openPasswordModal: {
        roomId: 0,
        password: '',
        open: false,
    },
};

const reducer = (state: IinitRoomState = initRoomState, action: actions.reducerAction) => {
    switch (action.type) {
        case actions.roomOpenRoomModal: {
            return {
                ...state,
                openRoomModal: (action as actions.IroomOpenRoomModalAction).payload,
            };
        }

        case actions.roomOpenPasswordModal: {
            return {
                ...state,
                openPasswordModal: (action as actions.IroomOpenPasswordModalAction).payload,
            };
        }

        case actions.roomResetOpenPasswordModal: {
            return {
                ...state,
                openPasswordModal: initRoomState.openPasswordModal,
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
