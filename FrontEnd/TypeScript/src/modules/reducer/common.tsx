import * as actions from '../actions';
import { IopenAlertModal } from '../../api/interface';

export interface IinitCommonState {
    openAlertModal: IopenAlertModal;
}

const initCommonState: IinitCommonState = {
    openAlertModal: {
        contents: '',
        open: false,
    },
};

const reducer = (state: IinitCommonState = initCommonState, action: actions.reducerAction) => {
    switch (action.type) {
        case actions.commonOpenAlertModal: {
            return {
                ...state,
                openAlertModal: (action as actions.IcommonOpenAlertModalAction).payload,
            };
        }

        case actions.commonResetOpenAlertModal: {
            return {
                ...state,
                openAlertModal: initCommonState.openAlertModal,
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
