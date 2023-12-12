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
const SPI_GetAdvertisemenets = "SELECT * FROM anuncio";
const SPI_GetAdvertisementByTianguis = "SELECT * FROM anuncio WHERE idTianguisAnuncio = ?";
const SPI_GetAdvertisementByCategory = "SELECT * FROM anuncio WHERE idCategoriaAnuncio = ?";
const SPI_GETAdvertisementPUlledApart = "SELECT * FROM anuncio JOIN apartado ON idAnuncio = idAnuncioApartado AND idCompradorApartado = ?";
const SPI_GetAdvertisemenetPulledApartSeller = "SELECT * FROM anuncio join apartado ON idAnuncioApartado = idAnuncio where idVendedorAnuncio = ? AND estatusAnuncio = 'Apartado';";
const SPI_UpdateAdvertisementAvaible = "UPDATE anuncio SET estatusAnuncio = 'Disponible' WHERE idAnuncio = ?";
const SPI_UpdateProductAvaible = "UPDATE producto SET estadoProducto = 'Disponible' WHERE idProducto = ?";
const SPI_DeletePulledApart = "DELETE FROM apartado WHERE idAnuncioApartado = ?";
const SPI_GetCategorys = "SELECT * FROM categoria";

module.exports = {
    'SPI_GetCategorys': SPI_GetCategorys,
    'SPI_DeletePulledApart': SPI_DeletePulledApart,
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
    'SPI_getAdvertisementPulledApart' : SPI_GETAdvertisementPUlledApart,
    'SPI_getAdvertisements': SPI_GetAdvertisemenets,
    'SPI_getAdvertisementsPulledApartSeller' : SPI_GetAdvertisemenetPulledApartSeller,
    'SPI_UpdateAdvertisementAvaible': SPI_UpdateAdvertisementAvaible,
    'SPI_UpdateProductAvaible': SPI_UpdateProductAvaible
}