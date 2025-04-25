import { Request } from "express";
import { AuthenticatedContext } from "../../../core/ports/api.port";
import { container } from "tsyringe";
import { UserRepository } from "../../../core/ports/database.port";
import { ExistingUser, NotExistingUser } from "../../../core/entities/user.entity";


export async function expressAuthentication(
  request: Request, 
  _securityName: string, 
  _scopes: string[]
): Promise<AuthenticatedContext>{
  const token = extractTokenFromRequest(request)

  if(token === 'TOKEN_NOT_FOUND') {
    return Promise.reject(new Error('Token not found'))
  }

  const user = await getUserFromJwt(token)

  if(user === 'INVALID_TOKEN' || user === 'UNKNOWN_USER') {
    return Promise.reject(new Error('Invalid token'))
  }

  return Promise.resolve(user)
}


function verifyAndDecodeJwt(token: string): 'INVALID_TOKEN' | { id: string } {
  try {
    const notExistingUser = new NotExistingUser()
    return notExistingUser.verifyAndDecodeUserAccessToken(token)
  } catch {
    return 'INVALID_TOKEN'
  }
}

async function retrieveUserFormId(id: string): Promise<ExistingUser  | 'UNKNOWN_USER'> {
  const userRepository = container.resolve<UserRepository>('UserRepository')
  const user = await userRepository.findById(id)

  return user ?? 'UNKNOWN_USER'
} 


async function getUserFromJwt(token: string): Promise<'INVALID_TOKEN' | 'UNKNOWN_USER' | AuthenticatedContext> {

  const payload = verifyAndDecodeJwt(token)
  if(payload === 'INVALID_TOKEN') {
    return payload
  }

  const user = await retrieveUserFormId(payload.id)
  if(user === 'UNKNOWN_USER') {
    return user
  }

  return {
    userId: user.id,
  }
}

function extractTokenFromRequest(request: Request): string | 'TOKEN_NOT_FOUND' {
  const authorizationHeader = request.headers['authorization']

  if (!authorizationHeader) {
    return 'TOKEN_NOT_FOUND'
  }

  const token = authorizationHeader.split(' ')[1]

  if (!token) {
    return 'TOKEN_NOT_FOUND'
  }

  return token
}
