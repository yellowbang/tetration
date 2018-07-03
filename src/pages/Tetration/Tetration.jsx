import React from 'react';
import PropTypes from 'prop-types';

import {Button} from 'cisco-ui-components';

import {connect} from 'react-redux';
import {appActions} from '../../state/actions/app';
import {API} from '../../state/actions/app';

import './Tetration.scss';

class Tetration extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }
    
    render() {
        const me = this;

        return (
            <div className="Evolve-page-container">
                hello
            </div>
        );
    }
}

Tetration.propTypes = {};

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, appActions)(Tetration);
