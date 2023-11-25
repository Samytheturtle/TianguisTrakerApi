const SPI_RegisterAdvertisement = "INSERT INTO anuncio  SET ?";
const SPI_RegisterProduct = "INSERT INTO producto SET ?";
const SPI_GetNameProduct = "SELECT * FROM producto WHERE nombreProducto = ?";
const SPI_AddFavoriteProducto = "INSERT INTO anunciosfavoritos SET ?";
const SPI_GetAdvertisementById = "SELECT * FROM anuncio WHERE idAnuncio = ?";
const SPI_AddAdvertisementPulledApart = "INSERT INTO apartado SET ?";
const SPI_AdvertisementStatus = "UPDATE anuncio SET estatusAnuncio = 'Apartado' WHERE idAnuncio = ?";
const SPI_UpdateStatusProduct = "UPDATE producto SET estadoProducto = 'Apartado' WHERE idProducto = ?";
const SPI_GetIdProdcut = "SELECT idProductoAnuncio FROM anuncio WHERE idAnuncio = ?";
const SPI_AdvertisementSelled = "UPDATE anuncio SET estatusAnuncio = 'Vendido' WHERE idAnuncio = ?";
const SPI_UpdateProductSelled = "UPDATE producto SET estadoProducto = 'Vendido' WHERE idProducto = ?";
const SPI_GetAdvertisementByTianguis = "SELECT estatusAnuncio,fotoAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idProductoAnuncio,idVendedorAnuncio,idCategoriaAnuncio FROM anuncio WHERE idTianguisAnuncio = ?";
const SPI_GetAdvertisementByCategory = "SELECT estatusAnuncio,fotoAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idProductoAnuncio,idVendedorAnuncio,idCategoriaAnuncio FROM anuncio WHERE idCategoriaAnuncio = ?";
const SPI_GETAdvertisementPUlledApart = "SELECT * FROM anuncio JOIN apartado ON idAnuncio = idAnuncioApartado AND idCompradorApartado = ?";

module.exports = {
    'SPI_registerAdvertisement' : SPI_RegisterAdvertisement,
    'SPI_registerProduct' : SPI_RegisterProduct,
    'SPI_getNameProduct' : SPI_GetNameProduct,
    'SPI_addFavoriteProduct' : SPI_AddFavoriteProducto,
    'SPI_getAdvertisementById' : SPI_GetAdvertisementById,
    'SPI_addAvertisementPulledApart': SPI_AddAdvertisementPulledApart,
    'SPI_UpdateStatusPulledApart': SPI_AdvertisementStatus,
    'SPI_UpdateStatusProduct': SPI_UpdateStatusProduct,
    'SPI_getIdProduct': SPI_GetIdProdcut,
    'SPI_updateProcutSelled': SPI_UpdateProductSelled,
    'SPI_advertisementSelled': SPI_AdvertisementSelled,
    'SPI_getAvertisementByTianguis' : SPI_GetAdvertisementByTianguis,
    'SPI_getAdvertisementByCategory':SPI_GetAdvertisementByCategory,
    'SPI_getAdvertisementPulledApart' : SPI_GETAdvertisementPUlledApart
}