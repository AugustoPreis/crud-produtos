import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'data_cadastro' })
  dataCadastro: Date;
}