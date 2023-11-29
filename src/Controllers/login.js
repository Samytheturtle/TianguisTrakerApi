import { closeConnection,getConnection } from "../Datebase/dbConfig.js"
import { compare } from "../Helpers/handleByEncript.js"
const { existEmail, findOne, getId } = require("../Helpers/validateUsers.js")
const { generateAccessToken } = require("../Helpers/jwtHelperkey.js")

const loginAuth = async (req,res) => {
    try{
        const {correoUsuario, contraseniaUsuario} = req.body;
        const equalEmail = await existEmail(correoUsuario);
        const connection = await getConnection();
        if(equalEmail){
            const encryp = await findOne(correoUsuario);
            const checkPassword = await compare(contraseniaUsuario,encryp);

            if(checkPassword){
                
                const emailUser = {correoUsuario: correoUsuario};
                const accessToken = generateAccessToken(emailUser);
                const idUser = await getId(correoUsuario);
                res.header('authorization', accessToken).json({message: "authenticated user", token: accessToken, id: idUser});
                closeConnection(connection);
            }else{
                res.json({ message: "Contraseña incorrecta" });
                return res.status(401);
                closeConnection(connection);
            }

        }else{
            res.json({ message: "Correo no encontrado" });
            return res.status(404);
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    loginAuth
};