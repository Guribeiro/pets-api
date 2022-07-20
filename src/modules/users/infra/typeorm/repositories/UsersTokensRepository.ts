import { Repository, getRepository } from 'typeorm';
import IUsersTokensRepository from '@modules/users/infra/repositories/IUsersTokensRepository';
import CreateUserTokenDTO from '@modules/users/dtos/CreateUserTokenDTO';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async create({
    user_id,
    expires_date,
    refresh_token,
  }: CreateUserTokenDTO): Promise<UserToken> {
    const user_token = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(user_token);

    return user_token;
  }
}

export default UsersTokensRepository;
