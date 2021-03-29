const fs = require('fs');

class SendNoticeInGroup {
    static async getNotiveFromFile(){
        let dataFile = await fs.readFileSync('Database/Notice.txt');
        // dataFile = dataFile.toString();
        console.log(`dataFile = ${dataFile}`);

    }
}

module.exports = SendNoticeInGroup;