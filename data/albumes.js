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

export const create = (album) => {
  const existe = getBySlug(album.slug);
  if (existe) return null;
  const query = db.prepare(`
    INSERT INTO albumes (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
    VALUES (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
  `);
  query.run(album);
  return getBySlug(album.slug);
};

export const update = (slug, datos) => {
  const query = db.prepare(`
    UPDATE albumes SET
      titulo      = :titulo,
      artista     = :artista,
      genero      = :genero,
      anio        = :anio,
      sello       = :sello,
      pistas      = :pistas,
      imagen      = :imagen,
      resumen     = :resumen,
      descripcion = :descripcion
    WHERE slug = :slug
  `);
  query.run({ ...datos, slug });
  return getBySlug(slug);
};

export const remove = slug => {
  const album = getBySlug(slug);
  if (!album) return null;
  const query = db.prepare("DELETE FROM albumes WHERE slug = ?");
  query.run(slug);
  return album;
};