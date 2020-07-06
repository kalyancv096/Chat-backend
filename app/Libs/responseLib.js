let generate=(error,message,status,data)=>{
    let response = {
        error: error,
        message: message,
        status: status,
        data:data
    }
    return response;
}
let checkRespone = (result) => { 
    if (result == null || result == '' || result == undefined) {
        return true;
    }
    else { 
        return false;
    }
} 
module.exports = {
    generate: generate,
    checkRespone: checkRespone
}