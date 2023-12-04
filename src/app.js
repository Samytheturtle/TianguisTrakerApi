import express from "express";
import morgan from "morgan";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();
const cors = require('cors');
//Settings
app.set("port",3000);


//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Routes
import Routerlogin from "./Routes/login";
import RouterSeller from "./Routes/seller.js";
import RouterBuyer from "./Routes/buyer.js";
import RouterTianguis from "./Routes/tianguis.js";
import RouterAdvertisement from "./Routes/advertisement.js";

//swagger

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Tianguis API',
      version: '1.0.0',
      description: 'API for Tianguis',
    },
  },
  apis: ['./Routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//Use Routes
app.get("/", (req, res) => {
  res.send("Bienvenido a nuestra api del Tianguis :D");
}); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/access/",Routerlogin);
app.use("/api/Seller",RouterSeller);
app.use("/api/Buyer",RouterBuyer);
app.use("/api/tianguis",RouterTianguis);
app.use("/api/advertisement",RouterAdvertisement);

/*app.use(Routerlogin);

app.use(routeSeller);
app.use(routeBuyer);


app.use("/api/seller/",routeSeller);
app.use("/api/buyer/",routeBuyer);
*/

export default app;

