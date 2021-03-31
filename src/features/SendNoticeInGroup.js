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
        groupData = groupData.toString();
        for(let i = 0; i < groupData.length; i++){
            groupData = groupData.replace('"', ""); 
        }
        groupData = groupData.split(',');
        console.table(groupData);

        for(let i = 0; i < groupData.length - 1; i++){
            if(i % 2 == 0){
                bot.sendMessage(groupData[i], `#####\n${groupNotice}\n#####`);
                console.log(`CHAT ID = ${groupData[i]}`);
            }
        }

        return `**AVISO:** \n${groupNotice}`;
    }
}

module.exports = SendNoticeInGroup;