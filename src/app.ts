import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

const app = express();
const env = NODE_ENV || 'development';
const port = PORT || 3000;

export const startListening = () => {
  app.listen(port, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${env} =======`);
    logger.info(`🚀 App listening on the port ${port}`);
    logger.info(`=================================`);
  });
};

export const initializeMiddlewares = () => {
  app.use(morgan(LOG_FORMAT, { stream }));
  app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};
export const initializeRoutes = (routers: Router[]) => {
  routers.forEach(router => {
    app.use('/', router);
  });
};

export const initializeSwagger = () => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'REST API',
        version: '1.0.0',
        description: 'Example docs',
      },
    },
    apis: ['swagger.yaml'],
  };
  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
export const initializeErrorHandling = () => {
  app.use(ErrorMiddleware);
};
