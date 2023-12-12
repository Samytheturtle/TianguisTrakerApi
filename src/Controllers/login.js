import { query } from "express";
import { closeConnection,getConnection } from "../Datebase/dbConfig.js"
import { compare } from "../Helpers/handleByEncript.js"
const {existEmail, findOne, getId } = require("../Helpers/validateUsers.js")
const { generateAccessToken } = require("../Helpers/jwtHelperkey.js")
const {SPI_getIDBuyer,SPI_getIDSeller,SPI_getUserSeller} = require("../Procedures/users.js");

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
                if(idSeller[0][0]!=null){
                    const [id] = await connection.query(SPI_getIDSeller,idUser)
                    res.header('authorization', accessToken).json({message: "authenticated user", token: accessToken, id: id[0].idVendedor, user: "Vendedor"});
                }else{
                    const [idCom] = await connection.query(SPI_getIDBuyer,idUser);
                    res.header('authorization', accessToken).json({message: "authenticated user", token: accessToken, id: idCom[0].idComprador, user: "Comprador"});
                }
            }else{
                res.json({ message: "Contraseña incorrecta" });
                return res.status(401);
            }

        }else{
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