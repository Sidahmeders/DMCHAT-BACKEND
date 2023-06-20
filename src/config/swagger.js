const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DMCHAT API',
      version: '1.0.0',
      description: 'API documentation for the DMCHAT platform',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        JWTAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        JWTAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/routes/login.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = function setupSwagger(app) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        authActions: {
          apiKeyAuth: {
            name: 'Authorization',
            schema: {
              type: 'apiKey',
              in: 'header',
              description: 'Bearer token',
            },
            value: 'Bearer <JWT token>',
          },
        },
      },
    }),
  )
}
