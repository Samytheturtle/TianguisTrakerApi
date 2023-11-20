const bcrypt = require('bcryptjs')
import { getConnection } from "../Datebase/dbConfig.js";
const { existEmail,getTianguisId } = require("../Helpers/validateUsers.js")
import {SPA_usuarioPassword, SPI_getIdUsuarioVendedor,SPI_usuarioRegisterSeller, SPI_usuario,SPA_updateSeller} from "../Procedures/users.js"


const addSeller = async(req,res)=>{
    try{
        const {correoUsuario, contraseniaUsuario, nombreVendedor, calificacionVendedor, horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
            horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,fechaNacimientoVendedor,idTianguisVendedor} = req.body;
        const existEmailUser= await existEmail(correoUsuario);
        if(!existEmailUser){
            const passwordHashed = await encrypt(contraseniaUsuario);
            const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};
            const existTianguisUser =await getTianguisId(idTianguisVendedor);
            if(existTianguisUser){
                const connection = await getConnection();
                const [resultSeller] = await connection.query(SPI_usuario, usuario);
                const idUsuarioVendedor = resultSeller.insertId;

        
                const seller ={nombreVendedor,calificacionVendedor,horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
                    horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,idTianguisVendedor , fechaNacimientoVendedor,idUsuarioVendedor}
    
                const result = await connection.query(SPI_usuarioRegisterSeller,seller);
                console.log("19")
                res.json({message: "Usuario registrado con exito" });
            }else{
                res.json({ message: "El tianguis indicado no fue encontrado" });
                return res.status(409);
            }


        
        }else{
            res.json({ message: "El correo se encuentra en uso" });
            return res.status(409);
        }
       
    }catch(error){
        res.status(500);
        res.send(error.message);
    }

    
}

const updateSeller = async(req,res)=>{
    try{
        const {idVendedor} = req.params;
        const {correoUsuario,contraseniaUsuario,nombreVendedor, calificacionVendedor, horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
            horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,fechaNacimientoVendedor,idTianguisVendedor} = req.body;
        const connection = await getConnection();
        const passwordHashed = await encrypt(contraseniaUsuario);
        const idVen = await connection.query(SPI_getIdUsuarioVendedor,idVendedor);
        const usuario = {correoUsuario, contraseniaUsuario: passwordHashed};
        const seller ={nombreVendedor,calificacionVendedor,horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
            horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,idTianguisVendedor , fechaNacimientoVendedor}
        const result = await connection.query(SPA_updateSeller,[seller,idVendedor]);
        const updateUsuario = await connection.query(SPA_usuarioPassword,[usuario,idVen[0][0].idUsuarioVendedor]);
        res.json({message:"Vendedor actualizado"});
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
    addSeller,
    updateSeller
};


