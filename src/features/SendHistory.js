const fs = require("fs");

const getRandomHistory = async () => {
    let history = fs.readFileSync('DataBase/History.json');
    history = JSON.parse(history);
    console.table(history);

    const randomNumber = await getRandomNumber(history.length - 1);
    console.log(randomNumber);

    return `${history[randomNumber].title}\n${history[randomNumber].description}`;
}

const getRandomNumber = (maxLength) => {
    return Math.round(Math.random() * (maxLength - 0) + 0);
}

module.exports = getRandomHistory;