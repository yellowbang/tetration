import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import noop from 'lodash/noop';
import {connect} from 'react-redux';
import {appActions} from './state/actions/app';
import {Button, Loader} from 'cisco-ui-components';

import Wizard from './components/Wizard';
import Tetration from './pages/Tetration/Tetration.jsx';
import {PATHS} from './config/route-config';
import SIDEBAR_ITEMS from './config/sidebar-config';
import {Sidebar} from 'cisco-ui-components';
import Header from './components/Header';

import './App.scss';
import util from './common/util';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            logined: false,
            isLoading: this.props.isLoading
        };
    }

    getComponent(value) {
        let element = null;
        switch (value) {
            case PATHS.Tetration:
                element = <Tetration/>;
                break;
            default:
                break;
        }
        return (() => {
            return element;
        });
    }

    componentWillMount() {
        this.routes = Object.values(PATHS).map((path, index) => (
            <Route key={`${index}`} path={path} exact={false} render={this.getComponent(path)}/>
        ));
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: nextProps.isLoading
        });
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    render() {
        const me = this;

        return (
            <Router>
                {
                    <div className="app-container">
                        <Sidebar title={'Tetration'} items={SIDEBAR_ITEMS} locked={this.props.showSidebar}
                            clickHandler={noop}/>
                        <div className="content-container">
                            <Header toggleSidebar={this.props.toggleSidebar}/>
                            {this.routes}
                        </div>
                        {
                            this.state.isLoading ?
                                <Wizard skipHeader={true}>
                                    <Loader/>
                                </Wizard>
                                :
                                null
                        }
                    </div>
                }
            </Router>
        );
    }
}

App.propTypes = {
    toggleSidebar: PropTypes.func,
    isLoading: PropTypes.bool,
    showSidebar: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.app.isLoading,
    showSidebar: state.app.showSidebar
});

export default connect(mapStateToProps, appActions)(App);
