import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

export const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error al abrir la base de datos:", err.message);
  } else {
    console.log("Conectado a SQLite");

    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creando tabla:", err.message);
        } else {
          console.log("Tabla `items` lista");
        }
      }
    );
  }
});
