import { Adopt } from 'src/app/data/interfaces/adopt';
import { OptionalFields } from './optional-fields';

export interface AdminAdopt extends Adopt, OptionalFields {
  petName: string;
}
