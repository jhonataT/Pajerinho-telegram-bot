const fs = require('fs');

const GetRandomJoke = async () => {
    let jokes = fs.readFileSync('DataBase/Jokes.json');
    jokes = JSON.parse(jokes);
    console.log(jokes.length);
}

module.exports = GetRandomJoke;