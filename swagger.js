// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My travel management API",
    version: "1.0.0",
    description: "This is the backend for the travel management project",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "./app/routes/**/*.js"), // Recursive scan
    path.join(__dirname, "./app/routes/*.js"), // Root level routes
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
