import { getConnection } from "../Datebase/dbConfig.js";
import{SPI_registerAdvertisement,SPI_registerProduct,SPI_getNameProduct} from "../Procedures/advertisement.js";

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

        res.json({ message: "Anuncio Registrado con exito"})


    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    addAdvertisement
};
