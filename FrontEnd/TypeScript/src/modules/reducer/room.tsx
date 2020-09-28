import * as actions from '../actions';

export interface IinitRoomState {
    openRoomModal: boolean;
}

const initRoomState: IinitRoomState = {
    openRoomModal: false,
};

const reducer = (state: IinitRoomState, action: actions.reducerAction) => {
    switch (action.type) {
        case actions.roomOpenRoomModal: {
            return {
                openRoomModal: (action as actions.IroomOpenRoomModalAction).payload,
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
