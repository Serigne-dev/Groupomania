const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
const employesRoutes = require("./routes/employes"); // importe le routeur user
const articleRoutes = require("./routes/article");
const path = require('path');



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use("/auth", employesRoutes);// enregistrement de la route user
app.use("/forum", articleRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));



module.exports = app;