import { StringLiteral } from "typescript";
import { ExistingUser } from "../../../../core/entities/user.entity";
import { CreateUserInput, UserRepository } from "../../../../core/ports/database.port";
import { AppDataSource, isInitialized } from "../data-source";
import UserEntity from "./user.entity";


class TypeOrmUserRepository implements UserRepository {

    async create(input: CreateUserInput): Promise<ExistingUser | 'USER_ALREADY_EXISTS'> {
      await isInitialized()

      const isExist =  await AppDataSource.getRepository(UserEntity).exists({ where: { login: input.login } })

      if(isExist) {
        return 'USER_ALREADY_EXISTS'
      }

      const result = await AppDataSource.getRepository(UserEntity).insert(input)

      const identifier = result.identifiers[0]

      if(!identifier) {
        throw 'Error when creating user identifier'
      }

      const user = await AppDataSource.getRepository(UserEntity).findOne({
        where: { id: identifier.id }
      })

      if(!user) {
        throw 'Error when creating user'
      }

      return user.toDomainEntity()

    }

    async findByLoginAndPassword(login: string, password: string): Promise<ExistingUser | null> {
      await isInitialized()

      const user = await AppDataSource.getRepository(UserEntity).findOne({
        where: { login, password }
      })

      return user ? user.toDomainEntity() : null
    }

    async findById(id: string): Promise<ExistingUser | null> {
      await isInitialized()

      const user = await AppDataSource.getRepository(UserEntity).findOne({
        where: { id }
      })

      return user ? user.toDomainEntity() : null
    }
}


export default TypeOrmUserRepository;
