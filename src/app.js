import express from "express";
import morgan from "morgan"

const app = express();

//Settings
app.set("port",3000);


//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Routes
import Routerlogin from "./Routes/login";
import RouterSeller from "./Routes/seller.js";
import RouterBuyer from "./Routes/buyer.js";
import RouterTianguis from "./Routes/tianguis.js";
import RouterAdvertisement from "./Routes/advertisement.js";



//Use Routes
app.get("/", (req, res) => {
  res.send("Bienvenido a nuestra api del Tianguis :D");
}); 

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

