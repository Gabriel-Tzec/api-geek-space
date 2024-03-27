const express = require("express");
const router = express.Router();
const Character = require("../models/character");

router.get("/characters", (req, res) => {
  Character.findAll()
    .then((characters) => res.json(characters))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/characters", async (req, res) => {
  try {
    const { kind, name, description, image, species, isFavorite } = req.body;
    const newCharacter = await Character.create({
      kind,
      name,
      description,
      image,
      species,
      isFavorite,
    });
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un personaje
router.delete("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }
    await character.destroy();
    res.json({ message: "Personaje eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un personaje
router.put("/characters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { kind, name, description, image, species, isFavorite } = req.body;
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }
    await character.update({
      kind,
      name,
      description,
      image,
      species,
      isFavorite,
    });
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
