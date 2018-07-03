/* eslint-disable space-before-function-paren,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/components.scss';
import CustomTypeahead from '../components/CustomTypeahead';
import constants from '../constants';

class TextField extends React.Component {
    constructor (...args) {
        super(...args);
        this.state = {
            value: this.props.initialValue
        };
        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getValue () {
        if (this.props.enableTypeahead || (this.props.typeaheadOptions && this.props.typeaheadOptions.length > 0)) {
            return this.typeahead.getValue();
        }
        return this.inputField.value;
    }

    onChange (proxy, text) {
        let value;
        if (text) {
            value = text;
        } else if (proxy) {
            value = proxy.target.value;
        }
        this.setState({value});
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render () {
        const me = this;
        let textFieldContainerClassName = 'textField-container';
        if (this.props.textFieldContainerClassName) {
            textFieldContainerClassName = textFieldContainerClassName + ' ' + this.props.textFieldContainerClassName;
        }

        let textFieldTitleClassName = 'textField-title';
        if (this.props.textFieldTitleClassName) {
            textFieldTitleClassName = textFieldTitleClassName + ' ' + this.props.textFieldTitleClassName;
        }

        let textBarClassName = 'textField-bar';
        if (this.props.textBarClassName) {
            textBarClassName = textBarClassName + ' ' + this.props.textBarClassName;
        }

        return (
            <div className={textFieldContainerClassName}>
                <div className={textFieldTitleClassName}>{this.props.title}</div>
                {
                    (this.props.enableTypeahead || (this.props.typeaheadOptions && this.props.typeaheadOptions.length > 0)) ?
                        <CustomTypeahead
                            model={this.props.model}
                            initialValue={this.state.value}
                            tipQueryDelimiter={this.props.tipQueryDelimiter}
                            tipQueryHint={this.props.tipQueryHint}
                            typeaheadBarClassName={textBarClassName}
                            typeaheadOptions={this.props.typeaheadOptions}
                            showClearButton={this.props.showClearButton}
                            onChange={this.onChange}
                            ref={function(typeahead) {
                                me.typeahead = typeahead;
                            }}/>
                        :
                        <input
                            type="text"
                            name="name"
                            value={this.state.value}
                            className={textBarClassName}
                            onChange={this.onChange}
                            ref={function(inputField) {
                                me.inputField = inputField;
                            }}
                        />
                }
            </div>
        );
    }
}

TextField.propTypes = {
    model: PropTypes.string,
    onChange: PropTypes.func,
    initialValue: PropTypes.string,
    tipQueryDelimiter: PropTypes.string,
    tipQueryHint: PropTypes.string,
    textFieldContainerClassName: PropTypes.string,
    textFieldTitleClassName: PropTypes.string,
    textBarClassName: PropTypes.string,
    title: PropTypes.string,
    showClearButton: PropTypes.bool,
    enableTypeahead: PropTypes.bool,
    typeaheadOptions: PropTypes.array,
    children: PropTypes.element,
    data: PropTypes.object
};

TextField.defaultProps = {
    initialValue: '',
    textFieldContainerClassName: '',
    textFieldTitleClassName: '',
    textBarClassName: '',
    title: '',
    showClearButton: false,
    enableTypeahead: false,
    typeaheadOptions: [],
    children: <div/>,
    data: {}
};

export default TextField;
