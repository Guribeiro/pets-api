import { inject, injectable } from 'tsyringe';
import { fromUnixTime, isAfter, addWeeks, getUnixTime } from 'date-fns';
import auth from '@config/auth';

import RefreshToken from '@modules/refreshToken/infra/typeorm/entities/RefreshToken';
import RefreshTokensRepository from '@modules/refreshToken/infra/typeorm/repositories/RefreshTokensRepository';
import JsonWebTokenProvider from '@modules/users/providers/JsonWebTokenProvider/implementations/JsonWebTokenProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  refresh_token_id: string;
}

interface Response {
  token: string;
  refresh_token?: RefreshToken;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository,

    @inject('JsonWebTokenProvider')
    private jsonWebTokenProvider: JsonWebTokenProvider,
  ) {}

  public async execute({ refresh_token_id }: IRequest): Promise<Response> {
    const refresh_token = await this.refreshTokensRepository.findOneById(
      refresh_token_id,
    );

    if (!refresh_token) {
      throw new AppError('invalid refresh token');
    }

    const refreshTokenExpiresInAsDate = fromUnixTime(refresh_token.expiresIn);

    const todayDate = new Date();

    const isRefreshTokenExpired = isAfter(
      refreshTokenExpiresInAsDate,
      todayDate,
    );

    const { secret, expiresIn } = auth.jwt;

    await this.refreshTokensRepository.findOneByUserId(refresh_token.user_id);

    const token = this.jsonWebTokenProvider.signToken({
      payload: {},
      secret,
      options: {
        subject: refresh_token.user_id,
        expiresIn,
      },
    });

    if (isRefreshTokenExpired) {
      const refreshTokenExpiresDate = addWeeks(new Date(), 2);

      const refreshTokenUnixTime = getUnixTime(refreshTokenExpiresDate);

      const newRefreshToken = await this.refreshTokensRepository.create({
        userId: refresh_token.user_id,
        expiresIn: refreshTokenUnixTime,
      });

      return {
        token,
        refresh_token: newRefreshToken,
      };
    }

    return {
      token,
    };
  }
}

export default RefreshTokenUseCase;
