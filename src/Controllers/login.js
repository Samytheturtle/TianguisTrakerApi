import { query } from "express";
import { closeConnection,getConnection } from "../Datebase/dbConfig.js"
import { compare } from "../Helpers/handleByEncript.js"
const {existEmail, findOne, getId } = require("../Helpers/validateUsers.js")
const { generateAccessToken } = require("../Helpers/jwtHelperkey.js")
const {SPI_getUserSeller} = require("../Procedures/users.js");

const loginAuth = async (req,res) => {
    const connection = await getConnection();
    try{
        const {correoUsuario, contraseniaUsuario} = req.body;
        const equalEmail = await existEmail(correoUsuario);
        
        if(equalEmail){
            const encryp = await findOne(correoUsuario);
            const checkPassword = await compare(contraseniaUsuario,encryp);

            if(checkPassword){
                const emailUser = {correoUsuario: correoUsuario};
                const accessToken = generateAccessToken(emailUser);
                const idUser = await getId(correoUsuario);
                const idSeller = await connection.query(SPI_getUserSeller,idUser);
                console.log(idSeller[0][0].idUsuarioVendedor);
                if(idSeller[0][0].idUsuarioVendedor==idUser){
                    res.header('authorization', accessToken).json({message: "authenticated user", token: accessToken, id: idUser, user: "Vendedor"});
                }else{
                    res.header('authorization', accessToken).json({message: "authenticated user", token: accessToken, id: idUser, user: "Comprador"});
                }
                closeConnection(connection);
            }else{
                closeConnection(connection);
                res.json({ message: "Contraseña incorrecta" });
                return res.status(401);
            }

        }else{
            closeConnection(connection);
            res.json({ message: "Correo no encontrado" });
            return res.status(404);
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
};

export const methods = {
    loginAuth
};