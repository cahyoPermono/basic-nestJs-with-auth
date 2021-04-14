import { CoreOutput } from 'src/common/dtos/output.dto';

export class LoginOutput extends CoreOutput {
  access_token: string;
}
