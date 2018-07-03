import constants from '../../constants';

import {
    TOGGLE_SIDEBAR
} from '../actions/app';

const initialState = {
    showSidebar: false
};

/**
 * Assigns side-bar state to application's state store.
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = initialState, action = {}) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {
                showSidebar: !state.showSidebar
            });
        default:
            return state;
    }
}
