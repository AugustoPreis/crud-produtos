import { NextFunction, Request, Response } from 'express';
import { ProdutoRepository } from '../../repositories/produto';
import { CategoriaRepository } from '../../repositories/categoria';
import { Produto } from '../../models/Produto';

export class ProdutoController {
  constructor(
    private produtoRepository: ProdutoRepository,
    private categoriaRepository: CategoriaRepository,
  ) { }

  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { ordem, categoria } = req.query;

      const params = {
        ordem: 'descricao',
        categoria: null,
      }

      if (['id', 'descricao', 'dataCadastro', 'categoria'].includes(ordem as string)) {
        params.ordem = ordem as string;
      }

      if (categoria && !isNaN(Number(categoria))) {
        params.categoria = Number(categoria);

        const categoriaDB = await this.categoriaRepository.buscarPorId(params.categoria);

        if (!categoriaDB) {
          throw new Error(`Categoria com o ID ${categoria} não encontrada`);
        }
      }

      const produtos = await this.produtoRepository.listar(params);

      res.status(200).json(produtos);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async buscar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id || isNaN(Number(id))) {
        throw new Error('ID inválido');
      }

      const produto = await this.produtoRepository.buscarPorId(Number(id));

      if (!produto) {
        throw new Error(`Produto com o ID ${id} não encontrado`);
      }

      res.status(200).json(produto);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao, preco, categoria } = req.body;

      if (typeof descricao !== 'string' || descricao.trim() === '') {
        throw new Error('Descrição inválida');
      }

      if (!preco || isNaN(Number(preco)) || preco < 0) {
        throw new Error('Preço inválido');
      }

      if (!categoria || isNaN(Number(categoria))) {
        throw new Error('Categoria inválida');
      }

      const categoriaDB = await this.categoriaRepository.buscarPorId(Number(categoria));

      if (!categoriaDB) {
        throw new Error(`Categoria com o ID ${categoria} não encontrada`);
      }

      const produto = new Produto();

      produto.descricao = descricao.trim();
      produto.preco = Number(preco);
      produto.categoria = categoriaDB;
      produto.dataCadastro = new Date();

      const produtoSalvo = await this.produtoRepository.salvar(produto);

      res.status(200).json(produtoSalvo);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, descricao, preco, categoria } = req.body;

      if (!id || isNaN(Number(id))) {
        throw new Error('ID inválido');
      }

      const produtoDB = await this.produtoRepository.buscarPorId(Number(id));

      if (!produtoDB) {
        throw new Error(`Produto com o ID ${id} não encontrado`);
      }

      if (typeof descricao !== 'string' || descricao.trim() === '') {
        throw new Error('Descrição inválida');
      }

      if (!preco || isNaN(Number(preco)) || preco < 0) {
        throw new Error('Preço inválido');
      }

      if (!categoria || isNaN(Number(categoria))) {
        throw new Error('Categoria inválida');
      }

      const categoriaDB = await this.categoriaRepository.buscarPorId(Number(categoria));

      if (!categoriaDB) {
        throw new Error(`Categoria com o ID ${categoria} não encontrada`);
      }

      produtoDB.descricao = descricao.trim();
      produtoDB.preco = Number(preco);
      produtoDB.categoria = categoriaDB;

      const produtoSalvo = await this.produtoRepository.salvar(produtoDB);

      res.status(200).json(produtoSalvo);
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

      const produtoDB = await this.produtoRepository.buscarPorId(Number(id));

      if (!produtoDB) {
        throw new Error(`Produto com o ID ${id} não encontrado`);
      }

      await this.produtoRepository.deletarPorId(Number(id));

      res.status(200).json(produtoDB);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}