import * as album from "../../data/albumes.js";
import { z } from "zod";

const schema = z.object({
  text: z.string().min(3, "El texto de búsqueda debe tener al menos 3 caracteres")
});

export const search = (req, res) => {
  const validation = schema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues[0].message });
  }

  const result = album.search(req.params.text);
  if (!result.length) return res.status(404).json({ error: "Sin resultados" });
  res.json(result);
};