import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { livroProviders } from './livro.providers';
import { LivroService } from './livro.service';
import { join } from 'path';

@Module({
  imports: [],
  controllers: [LivroController],
  exports: [LivroService],
  providers: [LivroService, ...livroProviders],
})
export class LivroModule {}
