const express = require('express');


const app = express();
const port = 3000;
const SellerController = require("../src/Controllers/seller.js")

const routeSeller = require("../src/Routes/seller.js");
const routeBuyer = require("../src/Routes/buyer.js");

app.use(express.json());
app.use(routeSeller);
app.use(routeBuyer);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use("/api/seller/",routeSeller);
app.use("/api/buyer/",routeBuyer);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
