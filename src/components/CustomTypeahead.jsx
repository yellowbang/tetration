import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from 'cisco-ui-components';
import {Typeahead} from 'smartlogic-react-typeahead';
import constants from '../constants';
import {API} from '../state/actions/app';
import util from '../common/util';

class CustomTypeahead extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            searchText: this.props.initialValue || '',
            typeaheadOptions: this.props.typeaheadOptions || []
        };
        this.onClickClearButton = this.onClickClearButton.bind(this);
        this.onTypeaheadTextInputChange = this.onTypeaheadTextInputChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.updateTypeaheadOptions = this.updateTypeaheadOptions.bind(this);
        this.typeaheadOnBlur = this.typeaheadOnBlur.bind(this);
        this.typeaheadOnFocus = this.typeaheadOnFocus.bind(this);
    }

    onTypeaheadTextInputChange(proxy) {
        let searchText = proxy.target.value;
        this.updateTypeaheadOptions(searchText);
    }

    onKeyUp(proxy) {
        if (proxy.key === 'Enter' && this.props.onKeyEnter) {
            this.props.onKeyEnter();
        }
    }

    updateTypeaheadOptions(searchText) {
        const me = this;

        if (!searchText) {
            return;
        }

        if (Array.isArray(searchText)) {
            if (searchText.length === 0) {
                return;
            }
            searchText = searchText[0];
        }

        searchText = util.capitalizeFirstLetter(searchText);
        let typeaheadOptions = this.state.typeaheadOptions;
        let url = '/tip?model=' + this.props.model + '&type=';
        if (this.props.tipQueryDelimiter === '!') {
            url = url + this.props.tipQueryHint + '%20' + searchText;
        } else {
            url = url + searchText;
        }

        let sendQuery = searchText.slice(-1) === '?';

        API('get', url, {}, function(response) {
            let options = response && response.response && response.response.tip && response.response.tip.data;
            let newOptions = [];
            if (options) {
                options.forEach(function(option) {
                    if (me.props.tipQueryDelimiter === '!') {
                        option = option.replace(me.props.tipQueryHint + ' ', '');
                    }
                    newOptions.push(option);
                });
                typeaheadOptions = newOptions;
            }
            me.setState({searchText: searchText, typeaheadOptions});
            if (sendQuery && me.props.runQuery) {
                let reg = /\/\/\s*(.*?)\s*3\//g;
                me.props.runQuery(options[0].split(reg)[2]);
            }
        });

        if (this.props.onChange) {
            this.props.onChange(undefined, searchText);
        }

        this.setState({searchText});
    }

    setValue(value) {
        this.typeahead.setEntryText(value);
        this.setState({searchText: value});
    }

    getValue() {
        return this.state.searchText;
    }

    onClickClearButton() {
        this.setValue('');
        this.setState({typeaheadOptions: this.props.typeaheadOptions});
    }

    _setOptions() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeaheadOptions) {
            this.setState({typeaheadOptions: nextProps.typeaheadOptions});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.typeaheadOptions !== this.state.typeaheadOptions ||
            nextProps.prefix !== this.props.prefix;
    }

    componentDidUpdate() {
        // this.typeahead.expand();
    }

    typeaheadOnBlur(proxy) {
        if (!(proxy && proxy.relatedTarget && proxy.relatedTarget.classList && proxy.relatedTarget.classList.value === 'typeahead-option')) {
            this.typeaheadOptionsOnblur = this.state.typeaheadOptions;
            this.setState({
                typeaheadOptions: []
            });
        }
    }

    typeaheadOnFocus() {
        this.setState({
            typeaheadOptions: this.typeaheadOptionsOnblur
        }, function() {
            this.typeaheadOptionsOnblur = [];
        });
    }

    render() {
        const me = this;
        let typeaheadBarClassName = 'typeahead-bar';
        if (this.props.typeaheadBarClassName) {
            typeaheadBarClassName = typeaheadBarClassName + ' ' + this.props.typeaheadBarClassName;
        }

        let selected;
        if (this.state.searchText) {
            selected = this.state.searchText;
        }

        return (
            <div className="typeahead-container">
                {
                    util.isEmpty(this.props.prefix) ?
                        null
                        :
                        <div className="typeahead-prefix">{this.props.prefix}</div>
                }
                <Typeahead
                    placeholder={this.props.placeholder}
                    options={this.state.typeaheadOptions}
                    className={typeaheadBarClassName}
                    onChange={this.onTypeaheadTextInputChange}
                    onKeyUp={this.onKeyUp}
                    onBlur={this.typeaheadOnBlur}
                    onFocus={this.typeaheadOnFocus}
                    onOptionSelected={this.updateTypeaheadOptions}
                    onInputChange={this.updateTypeaheadOptions}
                    selected={selected}
                    value={selected}
                    ref={function(typeahead) {
                        me.typeahead = typeahead;
                    }}
                />
                {this.props.showClearButton ?
                    <div className="clear-button-container">
                        <IconButton
                            size={IconButton.SIZE.SMALL}
                            icon={IconButton.ICON.CLOSE}
                            type={IconButton.TYPE.DEFAULT}
                            onClick={this.onClickClearButton}/>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

CustomTypeahead.propTypes = {
    model: PropTypes.string,
    tipQueryDelimiter: PropTypes.string,
    tipQueryHint: PropTypes.string,
    placeholder: PropTypes.string,
    getValue: PropTypes.func,
    onChange: PropTypes.func,
    runQuery: PropTypes.func,
    onKeyEnter: PropTypes.func,
    typeaheadBarClassName: PropTypes.string,
    typeaheadOptions: PropTypes.array,
    prefix: PropTypes.string,
    initialValue: PropTypes.string,
    showClearButton: PropTypes.bool
};

CustomTypeahead.defaultProps = {
    prefix: '',
    model: 'demo',
    tipQueryDelimiter: '',
    typeaheadBarClassName: '',
    showClearButton: true,
    typeaheadOptions: []
};

export default CustomTypeahead;
