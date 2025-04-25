import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { PostUserInput, PostUserOutput } from "../../../../core/user.interface";
import { postUserInputValidation } from "./user.schema";
import SignInUserUseCase from "../../../../core/use-cases/sign-in-user.use-case";
import SignUpUserUseCase from "../../../../core/use-cases/sign-up-user.use-case";

@Route("users")
@Tags("users")
export class UserController extends Controller {
  constructor() {
    super();
  }


  @Post('signin')
  @SuccessResponse(200)
  async signin(
    @Body() requestBody: PostUserInput
  ): Promise<PostUserOutput> {
    const inputDecoded = postUserInputValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw inputDecoded.error.toString()
    }

    const user = await new SignInUserUseCase().execute(inputDecoded.data.login, inputDecoded.data.password)

    if(user === 'USER_NOT_FOUND') {
      throw new Error("User not found")
    }
    
    return user
  }


  @Post('signup')
  @SuccessResponse(200)
  async signup(
    @Body() requestBody: PostUserInput
  ): Promise<PostUserOutput> {
    const inputDecoded = postUserInputValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw inputDecoded.error.toString()
    }

    const user = await new SignUpUserUseCase().execute(inputDecoded.data)

    if(user === 'USER_ALREADY_EXISTS') {
      throw new Error("User already exists")
    }
    
    return user
  }

}
