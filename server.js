const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./connect");
const Character = require("./models/character");
const dotenv = require("dotenv");
const cors = require("cors");
const charactersRouter = require("./routes/characters");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.local" });
}

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", charactersRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos conectada y modelos sincronizados");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
