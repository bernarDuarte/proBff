import { Livro } from './livro.model';

export const livroProviders = [
  {
    provide: 'LIVRO_REPOSITORY',
    useValue: Livro,
  },
];
