/* eslint-disable space-before-function-paren,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/components.scss';
import {Icon} from 'cisco-ui-components';

class Wizard extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            wizardClassName: 'wizard',
            wizardContainerClassName: 'wizard-container',
            wizardHeaderContainerClassName: 'wizard-header-container',
            wizardContentContainerClassName: 'wizard-content-container',
            wizardFooterContainerClassName: 'wizard-footer-container'
        };

        if (this.props.fullScreen) {
            this.state.wizardContainerClassName = this.state.wizardContainerClassName + ' full';
            this.state.wizardHeaderContainerClassName = this.state.wizardHeaderContainerClassName + ' full';
        }

        if (this.props.wizardClassName) {
            this.state.wizardClassName = this.state.wizardClassName + ' ' + this.props.wizardClassName;
        }

        if (this.props.wizardContainerClassName) {
            this.state.wizardContainerClassName = this.state.wizardContainerClassName + ' ' + this.props.wizardContainerClassName;
        }

        if (this.props.wizardHeaderContainerClassName) {
            this.state.wizardHeaderContainerClassName = this.state.wizardHeaderContainerClassName + ' ' + this.props.wizardHeaderContainerClassName;
        }

        if (this.props.wizardContentContainerClassName) {
            this.state.wizardContentContainerClassName = this.state.wizardContentContainerClassName + ' ' + this.props.wizardContentContainerClassName;
        }

        if (this.props.wizardFooterContainerClassName) {
            this.state.wizardFooterContainerClassName = this.state.wizardFooterContainerClassName + ' ' + this.props.wizardFooterContainerClassName;
        }
    }

    render() {
        let footerButtons = [];
        let hasFooter = this.props.buttons && this.props.buttons.length > 0;
        if (this.props.buttons && this.props.buttons.length > 0) {
            this.props.buttons.forEach(function(button, i) {
                if (i !== 0) {
                    footerButtons.push(<div className="empty-space" key={i + 'empty-space'}/>);
                }
                footerButtons.push(button);
            });
        }
        return (

            <div className={this.state.wizardClassName}>
                <div className={this.state.wizardContainerClassName}>
                    {
                        this.props.skipHeader ?
                            null
                            :
                            <div className={this.state.wizardHeaderContainerClassName}>
                                <div className="popup-page-header-left">
                                    <h5>{this.props.title}</h5>
                                </div>
                                <Icon
                                    size={Icon.SIZE.MEDIUM}
                                    type={Icon.TYPE.CLOSE}
                                    onClick={this.props.onClickClose}/>
                            </div>
                    }
                    <div className={this.state.wizardContentContainerClassName}>
                        {this.props.children}
                    </div>
                    {
                        hasFooter ?
                            <div className={this.state.wizardFooterContainerClassName}>
                                {footerButtons}
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

Wizard.propTypes = {
    fullScreen: PropTypes.bool,
    skipHeader: PropTypes.bool,
    wizardClassName: PropTypes.string,
    wizardContainerClassName: PropTypes.string,
    wizardHeaderContainerClassName: PropTypes.string,
    wizardContentContainerClassName: PropTypes.string,
    wizardFooterContainerClassName: PropTypes.string,
    onClickClose: PropTypes.func,
    title: PropTypes.string,
    buttons: PropTypes.array,
    data: PropTypes.object
};

Wizard.defaultProps = {
    fullScreen: false,
    skipHeader: false,
    wizardClassName: '',
    wizardContainerClassName: '',
    wizardHeaderContainerClassName: '',
    wizardContentContainerClassName: '',
    wizardFooterContainerClassName: '',
    title: '',
    children: '',
    buttons: [],
    data: {}
};

export default Wizard;
