import constants from '../constants';
import {API} from '../state/actions/app';

let getNameByDn = function(dn, order = 0) {
    if (!dn) {
        return undefined;
    }
    let arr = dn.split('/');
    if (arr.length === 1) {
        return arr[0];
    }
    if (arr.length <= order) {
        return undefined;
    }
    return arr[arr.length - 1 - order].split('-')[1] || dn;
};

let capitalizeFirstLetter = function(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
};

export default {
    emptyFn: function() {
    },
    isEmpty: function(arg) {
        if (arg === undefined || arg === null || arg === '') {
            return true;
        } else if (Array.isArray(arg)) {
            return arg.length === 0;
        } else if (typeof arg === 'object') {
            return Object.keys(arg).length === 0;
        }
        return false;
    },
    capitalizeFirstLetter: capitalizeFirstLetter,
    getNameByDn: getNameByDn,
    getFirstElement: function(value, delimiter) {
        if (!value) {
            return value;
        }
        return value.split(delimiter)[0];
    },
    sortByNumber: function(array, direction, key) {
        return array.sort(function(data1, data2) {
            let value1 = data1[key], value2 = data2[key];

            if (!value1 || value1 === '' || value1 === null || value1 === 'null') {
                return 1;
            } else if (!value2 || value2 === '' || value2 === null || value2 === 'null') {
                return -1;
            }

            let result = Number.parseInt(value1, 10) - Number.parseInt(value2, 10);
            if (direction === 'desc') {
                return -1 * result;
            }
            return result;
        });
    },
    sortByAlphabetically: function(array, direction, key) {
        return array.sort(function(data1, data2) {
            let value1 = data1[key].toString(), value2 = data2[key].toString();

            if (!value1 || value1 === '' || value1 === null || value1 === 'null') {
                return 1;
            } else if (!value2 || value2 === '' || value2 === null || value2 === 'null') {
                return -1;
            }

            if (!value1) {
                value1 = '';
            }
            if (!value2) {
                value2 = '';
            }
            value1 = value1.toUpperCase();
            value2 = value2.toUpperCase();

            let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            if (direction === 'desc') {
                return -1 * result;
            }
            return result;
        });
    },
    getDateAndTime: function() {
        let date = new Date;
        let dateString = date.toString().split(' ');
        return dateString[1] + ' ' + dateString[2] + ', ' + dateString[4] + dateString[6].replace('(', ' ').replace(')', '');
    },
    getUrlFromTextByTipQuery: function(text, delimeter, model, callback) {
        if (!text) {
            return;
        }

        if (!delimeter) {
            delimeter = '?';
        }

        if (text.indexOf(delimeter) === -1) {
            text = text + delimeter;
        }

        text = capitalizeFirstLetter(text);
        let url = '/tip?model=' + model + '&type=' + text;

        API('get', url, {}, function(response) {
            let searchUrl;
            let options = response && response.response && response.response.tip && response.response.tip.data;
            if (options && options.length === 1) {
                let reg = /\/\/\s*(.*?)\s*3\//g;
                searchUrl = options[0].split(reg)[2];
            }
            if (searchUrl) {
                callback(searchUrl);
            }
        });
    }
};
