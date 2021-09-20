const axios = require('axios');

async function APICaller(configs) {
    try {
        const res = await axios(configs);
        return res.data;
    } catch (error) {
        const defaultError = {
            status: 500,
            data: {
                message: 'Untreated error'
            }
        };

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            
            const errorMessage = {
                ...defaultError,
                status: error.response.status,
                data: error.response.data,
                url: error.response.config.url
            }

            console.error(errorMessage);

            return errorMessage;

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            return {
                ...defaultError,
                data: error.request
            };

        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            return {
                ...defaultError,
                data: {
                    message: error.message
                }
            };
        }
    }
}

module.exports = APICaller;