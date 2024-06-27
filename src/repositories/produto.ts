import { Database } from '../database';
import { Produto } from '../models/Produto';
import { IListagemProdutosParametros } from '../types/IListagemProdutosParametros';

export class ProdutoRepository {
  private readonly repository = Database.getRepository(Produto);

  async listar(params: IListagemProdutosParametros): Promise<Produto[]> {
    const qb = this.repository
      .createQueryBuilder('prod')
      .leftJoinAndSelect('prod.categoria', 'cat');

    switch (params.ordem) {
      case 'id':
        qb.orderBy('prod.id');
        break;
      case 'dataCadastro':
        qb.orderBy('prod.dataCadastro');
        break;
      case 'categoria':
        qb.orderBy('cat.descricao')
        break;
      case 'descricao':
      default:
        qb.orderBy('prod.descricao');
    }

    if (params.categoria) {
      qb.where('prod.categoria = :categoria', { categoria: params.categoria });
    }

    return await qb
      .getMany();
  }

  async buscarPorId(id: number): Promise<Produto> {
    return await this.repository
      .createQueryBuilder('prod')
      .where('prod.id = :id', { id })
      .getOne();
  }

  async salvar(produto: Produto): Promise<Produto> {
    return await this.repository.save(produto);
  }

  async deletarPorId(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('prod')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}