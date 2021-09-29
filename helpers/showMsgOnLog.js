require('log-node')();
const log = require('log');

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
// powershell 需先用 $env:DEBUG='log:*' 設定環境變數
// 這樣有設定 'log' tag 的 'info' level log 可以顯示
// 'log' 可以換成任意字串當作 log 的 tag

// 設定log tag
const myLibLog = log.get('log');

// 根據設定會有 log: xxx 出現
myLibLog.info('info');
myLibLog.warn('warn');
myLibLog.error('error');

// 未設定 tag，前面環境變數設定為'log:*'，就不會顯示
log.info('no tag info');

// waring error 類型的不會受到任何限制
log.warn('no tag warn');
log.error('no tag error');
