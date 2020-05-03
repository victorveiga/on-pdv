function getDataString(value){
    const data = new Date(value);
    return `${("00" + (data.getUTCDate())).slice(-2)}/${("00" + (data.getUTCMonth()+1)).slice(-2)}/${data.getUTCFullYear()}`
}

function getDataStringYMD(value){
    const data = new Date(value);
    return `${data.getUTCFullYear()}-${("00" + (data.getUTCMonth()+1)).slice(-2)}-${("00" + (data.getUTCDate())).slice(-2)}`
}

export default {
    getDataString,
    getDataStringYMD
}