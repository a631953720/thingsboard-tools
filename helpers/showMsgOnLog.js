function showLog(params) {
    console.info(params);
}

function showError(params) {
    console.error(params);
}

module.exports = {
    showLog,
    showError
};