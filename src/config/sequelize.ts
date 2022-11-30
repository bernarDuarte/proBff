import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Livro } from 'src/produtos/livro.model';

const logger = new Logger();

export const createDb = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const db = new Sequelize('livaria', 'admin', 'admin', {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        logging: (...msg) => console.log(msg[1]['type']),
      });
      db.addModels([Livro]);
      await db.sync();
      return db;
    },
  },
];
