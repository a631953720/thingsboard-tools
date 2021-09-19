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
            
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            return {
                ...defaultError,
                status: error.response.status,
                data: error.response.config
            };

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