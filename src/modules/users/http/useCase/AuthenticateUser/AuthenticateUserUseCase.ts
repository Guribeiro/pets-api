import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import JsonWebTokenProvider from '@modules/users/providers/JsonWebTokenProvider/implementations/JsonWebTokenProvider';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('HashProvider')
    private hashProvider: BCryptHashProvider,

    @inject('JsonWebTokenProvider')
    private jsonWebTokenProvider: JsonWebTokenProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: UsersTokensRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('incorrect email/password');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = this.jsonWebTokenProvider.signToken({
      payload: {},
      secret,
      options: {
        subject: user.id,
        expiresIn,
      },
    });

    return {
      token,
      user,
    };
  }
}

export default AuthenticateUserUseCase;
