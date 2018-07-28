export class UserToken {
  public constructor(
    public token: string,
    public validTill: number
  ) {}
}
