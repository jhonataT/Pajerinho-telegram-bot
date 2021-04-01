const { group } = require('console');
const fs = require('fs');

class SaveGroupData {
    constructor(groupData, groupId){
        this.data = groupData;
        this.groupId = groupId;
    }

    register(){
        // Write group id in a JSON file
        let isErr = false;
        console.log("BEFORE");
        let groupData = fs.readFileSync('Database/Groups.json');
        groupData = groupData.toString();
        console.log("AFTER");
        

        console.log(groupData);
        if(groupData != ""){
            for(let i = 0; i < groupData.length; i++){
                groupData = groupData.replace('"', ""); 
            }
            groupData = groupData.split(',');
            console.table(groupData);
        }
        
        for(let i = 0; i < groupData.length; i += 2){
            if(groupData[i] == this.groupId){
                return `Esse grupo já está cadastrado.`;
            }
        }

        groupData = groupData.toString() + this.data;
        console.log(groupData);

        const err = fs.writeFileSync('Database/Groups.json', JSON.stringify(groupData, null, 4));
        if(err) isErr = true;
        else console.log('Sucess writeFile');

        if(!isErr) return `Prontinho, grupo cadastrado`;
        else return `Desculpe, ocorreu algum erro ao cadastrar esse grupo.`;
    }
}

module.exports = SaveGroupData;