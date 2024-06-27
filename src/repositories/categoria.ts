import { Database } from '../database';
import { Categoria } from '../models/Categoria';

export class CategoriaRepository {
  private readonly repository = Database.getRepository(Categoria);

  async listar(ordem: string): Promise<Categoria[]> {
    const qb = this.repository
      .createQueryBuilder('cat')

    switch (ordem) {
      case 'id':
        qb.orderBy('cat.id');
        break;
      case 'dataCadastro':
        qb.orderBy('cat.dataCadastro');
        break;
      case 'descricao':
      default:
        qb.orderBy('cat.descricao');
    }

    return await qb
      .getMany();
  }

  async buscarPorId(id: number): Promise<Categoria> {
    return await this.repository
      .createQueryBuilder('cat')
      .where('cat.id = :id', { id })
      .getOne();
  }

  async salvar(categoria: Categoria): Promise<Categoria> {
    return await this.repository.save(categoria);
  }

  async deletarPorId(id: number): Promise<void> {
    await this.repository
      .createQueryBuilder('cat')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}