import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/albumes.db`);

export const getAll = () => {
  const query = db.prepare("SELECT * FROM albumes");
  return query.all();
};

export const getBySlug = slug => {
  const query = db.prepare("SELECT * FROM albumes WHERE slug = ?");
  return query.get(slug);
};

export const getByAnio = anio => {
  const query = db.prepare("SELECT * FROM albumes WHERE anio = ?");
  return query.all(anio);
};

export const getByArtista = artista => {
  const query = db.prepare("SELECT slug FROM albumes WHERE LOWER(artista) = LOWER(?)");
  return query.all(artista);
};

export const getByGenero = genero => {
  const query = db.prepare("SELECT * FROM albumes WHERE LOWER(genero) = LOWER(?)");
  return query.all(genero);
};

export const getRandom = () => {
  const query = db.prepare("SELECT * FROM albumes ORDER BY RANDOM() LIMIT 1");
  return query.get();
};

export const search = text => {
  const query = db.prepare(`
    SELECT * FROM albumes 
    WHERE titulo    LIKE ? 
       OR artista   LIKE ? 
       OR genero    LIKE ? 
       OR sello     LIKE ?
  `);
  const param = `%${text}%`;
  return query.all(param, param, param, param);
};