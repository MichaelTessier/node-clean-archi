import { container } from "tsyringe";
import { Logger } from "../ports/logger.port";
import { UserRepository } from "../ports/database.port";
import { NotExistingUser } from "../entities/user.entity";
import { PostUserInput } from "../user.interface";

class SignUpUserUseCase {

  private logger: Logger
  private userRepository: UserRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.userRepository = container.resolve<UserRepository>('UserRepository');
  }

  async execute(input: PostUserInput): Promise<{accessToken: string} | 'USER_ALREADY_EXISTS'> {
    this.logger.debug('[Sign-up use case] execute')

    const { login, password } = input;

    const notExistingUser = new NotExistingUser()

    const existingUser = await this.userRepository.create({ login, password: notExistingUser.hashPassword(password) });
    
    if(existingUser === 'USER_ALREADY_EXISTS') {
      this.logger.debug('[Sign-up use case] User already exists')
      return existingUser;
    }
    this.logger.debug('[Sign-up use case] User created')

    return { 
      accessToken: existingUser.signAndEncodeUserAccessToken(existingUser.id) 
    };

  }
}


export default SignUpUserUseCase;
