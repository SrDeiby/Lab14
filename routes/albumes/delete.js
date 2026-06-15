import * as album from "../../data/albumes.js";

export const del = (req, res) => {
  const eliminado = album.remove(req.params.slug);
  if (!eliminado) return res.status(404).json({ error: "Album no encontrado" });
  res.json(eliminado);
};