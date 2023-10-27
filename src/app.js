const express = require('express');


const app = express();
const port = 3000;
const SellerController = require("../src/Controllers/seller.js")

const routeSeller = require("../src/Routes/seller.js");
const routeBuyer = require("../src/Routes/buyer.js");
const login = require("../src/Routes/login.js");

app.use(express.json());
app.use(routeSeller);
app.use(routeBuyer);
app.use(login);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.use("/api/seller/",routeSeller);
app.use("/api/buyer/",routeBuyer);
app.use("/api/accsess/",login);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
