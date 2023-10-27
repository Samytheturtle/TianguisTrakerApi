const bcrypt = require('bcryptjs')
const {getConnection} = require("../Datebase/dbConfig.js")

const loginAccsess = async(req,res)=>{
    try{
        const {correoVendedor,contraseniaVendedor} = req.body;
        const passwordHashed = await encrypt(contraseniaVendedor);
        const seller = {correoVendedor,contraseniaVendedor:passwordHashed}

        const connection = await getConnection();
        const passwordBD = await connection.query("SELECT contraseniaVendedor from vendedor where contraseniaVendedor = ?",seller.contraseniaVendedor);
        var data = JSON.parse(JSON.stringify(passwordBD));
        const acceso = await compare(contraseniaVendedor,"$2a$10$q88YO2XntpOnFcbY4h.EeOOpfNr55mRLKBMAiiTITE6C47iq4RyGO");
        if(acceso){
            const result = await connection.query("SELECT idVendedor from vendedor where correoVendedor = ?", seller.correoVendedor);
            res.send(result[0]);
            console.log("Logueado");
        }else{
            res.json(400);
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

const compare = async (password, pass) => {
    return await bcrypt.compare(password, pass);
}


module.exports = {
    loginAccsess
};