export interface AdminStatisticsFoodValue {
  sum: number;
  amount: number;
  list: AdminStatisticsFoodResValue[];
}
export interface AdminStatisticsDrugValue {
  sum: number;
  amount: number;
  list: AdminStatisticsDrugResValue[];
}
export interface AdminStatisticsFoodResValue {
  _id: string;
  type: string;
  name: string;
  price: number;
}
export interface AdminStatisticsDrugResValue {
  _id: string;
  name: string;
  price: number;
  status: string;
}
export interface AdminStatisticOptions {
  name: string;
  active: null;
  direction: null;
  limit: number;
  page: number;
}
export interface AdminStatisticsFilterValue {
  search: Array<{}>;
  defValue: any;
}
