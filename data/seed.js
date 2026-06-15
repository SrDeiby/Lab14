import { DatabaseSync } from "node:sqlite";
import data from "./data.json" with { type: "json" };
import { cwd } from "node:process";
import { readFileSync } from "node:fs";

const DATABASE_FILE = `${cwd()}/data/albumes.db`;
const CREATE_SCRIPT = `${cwd()}/data/CREATE.SQL`;

const db = new DatabaseSync(DATABASE_FILE);
const sql = readFileSync(CREATE_SCRIPT, "utf-8");
db.exec(sql);

const insert = db.prepare(/* SQL */`
  INSERT INTO albumes 
    (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
  VALUES 
    (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
`);

for (const album of data) {
  insert.run(album);
}

console.log("Base de datos creada y poblada con éxito.");