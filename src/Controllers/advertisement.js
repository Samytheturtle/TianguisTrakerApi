import { version } from "bluebird";
import { closeConnection,getConnection } from "../Datebase/dbConfig.js";
const { google } = require('googleapis');
import {auth} from "../Helpers/image.js";
const { Readable } = require('stream');
import {SPI_getAdvertisementPulledApart,SPI_getAdvertisementByCategory,SPI_getAvertisementByTianguis,SPI_updateProcutSelled,SPI_advertisementSelled,SPI_UpdateStatusProduct,SPI_getIdProduct,SPI_UpdateStatusPulledApart,SPI_addAvertisementPulledApart,SPI_registerAdvertisement,SPI_registerProduct,SPI_getNameProduct,SPI_addFavoriteProduct,SPI_getAdvertisementById} from "../Procedures/advertisement.js";


const bufferToStream = (buffer) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
  };

const addAdvertisement = async(req,res)=>{
    if (!req.file || !req.file.buffer) {
        res.send("No hay imagen");
    }else{
        try{
            const bufferStream = bufferToStream(req.file.buffer);
            const drive = google.drive({ version: 'v3', auth });
            const {estatusAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio
            ,idVendedorAnuncio,idCategoriaAnuncio}=req.body;
            console.log(req.file);
            const response = await drive.files.create({
                requestBody: {
                    name: 'uploaded_image.jpg',
                    
                },
                media: {
                    mimeType: 'image/jpeg',
                    body: bufferStream,
                },
            });
            console.log("Si llega");
            const imageUrl = `https://drive.google.com/uc?id=${response.data.id}`;
            const estadoProducto = estatusAnuncio;
            const nombreProducto = nombreAnuncio;
            const producto = {estadoProducto, nombreProducto}
            const connection = await getConnection();
            const result = await connection.query(SPI_registerProduct,producto);
            const resultProducto = await connection.query(SPI_getNameProduct,nombreAnuncio);
            const idProducto = resultProducto[0][0].idProducto;
            const anuncio = {estatusAnuncio,fotoAnuncio: imageUrl,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio,idProductoAnuncio: idProducto
                ,idVendedorAnuncio,idCategoriaAnuncio};
    
            const resultAnuncio = await connection.query(SPI_registerAdvertisement,anuncio);
    
            res.json({ message: "Anuncio Registrado con exito"});
            closeConnection(connection);
            
        }catch(error){
            res.status(500);
            res.send(error.message);
            console.log(error);
        }
    }
}

const addFavoriteProduct = async(req,res)=>{
    try{
        const {idCompradorFav,idAnuncioFav}= req.body;
        const connection = await getConnection();
        const advertisement = {idCompradorFav, idAnuncioFav};
        const result = await connection.query(SPI_addFavoriteProduct,advertisement);
        res.json({message: "Producto agregado a favoritos"});
        closeConnection(connection);
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
        closeConnection(connection);
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
        closeConnection(connection);
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
        closeConnection(connection);
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
        closeConnection(connection);
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
        closeConnection(connection);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getAdvertisementPulledApart = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idComprador} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getAdvertisementPulledApart,idComprador);
        res.json(result);
        closeConnection(connection);
    }catch(error){
        closeConnection(connection);
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
    getAdvertisementByCategory,
    getAdvertisementPulledApart
};
