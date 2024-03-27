const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./connect");
const Character = require("./models/character");
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.local" });
}

const app = express();
const PORT = process.env.PORT;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const allowOnlyFrom = (allowedOrigin) => {
  return (req, res, next) => {
    const origin = req.get("origin");
    if (origin && origin === ALLOWED_ORIGIN) {
      return next();
    } else {
      return res.status(403).json({ error: "Acceso no permitido" });
    }
  };
};

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos conectada y modelos sincronizados");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/characteres", (req, res) => {
  Character.findAll()
    .then((characteres) => res.json(characteres))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ALTAS
app.post("/api/character", (req, res) => {
  //const { name } = req.body; examplo
  Character.create({
    kind: "Human",
    name: "Rick Sanchez",
    description: "A mad scientist who s the father of Morty Smith.",
    image: "https://example.com/rick.jpg",
    species: "Human",
    isFavorite: false,
  })
    .then((newFavorite) => res.status(201).json(newFavorite))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// BAJAS
app.delete("/api/characters/:id", (req, res) => {
  const id = req.params.id;
  Character.findByPk(id)
    .then((character) => {
      if (!character) {
        return res.status(404).json({ message: "Personaje no encontrado" });
      }
      return character.destroy();
    })
    .then(() => res.json({ message: "Personaje eliminado exitosamente" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// CAMBIOS
app.put("/api/characters/:id", (req, res) => {
  const id = req.params.id;
  const { kind, name, description, image, species, isFavorite } = req.body;
  Character.findByPk(id)
    .then((character) => {
      if (!character) {
        return res.status(404).json({ message: "Personaje no encontrado" });
      }
      return character.update({
        kind,
        name,
        description,
        image,
        species,
        isFavorite,
      });
    })
    .then((updatedCharacter) => res.json(updatedCharacter))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
