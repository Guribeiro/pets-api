import { Repository, getRepository } from 'typeorm';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository<User>(User);
  }

  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  public async findOneById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }
}

export default UsersRepository;
