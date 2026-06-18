import * as album from "../../data/albumes.js";
import { z } from "zod";

const schema = z.object({
  titulo:      z.string().min(1),
  artista:     z.string().min(1),
  genero:      z.string().min(1),
  anio:   z.coerce.number().int(),
  sello:       z.string().min(1),
pistas: z.coerce.number().int().positive(),
  imagen:      z.string().min(1),
  resumen:     z.string().min(1),
  descripcion: z.string().min(1)
});

export const put = (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });

  const actualizado = album.update(req.params.slug, result.data);
  if (!actualizado) return res.status(404).json({ error: "Album no encontrado" });
  res.json(actualizado);
};