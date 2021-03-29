const fs = require('fs');

class SaveGroupData {
    constructor(groupData){
        this.data = groupData;
    }

    async register(){
        // Write group id in a JSON file
        let idExist = false;
        let isErr = false;
        console.log(this.data.id);

        let groupData = fs.readFileSync('Database/Groups.json');
        groupData = groupData.toString().split('}');

        groupData.map( data => {
            console.log(this.data.id);
            if(data.indexOf(this.data.id) != -1)
            idExist = true;
        });
        
        if(idExist){
            console.log(true);
            return `Eu já cadastrei esse grupo antes`;  
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