import { Router } from "express";
import { db } from "../db";

const router = Router();

/**
 * @openapi
 * /api/items:
 *   post:
 *     summary: Crear un item
 *     requestBody:
 *       description: Datos del item a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del item
 *               description:
 *                 type: string
 *                 description: Descripción del item
 *     responses:
 *       201:
 *         description: Item creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/items", (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO items (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, name, description });
    }
  });
});

/**
 * @openapi
 * /api/items:
 *   get:
 *     summary: Obtener todos los items
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/items", (_req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

/**
 * @openapi
 *   /api/items/{id}:
 *     get:
 *       summary: Obtener un item por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del item a obtener
 *       responses:
 *         200:
 *           description: Item obtenido
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Item'
 *         500:
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.get("/items/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM items WHERE id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

/**
 * @openapi
 *   /api/items/{id}:
 *     put:
 *       summary: Actualizar un item
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del item a actualizar
 *       requestBody:
 *         description: Datos del item a actualizar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del item
 *                 description:
 *                   type: string
 *                   description: Descripción del item
 *       responses:
 *         200:
 *           description: Item actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del item
 *                   name:
 *                     type: string
 *                     description: Nombre del item
 *                   description:
 *                     type: string
 *                     description: Descripción del item
 *         500:
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = `UPDATE items SET name = ?, description = ? WHERE id = ?`;
  db.run(query, [name, description, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id, name, description });
    }
  });
});

/**
 * @openapi
 *   /api/items/{id}:
 *     delete:
 *       summary: Eliminar un item
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del item a eliminar
 *       responses:
 *         200:
 *           description: Item eliminado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del item
 *         500:
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM items WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id });
    }
  });
});

export default router;
