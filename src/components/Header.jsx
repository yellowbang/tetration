/* eslint-disable space-before-function-paren,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/components.scss';
import {Icon, IconButton} from 'cisco-ui-components';

import 'react-contexify/dist/ReactContexify.min.css';

class Header extends React.Component {

    constructor (props, context) {
        super(props, context);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }

    render () {
        return (
            <div className="header-container">
                <div className="header-left">
                    <IconButton
                        size={IconButton.SIZE.SMALL}
                        icon={IconButton.ICON.LIST_MENU}
                        type={IconButton.TYPE.DEFAULT}
                        onClick={this.props.toggleSidebar}
                    />
                    <a className="header-bar__logo">
                        <Icon type={Icon.TYPE.CISCO}/>
                    </a>
                    <h4>Tetration</h4>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    toggleSidebar: PropTypes.func,
    data: PropTypes.object
};

Header.defaultProps = {
    data: {}
};

export default Header;
