export interface Overstay {
  _id?: string;
  pet_id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientInformation: string;
  overstayDates: Array<number>;
  overstayStatus: string;
}
