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
        else if(this.cmdType === true && this.msg.length === 0)
            msgResponse = admWarningEmpty();
        else if(this.cmdType === false)
            msgResponse = invalidCommand();
        return msgResponse;
    }
}

function writeAdmWarningInDataBase(msg, userName){
    return `COMANDO AUTORIZADO. O SEU AVISO: \n\n\n "${msg}" \n\n\n SERÁ REPASSADO AO GRUPO.`;
}

function admWarningEmpty(){
    return `VOCÊ NÃO INFORMOU O AVISO QUE DESEJA REPASSAR AO GRUPO. TENTE NOVAMENTE.`;
}

function invalidCommand(){
    return `COMANDO INVÁLIDO. DIGITE /HELP PARA VERIFICAR A LISTA DE COMANDOS.!`;
}

module.exports = AdmWarnings;