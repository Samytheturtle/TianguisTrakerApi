const SPI_RegisterAdvertisement = "INSERT INTO anuncio  SET ?";
const SPI_RegisterProduct = "INSERT INTO producto SET ?";
const SPI_GetNameProduct = "SELECT * FROM producto WHERE nombreProducto = ?"


module.exports = {
    'SPI_registerAdvertisement' : SPI_RegisterAdvertisement,
    'SPI_registerProduct' : SPI_RegisterProduct,
    'SPI_getNameProduct' : SPI_GetNameProduct
}