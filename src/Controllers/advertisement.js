import { version } from "bluebird";
import { closeConnection,getConnection } from "../Datebase/dbConfig.js";
const { google } = require('googleapis');
import {auth} from "../Helpers/image.js";
const { Readable } = require('stream');
const axios = require('axios');
const fs = require('fs');
import {SPI_GetAdvertisemenetFavorites,SPI_DeleteFavorite,SPI_GetAdvertisementsBySeller,SPI_GetIdAdvertisement,SPI_GetCategorys,SPI_DeletePulledApart,SPI_UpdateAdvertisementAvaible,SPI_UpdateProductAvaible,SPI_getAdvertisements,SPI_getAdvertisementPulledApart,SPI_getAdvertisementByCategory,SPI_getAvertisementByTianguis,SPI_updateProcutSelled,SPI_advertisementSelled,SPI_UpdateStatusProduct,SPI_getIdProduct,SPI_UpdateStatusPulledApart,SPI_addAvertisementPulledApart,SPI_registerAdvertisement,SPI_registerProduct,SPI_getNameProduct,SPI_addFavoriteProduct,SPI_getAdvertisementById} from "../Procedures/advertisement.js";


const bufferToStream = (buffer) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
  };

  const addAdvertisement = async(req,res)=>{
    const connection = await getConnection();
    if (!req.file || !req.file.buffer) {
        res.send("No hay imagen");
    }else{
        try{
            const bufferStream = bufferToStream(req.file.buffer);
            const drive = google.drive({ version: 'v3', auth });
            const { adsData } = req.body;
            const { estatusAnuncio,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio
                ,idVendedorAnuncio,idCategoriaAnuncio} = JSON.parse(adsData);
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
            const fileDetails = await drive.files.get({
                fileId: response.data.id,
                fields: 'webContentLink',
            });
            const fileWebContentLink = fileDetails.data.webContentLink;
            console.log("Si llega");
            const imageUrl = response.data.id;
            const estadoProducto = estatusAnuncio;
            const nombreProducto = nombreAnuncio;
            const producto = {estadoProducto, nombreProducto}
            const result = await connection.query(SPI_registerProduct,producto);
            const resultProducto = await connection.query(SPI_getNameProduct,nombreAnuncio);
            const idProducto = resultProducto[0][0].idProducto;
            const anuncio = {estatusAnuncio,fotoAnuncio: imageUrl,cantidadAnuncio,precioAnuncio,qrAnuncio,nombreAnuncio,idTianguisAnuncio,idProductoAnuncio: idProducto
                ,idVendedorAnuncio,idCategoriaAnuncio};    
            const resultAnuncio = await connection.query(SPI_registerAdvertisement,anuncio);  
            const [id] = await connection.query(SPI_GetIdAdvertisement,imageUrl);
            res.json({ message: "Anuncio Registrado con exito",idTianguisAnuncio: id[0].idAnuncio});
        }catch(error){
            res.status(500);
            res.send(error.message);
            console.log(error);
        }finally{
            closeConnection(connection);
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


const addAdvertisementPulledApart = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idAnuncioApartado,idCompradorApartado}= req.body;
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
    }finally{
        closeConnection(connection);
    }
}

const updateAdvertisementSelled = async(req,res)=>{
    const connection = await getConnection();
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
    }finally{
        closeConnection(connection);
    }
}

const getAdvertisementId = async(req,res)=>{
    try{
        const {idAnuncioFav} = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(SPI_getAdvertisementById,idAnuncioFav);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(result.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData[0]);
        closeConnection(connection);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getAdvertisementByTianguis = async (req, res) => {
    try {
        const { idTianguisAnuncio } = req.params;
        const connection = await getConnection();
        const [results] = await connection.query(SPI_getAvertisementByTianguis, idTianguisAnuncio);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
        closeConnection(connection);
    } catch (error) {
        res.status(500).send(error.message);
        console.error(error);
    }
};



const getAdvertisementByCategory = async(req,res)=>{
    try{
        const {idCategoriaAnuncio} = req.params;
        const connection = await getConnection();
        const [results] = await connection.query(SPI_getAdvertisementByCategory,idCategoriaAnuncio);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
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
        const [results] = await connection.query(SPI_getAdvertisementPulledApart,idComprador);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getAdvertisements = async(req,res)=>{
    const connection = await getConnection();
    try{
        const [results] = await connection.query(SPI_getAdvertisements);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getAdvertisementsPulledApartSeller = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idVendedor} = req.params;
        const [results] = await connection.query(SPI_getAdvertisements,idVendedor);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const updateProductAvaible = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idAnuncio}= req.body;
        const connection = await getConnection();
        const [idProduct] = await connection.query(SPI_getIdProduct,idAnuncio);
        const apart = await connection.query(SPI_UpdateAdvertisementAvaible,idAnuncio);
        const producto = await connection.query(SPI_UpdateProductAvaible,idProduct[0].idProductoAnuncio);
        await connection.query(SPI_DeletePulledApart,idAnuncio);
        res.json("Producto Actualizado a Disponible");
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getCategorys = async(req,res)=>{
    const connection = await getConnection();
    try{
        const [result] = await connection.query(SPI_GetCategorys);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getAdvertisementBySeller = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idVendedorAnuncio} = req.params;
        const [results] = await connection.query(SPI_GetAdvertisementsBySeller,idVendedorAnuncio);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const deleteFavoriteAdvertisement = async(req,res)=>{
    const connection = await getConnection();
    try{
        const {idCompradorFav, idAnuncioFav} = req.body;
        const result = await connection.query(SPI_DeleteFavorite,[idCompradorFav,idAnuncioFav]);
        res.json("Anuncio quitado de favoritos");
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

const getAdvertisementsFavorites = async(req,res) =>{
    const connection = await getConnection();
    try{
        const {idCompradorFav} = req.params;
        const [results] = await connection.query(SPI_GetAdvertisemenetFavorites,idCompradorFav);
        const drive = google.drive({ version: 'v3', auth });
        const responseData = await Promise.all(results.map(async (result) => {
            const imageResponse = await drive.files.get({
                fileId: result.fotoAnuncio,
                alt: 'media',
            }, { responseType: 'arraybuffer' });
            result.fotoAnuncio = Buffer.from(imageResponse.data).toString('base64');
            return result;
        }));
        res.setHeader('Content-Type', 'application/json');
        res.json(responseData);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }finally{
        closeConnection(connection);
    }
}

export const methods = {
    getAdvertisementsFavorites,
    deleteFavoriteAdvertisement,
    getAdvertisementBySeller,
    getCategorys,
    addAdvertisement,
    addFavoriteProduct,
    getAdvertisementId,
    addAdvertisementPulledApart,
    updateAdvertisementSelled,
    getAdvertisementByTianguis,
    getAdvertisementByCategory,
    getAdvertisementPulledApart,
    getAdvertisements,
    getAdvertisementsPulledApartSeller,
    updateProductAvaible
};
