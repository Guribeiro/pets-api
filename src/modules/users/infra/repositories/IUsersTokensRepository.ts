import CreateUserTokenDTO from '@modules/users/dtos/CreateUserTokenDTO';
import UserToken from '../typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  create(data: CreateUserTokenDTO): Promise<UserToken>;
}
