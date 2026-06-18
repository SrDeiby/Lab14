import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../index.js";

const SLUG_SEMBRADO = "abbey-road";


const albumValido = {
  titulo: "Test Album",
  artista: "Test Artista",
  genero: "Rock",
  anio: 2000,
  sello: "Test Sello",
  pistas: 10,
  imagen: "test.avif",
  slug: "test-album",
  resumen: "Resumen de prueba.",
  descripcion: "Descripcion de prueba para el album de test."
};

describe("GET /albumes", () => {
  it("200 y arreglo que contiene un slug sembrado", async () => {
    const res = await request(app).get("/albumes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain(SLUG_SEMBRADO);
  });
});

describe("GET /album/:slug", () => {
  it("200 y el objeto del album con slug existente", async () => {
    const res = await request(app).get(`/album/${SLUG_SEMBRADO}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("slug", SLUG_SEMBRADO);
  });

  it("404 en JSON con slug inexistente", async () => {
    const res = await request(app).get("/album/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("GET /search/:text", () => {
  it("400 en JSON cuando el texto tiene menos de 3 caracteres", async () => {
    const res = await request(app).get("/search/ab");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /albumes", () => {
  it("201, cabecera Location y objeto creado con cuerpo válido", async () => {
    const res = await request(app).post("/albumes").send(albumValido);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("slug", albumValido.slug);
    expect(res.headers).toHaveProperty("location");
  });

  it("400 en JSON con cuerpo inválido", async () => {
    const res = await request(app).post("/albumes").send({ titulo: "Solo titulo" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("409 en JSON con slug duplicado", async () => {
    const res = await request(app).post("/albumes").send(albumValido);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error");
  });
});

describe("PUT /album/:slug", () => {
  it("200 y objeto actualizado con slug existente y datos válidos", async () => {
    const res = await request(app)
      .put(`/album/${albumValido.slug}`)
      .send({ ...albumValido, titulo: "Titulo Actualizado" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("titulo", "Titulo Actualizado");
  });

  it("404 en JSON con slug inexistente", async () => {
    const res = await request(app)
      .put("/album/no-existe")
      .send(albumValido);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("DELETE /album/:slug", () => {
  it("204 sin cuerpo con slug existente", async () => {
    const res = await request(app).delete(`/album/${albumValido.slug}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it("404 en JSON con slug inexistente", async () => {
    const res = await request(app).delete("/album/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});