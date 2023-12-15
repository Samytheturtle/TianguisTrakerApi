import { getConnection,closeConnection } from "../Datebase/dbConfig.js";
import { SPI_GetTianguisById,SPI_RecuperarHorarioTianguis} from "../Procedures/tianguis.js"

const getHorarioTianguis = async(req,res)=>{
    const connection = await getConnection();
    try{
        const [resultTianguis] = await connection.query(SPI_RecuperarHorarioTianguis);
        res.json(resultTianguis)  
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getTianguisById = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idTianguis} = req.params;
        const [result] = await connection.query(SPI_GetTianguisById,idTianguis);
        res.json(result[0]);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

export const methods = {
    getHorarioTianguis,
    getTianguisById
};