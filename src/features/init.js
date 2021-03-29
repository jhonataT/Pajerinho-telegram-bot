const fs = require('fs');

class SaveGroupData {
    constructor(groupData){
        this.data = groupData;
    }

    async register(){
        // Verify if user is admin
        // Write group id in a json file
        let isErr = false;
        console.log(this.data.id);
        const groupIdExist = await SaveGroupData.readFile(this.data.id);
        
        console.log(` groupIdExist = ${groupIdExist}`);
        if(groupIdExist){
            console.log(TRUE);
            return `Esse grupo já está cadastrado.`;  
        } 

        await fs.appendFile('Database/Groups.json', JSON.stringify(this.data, null, 4), err => {
            if(err) isErr = true;
            else console.log('Sucess appendFile');
        });

        if(!isErr) return `O grupo < ${this.data.name} > foi salvo no meu banco de dados.`;
        else return `Desculpe, ocorreu um erro ao inicializar esse grupo.`;

    }

    static async readFile(groupDataId) {
        let idExist = false;
        await fs.readFile('Database/Groups.json', (err, data) => {
            if(err) console.log(err);
            else {
                const groupData = data.toString().split('}');
                console.log(groupData);

                groupData.map( data => {
                    console.log(groupDataId);
                    if(data.indexOf(groupDataId) != -1)
                    idExist = true;
                });
                console.log(idExist);
            }
        })
        return idExist;
    }
}

module.exports = SaveGroupData;