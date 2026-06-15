import express from "express";
import { cwd } from "node:process";

import { getAll } from "./routes/albumes/getAll.js";
import { getAlbum } from "./routes/albumes/getAlbum.js"; 
import { random } from "./routes/albumes/random.js";
import { search } from "./routes/albumes/search.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";  

const app = express();

const HOST = "localhost";
const PORT = 4321;

app.use("/imagenes", express.static(`${cwd()}/imagenes`));

app.get("/", (req, res) => res.json({
  nombre: "Albumes  API",
  version: "1.0",
  rutas: [
    { metodo: "GET", ruta: "/albumes", descripcion: "Lista todos los mundiales (slugs). Usar ?include=full para datos completos" },
    { metodo: "GET", ruta: "/album/:slug", descripcion: "Detalle de un mundial por slug" },
    { metodo: "GET", ruta: "/genero/:genero", descripcion: "Slugs de ediciones ganadas por un país" },
    { metodo: "GET", ruta: "/random", descripcion: "Un mundial aleatorio" },
    { metodo: "GET", ruta: "/search/:text", descripcion: "Buscar mundiales por texto (mínimo 3 caracteres)" },
    { metodo: "GET", ruta: "/imagenes/:archivo", descripcion: "Imagen de un mundial" }
  ]
}));
app.get("/albumes", getAll);
app.get("/random", random);
app.get("/genero/:genero", getByGenero);
app.get("/album/:slug", getAlbum); 
app.get("/search/:text", search);
app.get("/album/:slug", getBySlug);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});



app.listen(PORT, HOST, () => {
  console.log(`Server at http://${HOST}:${PORT}/`);
});