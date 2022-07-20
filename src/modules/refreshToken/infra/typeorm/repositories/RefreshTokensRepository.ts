import { Repository, getRepository } from 'typeorm';
import ICreateRefreshTokenDTO from '@modules/refreshToken/dtos/ICreateRefreshTokenDTO';
import RefreshToken from '@modules/refreshToken/infra/typeorm/entities/RefreshToken';
import IRefreshTokensRepository from '../../repositories/IRefreshTokensRepository';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = getRepository(RefreshToken);
  }

  public async create({
    userId,
    expiresIn,
  }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const refresh_token = this.repository.create({
      user_id: userId,
      expiresIn,
    });

    await this.repository.save(refresh_token);

    return refresh_token;
  }

  public async remove(refresh_token: RefreshToken): Promise<void> {
    await this.repository.remove(refresh_token);
  }

  public async findOneById(id: string): Promise<RefreshToken | undefined> {
    const refresh_token = await this.repository.findOne({ where: { id } });

    return refresh_token;
  }

  public async findOneByUserId(
    user_id: string,
  ): Promise<RefreshToken | undefined> {
    const refresh_token = await this.repository.findOne({ where: { user_id } });

    return refresh_token;
  }
}

export default RefreshTokensRepository;
