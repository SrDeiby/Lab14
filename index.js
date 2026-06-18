import express from "express";
import { cwd } from "node:process";

import { getAll } from "./routes/albumes/getAll.js";
import { getAlbum } from "./routes/albumes/getAlbum.js"; 
import { random } from "./routes/albumes/random.js";
import { search } from "./routes/albumes/search.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";  
import { post } from "./routes/albumes/post.js";
import { put } from "./routes/albumes/put.js";
import { del } from "./routes/albumes/delete.js";

const app = express();

const HOST = "localhost";
const PORT = 4321;

app.use(express.json());  // ← aquí, antes de todo
app.use("/imagenes", express.static(`${cwd()}/imagenes`));

app.get("/", (req, res) => res.json({
  nombre: "Albumes API",
  version: "1.0",
  rutas: [
    { metodo: "GET",    ruta: "/albumes",        descripcion: "Lista todos los albumes (slugs). Usar ?include=full para datos completos" },
    { metodo: "GET",    ruta: "/album/:slug",     descripcion: "Detalle de un album por slug" },
    { metodo: "GET",    ruta: "/genero/:genero",  descripcion: "Albums por genero" },
    { metodo: "GET",    ruta: "/random",          descripcion: "Un album aleatorio" },
    { metodo: "GET",    ruta: "/search/:text",    descripcion: "Buscar albums por texto (mínimo 3 caracteres)" },
    { metodo: "GET",    ruta: "/imagenes/:archivo", descripcion: "Imagen de un album" },
    { metodo: "POST",   ruta: "/albumes",         descripcion: "Crear un album" },
    { metodo: "PUT",    ruta: "/album/:slug",     descripcion: "Actualizar un album" },
    { metodo: "DELETE", ruta: "/album/:slug",     descripcion: "Eliminar un album" }
  ]
}));

app.get("/albumes", getAll);
app.get("/random", random);
app.get("/genero/:genero", getByGenero);
app.get("/album/:slug", getAlbum); 
app.get("/search/:text", search);
app.post("/albumes", post);
app.put("/album/:slug", put);
app.delete("/album/:slug", del);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;

app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`);
});