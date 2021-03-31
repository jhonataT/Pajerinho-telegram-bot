const fs = require('fs');

class SendNoticeInGroup {
    static async getNotice(bot){
        let dataFile = fs.readFileSync('DataBase/Notice.json');
        dataFile = JSON.parse(dataFile);
        console.log(`dataFile(${typeof dataFile}) = ${dataFile.name} | ${dataFile.warning}`);

        const formatedNotice = await SendNoticeInGroup.sendNotice(dataFile.name, dataFile.warning, bot);

        return formatedNotice;
    }

    static async sendNotice(groupName, groupNotice, bot){
        let groupData = fs.readFileSync('DataBase/Groups.json');
        groupData = JSON.parse(groupData);

        bot.sendMessage(groupData.id, `#####\n\n${groupNotice}\n\n#####`);

        return `**AVISO:** \n${groupNotice}`;
    }
}

module.exports = SendNoticeInGroup;