import { AdminPetFilterOptions } from './admin-pet-filter-options';

export interface PetFilterValue {
  select: Array<{}>;
  search: Array<{}>;
  defValue: AdminPetFilterOptions;
}
