import { getConnection } from "../Datebase/dbConfig.js";
import { SPI_RecuperarHorarioTianguis} from "../Procedures/tianguis.js"

const getHorarioTianguis = async(req,res)=>{
    try{
        const connection = await getConnection();
        const [resultTianguis] = await connection.query(SPI_RecuperarHorarioTianguis);
        res.json(resultTianguis)

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getHorarioTianguis
};