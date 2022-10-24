export const overstayFilterValue: any = {
  select: [
    {
      controlName: 'overstayStatus',
      controlKey: 'Статус',
      controlValue: [null, 'в обробці', 'підтверджено', 'прилаштовано'],
    },
  ],
  search: [
    { controlName: 'pet_id', placeholder: 'Введіть ID тварини', controlKey: 'ID тварини', type: 'text' },
    { controlName: 'clientName', placeholder: 'Введіть імʼя клієнта', controlKey: 'Імʼя клієнта', type: 'text' },
    { controlName: 'clientPhone', placeholder: 'Введіть телефон клієнта', controlKey: 'Телефон клієнта', type: 'text' },
  ],
  defValue: {
    overstayStatus: null,
    pet_id: null,
    clientName: null,
    clientPhone: null,
    active: 'createdAt',
    direction: 'DESC',
    limit: 10,
    page: 0,
  },
};
