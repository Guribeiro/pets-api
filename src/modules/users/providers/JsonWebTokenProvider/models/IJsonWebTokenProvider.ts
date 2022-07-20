import ISignDTO from '@modules/users/providers/JsonWebTokenProvider/dtos/ISignDTO';

interface IJsonWebTokenProvider {
  signToken(data: ISignDTO): string;
}

export default IJsonWebTokenProvider;
