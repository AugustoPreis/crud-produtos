import { DefaultRouter } from '../../middlewares/DefaultRouter';
import { ProdutoController } from './controller';

export class ProdutoRouter extends DefaultRouter {
  constructor(
    produtoController: ProdutoController,
  ) {
    super();

    this.router.get('/listar', (req, res, next) => {
      produtoController.listar(req, res, next);
    });

    this.router.get('/buscar', (req, res, next) => {
      produtoController.buscar(req, res, next);
    });

    this.router.post('/salvar', (req, res, next) => {
      produtoController.salvar(req, res, next);
    });

    this.router.put('/atualizar', (req, res, next) => {
      produtoController.atualizar(req, res, next);
    });

    this.router.delete('/deletar', (req, res, next) => {
      produtoController.deletar(req, res, next);
    });
  }
}