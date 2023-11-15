const SPI_usuarioRegisterBuyer = "INSERT INTO comprador SET ?";
const SPI_usuarioRegisterSeller = "INSERT INTO vendedor  SET ?";


const SPI_usuario = "INSERT INTO usuarios SET ?"

const SPS_usuario = "SELECT nombre, apellido, email FROM usuario";
const SPS_usuarioID = "SELECT nombre, apellido, email FROM usuario WHERE idUsuario = ?";
const SPD_usuario = "DELETE FROM usuario WHERE idUsuario = ?";
const SPA_usuario = "UPDATE usuario SET ? WHERE idUsuario = ?";
const SPA_usuarioPassword = "UPDATE usuario SET ? WHERE idUsuario = ?";
const SPA_updateSeller = "UPDATE vendedor SET ? WHERE idVendedor = ?";


module.exports = {
    'SPI_usuarioRegisterSeller' : SPI_usuarioRegisterSeller,
    'SPI_usuario' : SPI_usuario,
    'SPI_usuarioRegisterBuyer' : SPI_usuarioRegisterBuyer,
    'SPS_usuario' : SPS_usuario,
    'SPS_usuarioID' : SPS_usuarioID,
    'SPD_usuario' : SPD_usuario,
    'SPA_usuario' : SPA_usuario,
    'SPA_usuarioPassword' : SPA_usuarioPassword,
    'SPA_updateSeller' : SPA_updateSeller

}