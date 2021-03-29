const fs = require('fs');

class SaveGroupData {
    constructor(groupData){
        this.data = groupData;
    }

    async register(){
        // Write group id in a JSON file
        let isErr = false;

        let groupData = fs.readFileSync('Database/Groups.json');
        groupData = groupData.toString();
        if(groupData){
            groupData = JSON.parse(groupData);
            console.log(groupData);
            return `Já tenho cadastro no `;
        }

        await fs.appendFile('Database/Groups.json', JSON.stringify(this.data, null, 4), err => {
            if(err) isErr = true;
            else console.log('Sucess appendFile');
        });

        if(!isErr) return `Prontinho, grupo cadastrado`;
        else return `Desculpe, ocorreu algum erro ao cadastrar esse grupo.`;
    }
}

module.exports = SaveGroupData;