import { NextFunction, Request, Response } from 'express';
import { CategoriaRepository } from '../../repositories/categoria';
import { Categoria } from '../../models/Categoria';

export class CategoriaController {
  constructor(
    private categoriaRepository: CategoriaRepository,
  ) { }

  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let ordem = 'descricao';

      if (['id', 'descricao', 'dataCadastro'].includes(req.query.ordem as string)) {
        ordem = req.query.ordem as string;
      }

      const categorias = await this.categoriaRepository.listar(ordem);

      res.status(200).json(categorias);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id || isNaN(Number(id))) {
        throw new Error('ID inválido');
      }

      const categoria = await this.categoriaRepository.buscarPorId(Number(id));

      if (!categoria) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }

      res.status(200).json(categoria);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao, observacao } = req.body;

      const categoria = new Categoria();

      if (typeof descricao != 'string' || descricao.trim() === '') {
        throw new Error('Descrição inválida');
      }

      categoria.descricao = descricao.trim();
      categoria.dataCadastro = new Date();

      if (typeof observacao === 'string' && observacao.trim() != '') {
        categoria.observacao = observacao.trim();
      }

      const categoriaSalva = await this.categoriaRepository.salvar(categoria);

      res.status(200).json(categoriaSalva);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, descricao, observacao } = req.body;

      if (!id || isNaN(Number(id))) {
        throw new Error('ID inválido');
      }

      const categoriaDB = await this.categoriaRepository.buscarPorId(Number(id));

      if (!categoriaDB) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }

      if (typeof descricao != 'string' || descricao.trim() === '') {
        throw new Error('Descrição inválida');
      }

      categoriaDB.descricao = descricao.trim();

      if (typeof observacao === 'string' && observacao.trim() != '') {
        categoriaDB.observacao = observacao.trim();
      }

      const categoriaSalva = await this.categoriaRepository.salvar(categoriaDB);

      res.status(200).json(categoriaSalva);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id || isNaN(Number(id))) {
        throw new Error('ID inválido');
      }

      const categoriaDB = await this.categoriaRepository.buscarPorId(Number(id));

      if (!categoriaDB) {
        throw new Error(`Categoria com ID ${id} não encontrada`);
      }

      await this.categoriaRepository.deletarPorId(Number(id));

      res.status(200).json(categoriaDB);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}