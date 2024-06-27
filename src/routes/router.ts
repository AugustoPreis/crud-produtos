import { Router } from 'express';
import { categoriaRouter } from '../controllers/categoria';
import { produtoRouter } from '../controllers/produto';

const routes = Router();

routes.use('/categoria', categoriaRouter.router);
routes.use('/produto', produtoRouter.router);

export { routes };