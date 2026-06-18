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
  slug:        z.string().min(1),
  resumen:     z.string().min(1),
  descripcion: z.string().min(1)
});

export const post = (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    console.log("Body recibido:", req.body);
    console.log("Errores Zod:", result.error.issues);
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const nuevo = album.create(result.data);
  if (!nuevo) return res.status(409).json({ error: "Ya existe un album con ese slug" });

  res.status(201)
     .header("Location", `/album/${nuevo.slug}`)
     .json(nuevo);
};