import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './Categoria';

@Entity({ name: 'produto' })
export class Produto {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'preco', type: 'numeric', precision: 2 })
  preco: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria' })
  categoria: Categoria;

  @Column({ name: 'data_cadastro' })
  dataCadastro: Date;
}