import CONSTANTS from '../constants';
import Cookies from 'universal-cookie';

const GET = 'get', POST = 'post', PUT = 'put', DELETE = 'delete';

function checkStatus(response) {
    const status = response.status;
    return response.json().then(json => {
        if (response.ok) {
            return json;
        }
        return Promise.reject(json);
    }, reason => {
        if (status === 204) {
            return {};
        }
        return Promise.reject(reason);
    });
}

const cookies = new Cookies();
const api = {
    get jsonHeaders() {
        // Get ACI tokens from cookies
        const tokenKeyPrefix = 'app_Cisco_' + CONSTANTS.APP_ID;
        const token = cookies.get(tokenKeyPrefix + '_token');
        const urlToken = cookies.get(tokenKeyPrefix + '_urlToken');

        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            DevCookie: token,
            'APIC-challenge': urlToken
        };
    },
    get(url, params) {
        const options = {
            method: GET,
            headers: this.jsonHeaders,
            body: JSON.stringify(params)
        };
        return fetch(url, options).then(checkStatus).catch(error => Promise.reject(error));
    },
    post(url, payload, messageOptions = {}) {
        const options = {
            method: POST,
            headers: this.jsonHeaders,
            body: JSON.stringify(payload)
        };
        return fetch(url, options).then(checkStatus).catch(error => Promise.reject({error, messageOptions}));
    },
    put(url, payload, messageOptions = {}) {
        const options = {
            method: PUT,
            headers: this.jsonHeaders,
            body: JSON.stringify(payload)
        };
        return fetch(url, options).then(checkStatus).catch(error => Promise.reject({error, messageOptions}));
    },
    remove(url) {
        const options = {
            method: DELETE,
            headers: this.jsonHeaders
        };
        return fetch(url, options).then(checkStatus).catch(error => Promise.reject(error));
    }
};

export default api;
export {GET, POST, PUT, DELETE};
