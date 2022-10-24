export interface Pet {
  _id?: string;
  name: string;
  type: string;
  breed?: string;
  sex: string;
  birthDate: number;
  size: string;
  description: string;
  status: string;
  overstayDates: Array<number>;
  photos: Array<any>;
  __v?: number;
}

//birthDate - approximate date of birth, which will be used to calculate age
