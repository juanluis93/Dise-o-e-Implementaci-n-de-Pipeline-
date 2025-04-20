import request from "supertest";
import express from "express";
import { db } from "../db"; // ajusta si está en otro nivel
import itemsRouter from "./items";
// asegúrate que la ruta es correcta y apunta al archivo correcto


// Setup Express app
const app = express();
app.use(express.json());
app.use("/api", itemsRouter);

beforeAll((done) => {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)", done);
  });
});

afterAll((done) => {
  db.run("DROP TABLE IF EXISTS items", () => {
    db.close(done);
  });
});

describe("API /api/items", () => {
  let createdItemId = 0;

  it("POST /api/items - crea un nuevo item", async () => {
    const response = await request(app)
      .post("/api/items")
      .send({ name: "Item Test", description: "Descripción de prueba" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Item Test");

    createdItemId = response.body.id;
  });

  it("GET /api/items - obtiene todos los items", async () => {
    const response = await request(app).get("/api/items");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/items/:id - obtiene un item por id", async () => {
    const response = await request(app).get(`/api/items/${createdItemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdItemId);
  });

  it("PUT /api/items/:id - actualiza un item", async () => {
    const response = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: "Item Actualizado", description: "Nueva descripción" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Item Actualizado");
  });

  it("DELETE /api/items/:id - elimina un item", async () => {
    const response = await request(app).delete(`/api/items/${createdItemId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdItemId.toString());
  });
  
});
