import * as album from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const result = album.getByGenero(req.params.genero);
  if (!result.length) return res.status(404).json({ error: "Ningún Álbum encontrado para ese género" });
  res.json(result);
};