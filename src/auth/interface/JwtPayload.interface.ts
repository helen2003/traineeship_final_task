import { RoleEnum } from '@prisma/client';

export class JwtPayloadInterface {
  sub: number;
  login: string;
  email: string;
  role: RoleEnum;
}
