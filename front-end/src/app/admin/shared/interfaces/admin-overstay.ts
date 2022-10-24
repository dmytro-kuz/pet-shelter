import { Overstay } from 'src/app/data/interfaces/overstay';
import { OptionalFields } from './optional-fields';

export interface AdminOverstay extends Overstay, OptionalFields {
  petName: string;
  allOverstayDates: Array<number>;
}
