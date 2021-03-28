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
    const jsonData = userName + " | " + msg;  
    fs.writeFile('DataBase/Notice.json', JSON.stringify(jsonData, null, 4), err => {
        if(err) isError = true;
        console.log(`ERR = ${isError}`);
    });

    if(isError) return "DESCULPE, ESTOU TENTO DIFICULDADE EM ENTENDER O SEU COMANDO. TENTE USAR O /help." 
    
    else return `COMANDO AUTORIZADO. O SEU AVISO: \n\n\n "${msg}" \n\n\n SERÁ REPASSADO AO GRUPO.`; 
    
}

function invalidCommand(){
    return "DESCULPE, ESTOU TENTO DIFICULDADE EM ENTENDER O SEU COMANDO. TENTE USAR O /help.";
}

module.exports = AdmWarnings;