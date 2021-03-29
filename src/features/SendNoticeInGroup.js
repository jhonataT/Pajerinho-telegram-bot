const fs = require('fs');

class SendNoticeInGroup {
    static async getNotice(){
        let dataFile = fs.readFileSync('DataBase/Notice.json');
        dataFile = JSON.parse(dataFile);
        console.log(`dataFile(${typeof dataFile}) = ${dataFile.name} | ${dataFile.warning}`);

        await SendNoticeInGroup.sendNotice();
    }

    static async sendNotice(){
        let groupDataFile = fs.readFileSync('DataBase/Groups.json');
        groupDataFile = JSON.parse(groupDataFile);
        console.log(`groupDataFile(${typeof groupDataFile}) = ${groupDataFile.id} | ${groupDataFile.name}`);
        
    }
}

module.exports = SendNoticeInGroup;