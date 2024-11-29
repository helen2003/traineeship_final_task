//Лучше назвать JwtPayload
export class TokenInfoInterface {
  sub: number;
  login: string;
  email: string;
  role: string;
}
