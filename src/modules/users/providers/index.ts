import { container } from 'tsyringe';

import IJsonWebTokenProvider from './JsonWebTokenProvider/models/IJsonWebTokenProvider';
import JsonWebTokenProvider from './JsonWebTokenProvider/implementations/JsonWebTokenProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IJsonWebTokenProvider>(
  'JsonWebTokenProvider',
  JsonWebTokenProvider,
);
