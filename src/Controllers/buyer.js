const bcrypt = require('bcryptjs')
import { getConnection } from "../Datebase/dbConfig.js";
const { existEmail } = require("../Helpers/validateUsers.js")
import {SPI_addReview,SPA_updateBuyer,SPA_getIdUsuarioComprador, SPA_usuarioPassword, SPI_usuarioRegisterBuyer,SPI_usuarioRegisterSeller, SPI_usuario} from "../Procedures/users.js"


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

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addReview = async(req,res)=>{
    try{
        const {calificacionResenia,mensajeResenia,idVendedorResenia,idProductoResenia} = req.body;
        const review = {calificacionResenia,mensajeResenia,idVendedorResenia,idProductoResenia};
        const connection = await getConnection();
        const result = connection.query(SPI_addReview,review);
        res.json("Reseña registrada");
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
    addBuyer,
    updateBuyer,
    addReview
};