import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express + SQLite API",
      version: "1.0.0",
      description: "Documentación generada con Swagger y ReDoc",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Item: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del item",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nombre del item",
              example: "Item 1",
            },
            description: {
              type: "string",
              description: "Descripción del item",
              example: "Descripción del item 1",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensaje de error",
              example: "Error interno del servidor",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
});
