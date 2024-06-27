import { DefaultRouter } from '../../middlewares/DefaultRouter';
import { CategoriaController } from './controller';

export class CategoriaRouter extends DefaultRouter {
  constructor(
    categoriaController: CategoriaController,
  ) {
    super();

    this.router.get('/listar', (req, res, next) => {
      categoriaController.listar(req, res, next);
    });

    this.router.get('/buscar', (req, res, next) => {
      categoriaController.buscarPorId(req, res, next);
    });

    this.router.post('/salvar', (req, res, next) => {
      categoriaController.salvar(req, res, next);
    });

    this.router.put('/atualizar', (req, res, next) => {
      categoriaController.atualizar(req, res, next);
    });

    this.router.delete('/deletar', (req, res, next) => {
      categoriaController.deletar(req, res, next);
    });
  }
}