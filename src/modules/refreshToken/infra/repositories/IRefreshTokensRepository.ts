import RefreshToken from '@modules/refreshToken/infra/typeorm/entities/RefreshToken';
import ICreateRefreshTokenDTO from '@modules/refreshToken/dtos/ICreateRefreshTokenDTO';

export default interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  remove(refresh_token: RefreshToken): Promise<void>;
  findOneById(id: string): Promise<RefreshToken | undefined>;
  findOneByUserId(user_id: string): Promise<RefreshToken | undefined>;
}
