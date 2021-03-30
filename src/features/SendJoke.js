const fs = require('fs');
const { get } = require('http');

const getRandomJoke = async () => {
    let jokes = fs.readFileSync('DataBase/Jokes.json');
    jokes = JSON.parse(jokes);
    console.table(jokes);

    const randomNumber = await getRandomNumber(jokes.length);
    console.log(randomNumber);

    return `${jokes[randomNumber].title}\n${jokes[randomNumber].description}`;
}

const getRandomNumber = (maxLength) => {
    return Math.round(Math.random() * (maxLength - 0) + 0);
}

module.exports = getRandomJoke;