const bcrypt = require('bcryptjs')
import { getConnection,closeConnection } from "../Datebase/dbConfig.js";
const { existEmail,getTianguisId } = require("../Helpers/validateUsers.js")
import {SPI_GetSellers,SPI_getReview,SPI_getUsuario,SPA_getUsuarioVendedor,SPA_usuarioPassword, SPI_getIdUsuarioVendedor,SPI_usuarioRegisterSeller, SPI_usuario,SPA_updateSeller, SPI_getVendedor} from "../Procedures/users.js"


const addSeller = async(req,res)=>{
    
    try{
        const connection = await getConnection();
        const {correoUsuario, contraseniaUsuario, nombreVendedor, calificacionVendedor, horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
            horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,fechaNacimientoVendedor,idTianguisVendedor} = req.body;
        const existEmailUser= await existEmail(correoUsuario);
        if(!existEmailUser){
            const passwordHashed = await encrypt(contraseniaUsuario);
            const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};
            const existTianguisUser =await getTianguisId(idTianguisVendedor);
            if(existTianguisUser){
                
                const [resultSeller] = await connection.query(SPI_usuario, usuario);
                const idUsuarioVendedor = resultSeller.insertId;


                const seller ={nombreVendedor,calificacionVendedor,horarioLunesVendedor, horarioMartesVendedor, horarioMiercolesVendedor,
                    horarioJuevesVendedor, horarioViernesVendedor, horarioSabadoVendedor, horarioDomingoVendedor,idTianguisVendedor , fechaNacimientoVendedor,idUsuarioVendedor}
    
                const result = await connection.query(SPI_usuarioRegisterSeller,seller);
                console.log("19")
                res.json({message: "Usuario registrado con exito" });
                closeConnection(connection);
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
        closeConnection(connection);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getSeller = async(req,res)=>{
    try{
        const {idVendedor} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getIdUsuarioVendedor,idVendedor);
        const [correo] = await connection.query(SPI_getUsuario,result[0].idUsuarioVendedor)
        const [vendedor] = await connection.query(SPI_getVendedor,idVendedor);
        const sellerInfo = {
            correo: correo[0].correoUsuario,
            nombreVendedor: vendedor[0].nombreVendedor,
            calificacionVendedor: vendedor[0].calificacionVendedor,
            horarioLunesVendedor: vendedor[0].horarioLunesVendedor,
            horarioMartesVendedor: vendedor[0].horarioMartesVendedor,
            horarioMiercolesVendedor: vendedor[0].horarioMiercolesVendedor,
            horarioJuevesVendedor: vendedor[0].horarioJuevesVendedor,
            horarioViernesVendedor: vendedor[0].horarioViernesVendedor,
            horarioSabadoVendedor: vendedor[0].horarioSabadoVendedor,
            horarioDomingoVendedor: vendedor[0].horarioDomingoVendedor,
            idTianguisVendedor: vendedor[0].idTianguisVendedor,
            fechaNacimientoVendedor: vendedor[0].fechaNacimientoVendedor,
        };
        res.json(sellerInfo);
        closeConnection(connection);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getReview = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idVendedor} = req.params;
        const [result] = await connection.query(SPI_getReview,idVendedor);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}


const getSellers = async(req,res)=>{
    const connection = await getConnection();
    try{
        const [result] = await connection.query(SPI_GetSellers);
        res.json(result);
    }catch(error){

    }finally{
        closeConnection(connection);
    }
} 

const encrypt = async (password) => {
    const saltRounds = 10; // Número de rondas de encriptación
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


export const methods = {
    getSellers,
    addSeller,
    updateSeller,
    getSeller,
    getReview
};


