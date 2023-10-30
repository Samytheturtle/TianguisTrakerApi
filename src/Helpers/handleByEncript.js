const bcrypt = require('bcryptjs')

const encrypt = async (texto) => {
    const hash = await bcrypt.hash(texto, 8);
    return hash;
}

const compare = async (contraseniaUsuario, passwordHash) => {
    return await bcrypt.compare(contraseniaUsuario, passwordHash);
}

module.exports = {
    encrypt,
    compare
}

