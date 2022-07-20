export default interface CreateUserTokenDTO {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}
