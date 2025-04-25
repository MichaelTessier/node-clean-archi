import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { PostUserInput, PostUserOutput } from "../../../../core/user.interface";
import { postUserInputValidation } from "./user.schema";
import SignInUserUseCase from "../../../../core/use-cases/sign-in-user.use-case";
import SignUpUserUseCase from "../../../../core/use-cases/sign-up-user.use-case";
import { ConflictError, InvalidInputError, NotFoundError } from "../../error-handler";

@Route("users")
@Tags("users")
export class UserController extends Controller {
  constructor() {
    super();
  }

  @Post('signin')
  @SuccessResponse(200)
  @Response(400, "Invalid request params")
  @Response(404, "User not found")
  async signin(
    @Body() requestBody: PostUserInput
  ): Promise<PostUserOutput> {
    const inputDecoded = postUserInputValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw new InvalidInputError(inputDecoded.error.toString())
    }

    const user = await new SignInUserUseCase().execute(inputDecoded.data.login, inputDecoded.data.password)

    if(user === 'USER_NOT_FOUND') {
      throw new NotFoundError("USER_NOT_FOUND")
    }
    
    return user
  }


  @Post('signup')
  @SuccessResponse(200)
  @Response(400, "Invalid request params")
  @Response(409, "Already exists")
  async signup(
    @Body() requestBody: PostUserInput
  ): Promise<PostUserOutput> {
    const inputDecoded = postUserInputValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw new InvalidInputError(inputDecoded.error.toString())
    }

    const user = await new SignUpUserUseCase().execute(inputDecoded.data)

    if(user === 'USER_ALREADY_EXISTS') {
      throw new ConflictError("USER_ALREADY_EXISTS")
    }
    
    return user
  }

}
