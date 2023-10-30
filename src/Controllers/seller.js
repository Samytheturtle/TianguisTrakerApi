const bcrypt = require('bcryptjs')
import { getConnection } from "../Datebase/dbConfig.js";
const { existEmail } = require("../Helpers/validateUsers.js")
import { SPI_usuarioRegisterBuyer,SPI_usuarioRegisterSeller, SPI_usuario} from "../Procedures/users.js"


const addSeller = async(req,res)=>{
    try{
        const {correoUsuario, contraseniaUsuario, nombreVendedor, calificacionVendedor, horarioLunesVendedor, horarioMartesVendedor, horarioMiércolesVendedor,
            horarioJuevesVendedor, horarioViernesVendedor, horarioSábadoVendedor, horarioDomingoVendedor} = req.body;
        const existEmailUser= await existEmail(correoUsuario);

        if(!existEmailUser){
            const passwordHashed = await encrypt(contraseniaUsuario);
            const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};

            const connection = await getConnection();

            const [resultSeller] = await connection.query(SPI_usuario, usuario);
            const idUsuarioVendedor = resultSeller.insertId;

    
            const seller ={nombreVendedor,calificacionVendedor,horarioLunesVendedor, horarioMartesVendedor, horarioMiércolesVendedor,
                horarioJuevesVendedor, horarioViernesVendedor, horarioSábadoVendedor, horarioDomingoVendedor, idUsuarioVendedor}

            const result = await connection.query(SPI_usuarioRegisterSeller,seller);
            res.json(result);
        
        }else{
            res.json({ message: "Usuario ya registrado" });
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
    addSeller
};