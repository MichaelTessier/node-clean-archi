import { container } from "tsyringe";
import { Logger } from "../ports/logger.port";
import { UserRepository } from "../ports/database.port";
import { NotExistingUser } from "../entities/user.entity";

class SignInUserUseCase {
  private logger: Logger
  private userRepository: UserRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.userRepository = container.resolve<UserRepository>('UserRepository');
  }

  async execute(login: string, password: string): Promise<{accessToken: string} | 'USER_NOT_FOUND'> {
    this.logger.debug('[Sign-in use case] execute')

    const notExistingUser = new NotExistingUser()

    const existingUser = await this.userRepository.findByLoginAndPassword(login, notExistingUser.hashPassword(password));
    
    if(!existingUser) {
      this.logger.debug('[Sign-up use case] User not found')
      return 'USER_NOT_FOUND';
    }

    this.logger.debug('[Sign-up use case] User find')

    return { 
      accessToken: existingUser.signAndEncodeUserAccessToken(existingUser.id) 
    };

  }
}


export default SignInUserUseCase ;
