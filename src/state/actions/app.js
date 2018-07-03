import api from '../../common/api';
import util from '../../common/util';

const TOGGLE_SIDEBAR = 'toggleSidebar';
import constants from '../../constants';

let appActions = function(dispatch) {

    return {
        toggleSidebar: () => {
            dispatch({type: TOGGLE_SIDEBAR});
        }
    };
};

export {
    appActions,
    TOGGLE_SIDEBAR
};
