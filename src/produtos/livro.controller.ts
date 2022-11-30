import { Livro } from './livro.model';
import { Controller, Inject, Scope } from '@nestjs/common';
import { LivroService } from './livro.service';
import { CONTEXT, GrpcMethod } from '@nestjs/microservices';
import { GrpcMetadata } from '@SaksLog/saks-logging/logger/GrpcMetadata';
import { cName } from '@SaksLog/saks-logging/decorators';
import { userInfo } from 'os';
@Controller({
  path: 'livro',
})
export class LivroController {
  constructor(
    private livroService: LivroService,
    @Inject(CONTEXT) private context,
  ) {}

  @GrpcMethod('LivrariaService', 'getLivro')
  async obterTodos(
    data: { cpf: string },
    metadata: GrpcMetadata,
  ): Promise<{ todos: Livro[] }> {
    console.log(this.context);
    metadata.log.log('hello', LivroController.name);
    return this.livroService.getLivro(data.cpf, metadata.log);
  }
  // @GrpcMethod('LivrariaService', 'getLivroById')
  // async obterProdutoPelaId({ uid }: { uid: number }): Promise<Livro> {
  //   return this.livroService.getLivroById(uid);
  // }
  // @GrpcMethod('LivrariaService', 'createLivro')
  // async createLivro(livro: Livro, metadata: GrpcMetadata): Promise<Livro> {
  //   return this.livroService.createLivro(livro, metadata.log);
  // }

  // @Put()
  // async alterarProduto(@Body() produto: Livro) {
  //   return this.livroService.alterarLivro(produto);
  // }
  // @Delete(':id')
  // async deleteProduto(@Param() params) {
  //   return this.livroService.apagarLivro(params.id);

  // }
}
