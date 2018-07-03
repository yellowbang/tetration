/* eslint-disable space-before-function-paren,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/components.scss';

class GroupInfo extends React.Component {
    constructor (...args) {
        super(...args);
        this.state = {};
    }

    render () {
        const me = this;
        let groupInfoContainerClassName = 'group-info-container';
        if (this.props.groupInfoContainerClassName) {
            groupInfoContainerClassName = groupInfoContainerClassName + ' ' + this.props.groupInfoContainerClassName;
        }

        let groupInfoTitleClassName = 'group-info-title';
        if (this.props.groupInfoTitleClassName) {
            groupInfoTitleClassName = groupInfoTitleClassName + ' ' + this.props.groupInfoTitleClassName;
        }

        let groupInfoContentContainerClassName = 'group-info-children-container';
        if (this.props.groupInfoContentContainerClassName) {
            groupInfoContentContainerClassName = groupInfoContentContainerClassName + ' ' + this.props.groupInfoContentContainerClassName;
        }

        return (
            <div className={groupInfoContainerClassName}>
                <div className={groupInfoTitleClassName}>{this.props.title}</div>
                <div className={groupInfoContentContainerClassName}>{this.props.children}</div>
            </div>
        );
    }
}

GroupInfo.propTypes = {
    groupInfoContainerClassName: PropTypes.string,
    groupInfoTitleClassName: PropTypes.string,
    groupInfoContentContainerClassName: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object
};

GroupInfo.defaultProps = {
    groupInfoContainerClassName: '',
    groupInfoTitleClassName: '',
    groupInfoContentContainerClassName: '',
    title: '',
    children: <div/>,
    data: {}
};

export default GroupInfo;
