const bcrypt = require('bcryptjs')
const {getConnection} = require("../Datebase/dbConfig.js")
const addBuyer = async(req,res)=>{
    try{
        const {nombreComprador, correoComprador, fechaNacimientoComprador, contraseniaComprador} = req.body;
        const passwordHashed = await encrypt(contraseniaComprador);
        const buyer = {nombreComprador, correoComprador, fechaNacimientoComprador, contraseniaComprador:passwordHashed}

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO comprador SET ?", buyer);

        res.json(result);
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

module.exports = {
    addBuyer
};