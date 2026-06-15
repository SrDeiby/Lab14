import * as album from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const result = album.getBySlug(req.params.slug);
  if (!result) return res.status(404).json({ error: "Álbum no encontrado" });
  res.json(result);
};