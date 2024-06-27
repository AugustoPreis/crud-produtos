import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes/router';
import { Logger } from './utils/logger';
import { Database } from './database';

const app = express();
const PORT = parseInt(process.env.PORT);
const logger = new Logger();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

Database.initialize()
  .then(() => {
    app.listen(PORT).on('listening', () => {
      logger.message(`Servidor iniciado na porta ${PORT}`, 'start');
    });
  }).catch((err) => {
    logger.message(`Erro: ${err.message}`, 'start');
  });

export { app as server }