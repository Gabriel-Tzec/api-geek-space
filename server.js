const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./connect");
const Character = require("./models/character");
const dotenv = require("dotenv");
const cors = require('cors');

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.local" });
}

const app = express();

app.use(cors());

const PORT = process.env.PORT;

sequelize.sync()
  .then(() => {
    console.log("Base de datos conectada y modelos sincronizados");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/characters", (req, res) => {
  Character.findAll()
    .then((characters) => res.json(characters))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});