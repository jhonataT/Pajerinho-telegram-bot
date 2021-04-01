const { group } = require('console');
const fs = require('fs');

class SavedataFile {
    constructor(dataFile, groupId){
        this.data = dataFile;
        this.groupId = groupId;
    }

    register(){
        // Write group id in a JSON file
        let isErr = false;
        console.log("BEFORE");
        let dataFile = fs.readFileSync('DataBase/Groups.json');
        dataFile = dataFile.toString();
        console.log("AFTER");
        

        console.log(dataFile);
        if(dataFile != ""){
            for(let i = 0; i < dataFile.length; i++){
                dataFile = dataFile.replace('"', ""); 
            }
            dataFile = dataFile.split(',');
            console.table(dataFile);
        }
        
        for(let i = 0; i < dataFile.length; i += 2){
            if(dataFile[i] == this.groupId){
                return `Esse grupo já está cadastrado.`;
            }
        }

        dataFile = dataFile.toString() + this.data;
        console.log(dataFile);

        const err = fs.writeFileSync('Database/Groups.json', JSON.stringify(dataFile, null, 4));
        if(err) isErr = true;
        else console.log('Sucess writeFile');

        if(!isErr) return `Prontinho, grupo cadastrado`;
        else return `Desculpe, ocorreu algum erro ao cadastrar esse grupo.`;
    }
}

module.exports = SavedataFile;