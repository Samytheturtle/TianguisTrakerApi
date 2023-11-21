import { getConnection } from "../Datebase/dbConfig.js";
import {SPI_getAdvertisementByCategory,SPI_getAvertisementByTianguis,SPI_updateProcutSelled,SPI_advertisementSelled,SPI_UpdateStatusProduct,SPI_getIdProduct,SPI_UpdateStatusPulledApart,SPI_addAvertisementPulledApart,SPI_registerAdvertisement,SPI_registerProduct,SPI_getNameProduct,SPI_addFavoriteProduct,SPI_getAdvertisementById} from "../Procedures/advertisement.js";

const addAdvertisement = async(req,res)=>{

    try{
        const {estatusAnuncio,fotoAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio,idProductoAnuncio
        ,idVendedorAnuncio,idCategoriaAnuncio}=req.body;
        
        const connection = await getConnection();
        const estadoProducto = estatusAnuncio;
        const nombreProducto = nombreAnuncio;
        const producto = {estadoProducto, nombreProducto}
        const result = await connection.query(SPI_registerProduct,producto);
        const resultProducto = await connection.query(SPI_getNameProduct,nombreAnuncio);
        const idProducto = resultProducto[0][0].idProducto;
        const anuncio = {estatusAnuncio,fotoAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio,idProductoAnuncio: idProducto
            ,idVendedorAnuncio,idCategoriaAnuncio};

        const resultAnuncio = await connection.query(SPI_registerAdvertisement,anuncio);

        res.json({ message: "Anuncio Registrado con exito"});


    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addFavoriteProduct = async(req,res)=>{
    try{
        const {idCompradorFav,idAnuncioFav}= req.body;
        const connection = await getConnection();
        const advertisement = {idCompradorFav, idAnuncioFav};
        const result = await connection.query(SPI_addFavoriteProduct,advertisement);
        res.json({message: "Producto agregado a favoritos"});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getAdvertisementId = async(req,res)=>{
    try{
        const {idAnuncioFav} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getAdvertisementById,idAnuncioFav);
        res.json(result[0]);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const addAdvertisementPulledApart = async(req,res)=>{
    try{
        const {idAnuncioApartado,idCompradorApartado}= req.body;
        const connection = await getConnection();
        const pulledApart = {idAnuncioApartado,idCompradorApartado};
        const idAnuncio = idAnuncioApartado;
        const [idProduct] = await connection.query(SPI_getIdProduct,idAnuncio);
        const result = await connection.query(SPI_addAvertisementPulledApart,pulledApart);
        const apart = await connection.query(SPI_UpdateStatusPulledApart,idAnuncio);
        const producto = await connection.query(SPI_UpdateStatusProduct,idProduct[0].idProductoAnuncio);
        res.json("Producto apartado");

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const updateAdvertisementSelled = async(req,res)=>{
    try{
        const {idAnuncio}= req.body;
        const connection = await getConnection();
        const [idProduct] = await connection.query(SPI_getIdProduct,idAnuncio);
        const apart = await connection.query(SPI_advertisementSelled,idAnuncio);
        const producto = await connection.query(SPI_updateProcutSelled,idProduct[0].idProductoAnuncio);
        res.json("Producto vendido");

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getAdvertisementByTianguis = async(req,res)=>{
    try{
        const {idTianguisAnuncio} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getAvertisementByTianguis,idTianguisAnuncio);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getAdvertisementByCategory = async(req,res)=>{
    try{
        const {idCategoriaAnuncio} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getAdvertisementByCategory,idCategoriaAnuncio);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    addAdvertisement,
    addFavoriteProduct,
    getAdvertisementId,
    addAdvertisementPulledApart,
    updateAdvertisementSelled,
    getAdvertisementByTianguis,
    getAdvertisementByCategory
};
