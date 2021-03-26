const AdmResponse = (cmdType, msg, userName) => {
    if(cmdType === true && msg.length != 0)
        return `COMANDO AUTORIZADO. O SEU AVISO: \n\n\n "${msg}" \n\n\n SERÁ REPASSADO AO GRUPO.`;
    else if(cmdType === true && msg.length === 0)
        return `VOCÊ NÃO INFORMOU O AVISO QUE DESEJA REPASSAR AO GRUPO. TENTE NOVAMENTE.`;
    else if(cmdType === false)
        return `COMANDO INVÁLIDO. TENTE NOVAMENTE!`; 
};

module.exports = AdmResponse;