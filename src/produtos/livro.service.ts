import { Inject, Injectable, Scope } from '@nestjs/common';
import { Livro } from './livro.model';
import { CONTEXT, RpcException } from '@nestjs/microservices';
import { SaksLogging } from '@SaksLog/saks-logging/logger/SaksNestLogger';
import { cName } from '@SaksLog/saks-logging/decorators';
@Injectable({ scope: Scope.DEFAULT })
export class LivroService {
  constructor(
    @Inject('LIVRO_REPOSITORY')
    private livroModel: typeof Livro,
    @Inject(CONTEXT) private context,
  ) {}
  async getLivro(
    @cName() cpf: string,
    logger: SaksLogging,
  ): Promise<{ todos: Livro[] }> {
    console.log(this.context['context']['log']['params']);
    console.log(cpf, '===');
    logger.info('service');
    const todos = await this.livroModel.findAll();
    return { todos };
  }

  async getLivroById(id: number): Promise<Livro> {
    //this.logger.log('grpc request: get by id')
    try {
      const livro = await this.livroModel.findOne({ where: { id } });
      if (!livro) throw new RpcException('id not found');
      return livro;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async createLivro(livro: Livro, logger: SaksLogging): Promise<Livro> {
    //this.logger.log('grpc request: create pt 1');
    try {
      const livroExists = await this.livroModel.findOne({
        where: { id: livro.id },
      });
      //if (livroExists) throw new RpcException('id alterady exists');
      //logger.log('service', LivroService.name);
      logger.info('service', LivroService.name);
      await this.livroModel.create({ ...livro });
      return await this.getLivroById(livro.id);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async alterarLivro(livro: Livro): Promise<[number, Livro[]]> {
    return newFunction();
    function newFunction() {
      return this.livroModel.update(livro, {
        where: {
          id: livro.id,
        },
      });
    }
  }
  async apagarLivro(id: number) {
    const livro: Livro = await this.getLivroById(id);
    livro.destroy();
  }
}
