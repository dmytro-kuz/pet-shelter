export const statisticsFilterValueFood: any = {
  defValue: {
    name: '',
    limit: 10,
    page: 0,
    active: 'type',
    direction: 'desc',
  },

  search: [{ controlName: 'name', placeholder: 'Пошук виробника', controlKey: 'Пошук виробника', type: 'text' }],
};

export const statisticsFilterValueDrug: any = {
  defValue: {
    name: '',
    limit: 10,
    page: 0,
    active: 'name',
    direction: 'desc',
  },
  search: [{ controlName: 'name', placeholder: 'Пошук ліків', type: 'text', controlKey: 'Пошук ліків' }],
};
