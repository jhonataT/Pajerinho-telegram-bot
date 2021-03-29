const fs = require('fs');

class AdmWarnings {
    constructor(cmdType, msg, userName){
        this.cmdType = cmdType;
        this.msg = msg;
        this.userName = userName;
    }

    response() {
        let msgResponse;
        if(this.cmdType === true && this.msg.length != 0)
            msgResponse = writeAdmWarningInDataBase(this.msg, this.userName);
        else
            msgResponse = invalidCommand();
        return msgResponse;
    }
}

async function writeAdmWarningInDataBase(msg, userName){
    let isError = false;
    const jsonData = { name: userName, warning: msg };  
    
    const err = fs.writeFileSync('DataBase/Notice.json', JSON.stringify(jsonData, null, 4));
    if(err) console.log(`err = ${err}`);

    if(isError) return "Não entendi. Tente usar o /help." 
    
    else return `Pronto, vou enviar o seu aviso: \n\n\n "${msg}" \n\n\n para o grupo.`; 
    
}

function invalidCommand(){
    return "Não entendi. Tente usar o /help.";
}

module.exports = AdmWarnings;