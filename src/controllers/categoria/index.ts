import { CategoriaRepository } from '../../repositories/categoria';
import { CategoriaController } from './controller';
import { CategoriaRouter } from './router';

const categoriaController = new CategoriaController(
  new CategoriaRepository(),
);
const categoriaRouter = new CategoriaRouter(
  categoriaController,
);

export { categoriaRouter, categoriaController };