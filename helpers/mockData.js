function randomNum(params) {
    return Math.random() * params;
}

function rawData() {
    return {
        "CPU.Usage": randomNum(100)
    };
}

module.exports = {
    randomNum,
    rawData
}