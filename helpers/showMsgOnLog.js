// TODO 改善顯示方式
function showLog(params) {
    console.info(params);
}

function showError(params) {
    console.error(params);
}

module.exports = {
    showLog,
    showError,
};
