import * as album from "../../data/albumes.js";

export const getAll = (req, res) => {
  const isFull = req.query.include === "full";
  const contents = isFull
    ? album.getAll()
    : album.getAll().map(item => item.slug);
  res.json(contents);
};