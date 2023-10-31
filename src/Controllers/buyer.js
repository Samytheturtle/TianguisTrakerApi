const bcrypt = require('bcryptjs')
import { getConnection } from "../Datebase/dbConfig.js";
const { existEmail } = require("../Helpers/validateUsers.js")
import { SPI_usuarioRegisterBuyer,SPI_usuarioRegisterSeller, SPI_usuario} from "../Procedures/users.js"


const addBuyer = async(req,res)=>{
    try{
        const {correoUsuario, contraseniaUsuario, nombreComprador, ubicacionComprador, fechaNacimientoComprador} = req.body;
        const existEmailUser= await existEmail(correoUsuario);

        if(!existEmailUser){
            const passwordHashed = await encrypt(contraseniaUsuario);
            const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};

            const connection = await getConnection();

            const [resultBuyer] = await connection.query(SPI_usuario, usuario);
            const idUsuarioComprador = resultBuyer.insertId;

    
            const buyer ={nombreComprador,ubicacionComprador,fechaNacimientoComprador,idUsuarioComprador}
            const result = await connection.query(SPI_usuarioRegisterBuyer,buyer);
            res.json({message: "Usuario registrado con exito" });
        }else{
            res.json({ message: "El correo se encuentra en uso" });
            return res.status(409);
        }
       
    }catch(error){
        res.status(500);
        res.send(error.message);
    }

    
}

const encrypt = async (password) => {
    const saltRounds = 10; // Número de rondas de encriptación
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


export const methods = {
    addBuyer
};