const bcrypt = require('bcryptjs')
const {getConnection} = require("../Datebase/dbConfig.js")
const addSeller = async(req,res)=>{
    try{
        const {nombreVendedor, correoVendedor, fechaNacimientoVendedor, contraseniaVendedor} = req.body;
        const passwordHashed = await encrypt(contraseniaVendedor);
        const seller = {nombreVendedor, correoVendedor, fechaNacimientoVendedor, contraseniaVendedor:passwordHashed}

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO vendedor SET ?", seller);

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
    addSeller
};