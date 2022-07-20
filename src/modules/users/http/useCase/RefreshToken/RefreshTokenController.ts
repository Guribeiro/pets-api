import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RefreshTokenUseCase from './RefreshTokenUseCase';

class RefreshSessionTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token_id } = request.body;

    const refreshToken = container.resolve(RefreshTokenUseCase);

    const { token, refresh_token } = await refreshToken.execute({
      refresh_token_id,
    });

    return response.json({ token, refresh_token });
  }
}

export default RefreshSessionTokenController;
