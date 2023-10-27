const bcrypt = require('bcryptjs')

const addSeller = async(req,res)=>{
    try{
        const {nombre, correo, fechaNacimiento, password} = req.body;
        const passwordHashed = await encrypt(password);
        const seller = {nombre, correo, fechaNacimiento, password:passwordHashed}

        res.json({ message: "Vendedor Registrado" });
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