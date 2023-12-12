import { getConnection,closeConnection } from "../Datebase/dbConfig.js"

const existEmail = async (emailu) => {
    const connection = await getConnection();
    try{
        let [result] = await connection.query("SELECT correoUsuario FROM usuarios WHERE correoUsuario = ?", emailu);
        var data=JSON.parse(JSON.stringify(result));

        if(data[0].correoUsuario === emailu){
            return true;
        }else{
            return false;
    }
    }catch(error){
    }finally{
        closeConnection(connection);
    }
};
const findOne = async (emailu) => {
    const connection = await getConnection();
    try {
        let [result] = await connection.query("SELECT contraseniaUsuario FROM usuarios WHERE correoUsuario = ?", emailu);
        var data=JSON.parse(JSON.stringify(result));
        
        console.log(data[0].contraseniaUsuario)
        const encryp = data[0].contraseniaUsuario;
        return encryp;
    } catch (error) {        
    }finally{
        closeConnection(connection);
    }
}
const getId = async (emailu) => {
    const connection = await getConnection();
    try {
        let [result] = await connection.query("SELECT idUsuarios FROM usuarios WHERE correoUsuario = ?", emailu);
        
        var data=JSON.parse(JSON.stringify(result));
        
        const encryp = data[0].idUsuarios;
        return encryp;
    } catch (error) {        
    }finally{
        closeConnection(connection);
    }
}
const getTianguisId = async (idTianguis)=>{
    const connection = await getConnection();
    try{
        let [result] = await connection.query("SELECT idTianguis FROM tianguis WHERE idTianguis = ?",idTianguis);
        var data=JSON.parse(JSON.stringify(result));

        if(data[0].idTianguis === idTianguis){
            return true;
        }else{
            return false}
    } catch (error) {        
    }finally{
        closeConnection(connection);
    }
}
module.exports = {
    existEmail,
    findOne,
    getId,
    getTianguisId
};