const bcrypt = require('bcryptjs')
const {getConnection} = require("../Datebase/dbConfig.js")

const loginAccsess = async(req,res)=>{
    try{
        const {correoVendedor,contraseniaVendedor} = req.body;
        const passwordHashed = await encrypt(contraseniaVendedor);
        const seller = {correoVendedor,contraseniaVendedor:passwordHashed}

        const connection = await getConnection();
        const passwordBD = await connection.query("SELECT contraseniaVendedor from vendedor where correoVendedor = ?",correoVendedor);
        var data=JSON.parse(JSON.stringify(passwordBD));
        
        
        const acceso = await compare(contraseniaVendedor,data[1].contraseniaVendedor);
        if(acceso){
            const result = await connection.query("SELECT nombreVendedor, correoVendedor from vendedor where correoVendedor = ?", correoVendedor);
            res.json(result);
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
    console.log(password);
    console.log(pass);
    return await bcrypt.compare(password, pass);
}


module.exports = {
    loginAccsess
};