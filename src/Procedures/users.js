const SPI_usuarioRegisterBuyer = "INSERT INTO comprador SET ?";
const SPI_usuarioRegisterSeller = "INSERT INTO vendedor  SET ?";
const SPI_getUsuarioVendedor = "SELECT * FROM usuarios WHERE idUsuarios = ?";
const SPI_getUsuario = "SELECT correoUsuario FROM usuarios WHERE idUsuarios = ?";
const SPI_getIdUsuarioVendedor = "SELECT idUsuarioVendedor FROM vendedor WHERE idVendedor = ?";
const SPI_getIdUsuarioComprador = "SELECT idUsuarioComprador FROM comprador WHERE idComprador = ?";
const SPI_getVendedor = "SELECT * FROM vendedor WHERE idVendedor = ?";


const SPI_usuario = "INSERT INTO usuarios SET ?"

const SPS_usuario = "SELECT nombre, apellido, email FROM usuario";
const SPS_usuarioID = "SELECT nombre, apellido, email FROM usuario WHERE idUsuario = ?";
const SPD_usuario = "DELETE FROM usuario WHERE idUsuario = ?";
const SPA_usuario = "UPDATE usuario SET ? WHERE idUsuario = ?";
const SPA_usuarioPassword = "UPDATE usuarios SET ? WHERE idUsuarios = ?";
const SPA_updateSeller = "UPDATE vendedor SET ? WHERE idVendedor = ?";
const SPA_updateBuyer = "UPDATE comprador SET ? WHERE idComprador = ?";
const SPI_addReview = "INSERT INTO resenia SET ?";
const SPI_getReview = "SELECT * FROM resenia WHERE idVendedorResenia = ?";
const SPI_getUserSeller = "SELECT idUsuarioVendedor FROM vendedor WHERE idUsuarioVendedor = ?";
const SPI_getIDSeller = "SELECT idVendedor FROM vendedor WHERE idUsuarioVendedor = ?";
const SPI_getIDBuyer = "SELECT idComprador FROM comprador WHERE idUsuarioComprador = ?";
const SPI_getSellers = "SELECT idVendedor, nombreVendedor FROM vendedor";
const SPI_GetBuyerById = "SELECT * FROM comprador WHERE idComprador = ?"

module.exports = {
    'SPI_GetBuyerById': SPI_GetBuyerById,
    'SPI_GetSellers': SPI_getSellers,
    'SPI_getIDBuyer': SPI_getIDBuyer,
    'SPI_getIDSeller': SPI_getIDSeller,
    'SPI_usuarioRegisterSeller' : SPI_usuarioRegisterSeller,
    'SPI_usuario' : SPI_usuario,
    'SPI_usuarioRegisterBuyer' : SPI_usuarioRegisterBuyer,
    'SPS_usuario' : SPS_usuario,
    'SPS_usuarioID' : SPS_usuarioID,
    'SPD_usuario' : SPD_usuario,
    'SPA_usuario' : SPA_usuario,
    'SPA_usuarioPassword' : SPA_usuarioPassword,
    'SPA_updateSeller' : SPA_updateSeller,
    'SPA_getUsuarioVendedor': SPI_getUsuarioVendedor,
    'SPI_getIdUsuarioVendedor': SPI_getIdUsuarioVendedor,
    'SPA_getIdUsuarioComprador': SPI_getIdUsuarioComprador,
    'SPA_updateBuyer' : SPA_updateBuyer,
    'SPI_getUsuario': SPI_getUsuario,
    'SPI_getVendedor' : SPI_getVendedor,
    'SPI_addReview' : SPI_addReview,
    'SPI_getReview' : SPI_getReview,
    'SPI_getUserSeller': SPI_getUserSeller

}