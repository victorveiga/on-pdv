function getDataString(value){
    const data = new Date(value);
    return ` ${("00" + (data.getUTCDate())).slice(-2)}/${("00" + (data.getUTCMonth()+1)).slice(-2)}/${data.getUTCFullYear()}`
}

export default {
    getDataString
}