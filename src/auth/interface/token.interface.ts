import { ApiProperty } from "@nestjs/swagger";

export class TokenInterface {
  @ApiProperty({description: 'Access токен' })
  accessToken: string;

  @ApiProperty({description: 'Refresh токен' })
  refreshToken: string
}
