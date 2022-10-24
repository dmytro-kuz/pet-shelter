import { DonateFilterValue } from '../interfaces/donate-filter-value';

export const donateFilterValue: DonateFilterValue = {
  datapicker: [
    {
      type: 'string',
      controlKey: 'interval',
      controlNameFrom: 'intervalDateFrom',
      controlNameTo: 'intervalDateTo',
      label: 'Введіть інтервал дат',
      placeholderFrom: 'MM/DD/YYYY–',
      placeholderTo: 'MM/DD/YYYY',
    },
  ],
  defValue: {
    intervalDateFrom: null,
    intervalDateTo: null,
    active: 'createDate',
    direction: 'DESC',
    limit: 10,
    page: 0,
  },
};
