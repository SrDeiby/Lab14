import * as album from "../../data/albumes.js";

export const random = (req, res) => {
  res.json(album.getRandom());
};