const axios = require('axios');
const { defaultError } = require('../constant/defaultResponse');
const { showError } = require('./showMsgOnLog');

/**
 * @typedef {object} defaultError Default error object
 * @property {number} status
 * @property {object} data
 * @property {string} data.message
 */

/**
 * Call API by axios
 * @param {object} configs Http request options
 * @param {string} configs.method
 * @param {string} configs.url
 * @param {object} configs.headers
 * @returns {Promise | defaultError} If request successful return data, else return default error
 */
async function APICaller(configs) {
    try {
        const res = await axios(configs);
        return res.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorMessage = {
                ...defaultError,
                status: error.response.status,
                data: error.response.data,
                url: error.response.config.url,
            };

            showError('APICaller error', errorMessage);

            return errorMessage;
        // eslint-disable-next-line no-else-return
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            showError('APICaller error', error.request);
            return {
                ...defaultError,
                data: error.request,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            showError('APICaller error', error.message);
            return {
                ...defaultError,
                data: {
                    message: error.message,
                },
            };
        }
    }
}

module.exports = APICaller;
