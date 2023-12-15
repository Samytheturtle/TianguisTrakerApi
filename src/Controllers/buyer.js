const bcrypt = require('bcryptjs')
import {closeConnection, getConnection } from "../Datebase/dbConfig.js";
const { existEmail } = require("../Helpers/validateUsers.js")
import {SPI_getUsuario,SPI_GetBuyerById,SPI_addReview,SPA_updateBuyer,SPA_getIdUsuarioComprador, SPA_usuarioPassword, SPI_usuarioRegisterBuyer,SPI_usuarioRegisterSeller, SPI_usuario} from "../Procedures/users.js"


const addBuyer = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {correoUsuario, contraseniaUsuario, nombreComprador, ubicacionComprador, fechaNacimientoComprador} = req.body;
        const existEmailUser= await existEmail(correoUsuario);

        if(!existEmailUser){
            const passwordHashed = await encrypt(contraseniaUsuario);
            const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};

            

            const [resultBuyer] = await connection.query(SPI_usuario, usuario);
            const idUsuarioComprador = resultBuyer.insertId;

    
            const buyer ={nombreComprador,ubicacionComprador,fechaNacimientoComprador,idUsuarioComprador}
            const result = await connection.query(SPI_usuarioRegisterBuyer,buyer);
            res.json({message: "Usuario registrado con exito" });
            closeConnection(connection);
        }else{
            res.json({ message: "El correo se encuentra en uso" });
            return res.status(409);
        }
       
    }catch(error){
        closeConnection(connection);
        res.status(500);
        res.send(error.message);
    }

    
}

const updateBuyer = async(req,res)=>{
    try{
        const {idComprador} = req.params;
        const {correoUsuario, contraseniaUsuario, nombreComprador, ubicacionComprador, fechaNacimientoComprador} = req.body;
        const passwordHashed = await encrypt(contraseniaUsuario);
        const usuario = {correoUsuario, contraseniaUsuario:passwordHashed};
        const vendedor = {nombreComprador, ubicacionComprador, fechaNacimientoComprador}
        const connection = await getConnection();
        const idCom = await connection.query(SPA_getIdUsuarioComprador,idComprador);
        const result = await connection.query(SPA_updateBuyer,[vendedor,idComprador]);
        const result2 = await connection.query(SPA_usuarioPassword,[usuario,idCom[0][0].idUsuarioComprador]);

        res.json("Comprador actualizado");
        closeConnection(connection);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addReview = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {calificacionResenia,mensajeResenia,idVendedorResenia} = req.body;
        const review = {calificacionResenia,mensajeResenia,idVendedorResenia};
        const result = connection.query(SPI_addReview,review);
        res.json("Reseña registrada");
    }catch(error){    
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getBuyerById = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idComprador} = req.params;
        const [result] = await connection.query(SPA_getIdUsuarioComprador,idComprador);
        const [correo] = await connection.query(SPI_getUsuario,result[0].idUsuarioComprador);
        const [buyer] = await connection.query(SPI_GetBuyerById,idComprador);
        const buyerInfo = {
            correoUsuario: correo[0].correoUsuario,
            nombreComprador: buyer[0].nombreComprador,
            ubicacionComprador: buyer[0].ubicacionComprador,
            fechaNacimientoComprador: buyer[0].fechaNacimientoComprador,
            idUsuarioComprador: buyer[0].idUsuarioComprador,
        };
        res.json(buyerInfo);
    }catch(error){
        res.status(500);
        res.send(error.message);
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
    getBuyerById,
    addBuyer,
    updateBuyer,
    addReview
};