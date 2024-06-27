import { CategoriaRepository } from '../../repositories/categoria';
import { ProdutoRepository } from '../../repositories/produto';
import { ProdutoController } from './controller';
import { ProdutoRouter } from './router';

const produtoController = new ProdutoController(
  new ProdutoRepository(),
  new CategoriaRepository(),
);
const produtoRouter = new ProdutoRouter(
  produtoController,
);

export { produtoRouter, produtoController };