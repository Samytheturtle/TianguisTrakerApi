const SPI_RecuperarHorarioTianguis = "Select * from tianguis ";
const SPI_GetTianguisById = "SELECT * FROM tianguis where idTianguis = ?";



module.exports = {
    'SPI_RecuperarHorarioTianguis': SPI_RecuperarHorarioTianguis,
    'SPI_GetTianguisById': SPI_GetTianguisById
}