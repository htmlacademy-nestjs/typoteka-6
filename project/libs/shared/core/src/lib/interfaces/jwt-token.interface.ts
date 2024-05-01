export interface JwtToken {
  id?: string;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}
