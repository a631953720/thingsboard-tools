const axios = require('axios');

async function APICaller(configs) {
    try {
        const res = await axios(configs);
        return res.data;
    } catch (error) {
        console.error("[Axios Error]", error);
        return error;
    }
}

module.exports = APICaller;