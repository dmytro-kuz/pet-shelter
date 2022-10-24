import { AdoptFilterValue } from '../interfaces/adopt-filter-value';

export const adoptFilterValue: AdoptFilterValue = {
  select: [
    {
      controlName: 'adoptStatus',
      controlKey: 'Статус',
      controlValue: [null, 'в обробці', 'підтверджено'],
    },
  ],
  search: [
    { controlName: 'pet_id', placeholder: 'Введіть ID тварини', controlKey: 'ID тварини', type: 'text' },
    { controlName: 'clientName', placeholder: 'Введіть імʼя клієнта', controlKey: 'Імʼя клієнта', type: 'text' },
    { controlName: 'clientPhone', placeholder: 'Введіть телефон клієнта', controlKey: 'Телефон клієнта', type: 'text' },
  ],
  defValue: {
    adoptStatus: null,
    pet_id: null,
    clientName: null,
    clientPhone: null,
    active: 'createdAt',
    direction: 'DESC',
    limit: 10,
    page: 0,
  },
};
