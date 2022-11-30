import { DataType, Column, Table, Model } from 'sequelize-typescript';

@Table
export class Livro extends Model<Livro> {
  @Column({
    primaryKey: true,
    allowNull: false,
  })
  id: number;
  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  codigo: string;
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  nome: string;
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  preco: number;
}
