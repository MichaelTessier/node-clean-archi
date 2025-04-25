import { createHmac } from "crypto";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";


const ConfigSchema = z.object({
  salt: z.string().min(1),
  secret: z.string().min(1),
})

export type UserConfig = z.infer<typeof ConfigSchema>

abstract class User {
  protected readonly config: UserConfig
  constructor() {
    this.config = ConfigSchema.parse({
      salt: process.env.USER_SALT,
      secret: process.env.JWT_SECRET,
    })

  }
} 

interface ExistingUserConstructorArgs {
  id: string;
}

export class ExistingUser extends User{
  private _id: string;

  constructor({ id }: ExistingUserConstructorArgs) {
    super();
    this._id = id;
  }

  public signAndEncodeUserAccessToken(id: string): string {
    const token = sign({ sub: id }, this.config.secret, {
      expiresIn: 86400, // 24 hours
    });

    return token;
  }

  public get id(): string {
    return this._id;
  }
}
export class NotExistingUser extends User{
  constructor() {
    super();
  }

  public hashPassword(password: string): string {
    const hmac = createHmac('sha512', this.config.salt);
    hmac.update(password);

    const hashedPassword = hmac.digest('hex');
    
    return hashedPassword;
  }

  public verifyAndDecodeUserAccessToken(token: string): { id: string } {
    const { sub } = verify(token, this.config.secret)

    if(sub && typeof sub === 'string') {
      return { id: sub };
    }

    throw new Error('Invalid token');
  }
}
