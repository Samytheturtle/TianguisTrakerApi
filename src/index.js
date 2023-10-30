import app from "./app.js";

const main=()=>{
    app.listen(app.get("port"));
    console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
};

main();
