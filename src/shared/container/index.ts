import { container } from 'tsyringe';
import '@modules/users/providers';

import IRefreshTokensRepository from '@modules/refreshToken/infra/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/refreshToken/infra/typeorm/repositories/RefreshTokensRepository';

import IUsersTokensRepository from '@modules/users/infra/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
