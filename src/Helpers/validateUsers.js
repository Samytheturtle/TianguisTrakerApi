import { getConnection } from "../Datebase/dbConfig.js"

const existEmail = async (emailu) => {
    try{
        let connection = await getConnection();
        let [result] = await connection.query("SELECT correoUsuario FROM usuarios WHERE correoUsuario = ?", emailu);
        var data=JSON.parse(JSON.stringify(result));

        if(data[0].correoUsuario === emailu){
            return true;
        }else{
            return false;
    }
    }catch(error){
    }
};
const findOne = async (emailu) => {
    try {
        let connection = await getConnection();
        let [result] = await connection.query("SELECT contraseniaUsuario FROM usuarios WHERE correoUsuario = ?", emailu);
        var data=JSON.parse(JSON.stringify(result));
        
        console.log(data[0].contraseniaUsuario)
        const encryp = data[0].contraseniaUsuario;
        return encryp;
    } catch (error) {        
    }
}
const getId = async (emailu) => {
    try {
        let connection = await getConnection();
        let [result] = await connection.query("SELECT idUsuarios FROM usuarios WHERE correoUsuario = ?", emailu);
        
        var data=JSON.parse(JSON.stringify(result));
        
        const encryp = data[0].idUsuarios;
        return encryp;
    } catch (error) {        
    }
}
module.exports = {
    existEmail,
    findOne,
    getId
};