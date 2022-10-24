import { PetFilterValue } from '../interfaces/pet-filter-value';

export const petFilterValue: PetFilterValue = {
  select: [
    {
      controlName: 'type',
      controlKey: 'Вид',
      controlValue: [null, 'Собака', 'Кіт'],
    },
    {
      controlName: 'size',
      controlKey: 'Розмір',
      controlValue: [null, 'Малий', 'Середній', 'Великий'],
    },
    {
      controlName: 'sex',
      controlKey: 'Стать',
      controlValue: [null, 'Він', 'Вона'],
    },
    {
      controlName: 'age',
      controlKey: 'Вік',
      controlValue: [null, 'до 1 року', '2 - 5 років', 'більше 5-ти років'],
    },
    {
      controlName: 'status',
      controlKey: 'Статус',
      controlValue: [null, 'Живий', 'Прилаштований', 'Мертвий'],
    },
  ],
  search: [
    {
      controlName: 'name',
      placeholder: 'Введіть імʼя тварини',
      controlKey: 'Пошук',
      type: 'text',
    },
  ],
  defValue: {
    type: null,
    size: null,
    sex: null,
    age: null,
    name: null,
    status: null,
    active: null,
    direction: null,
    limit: 10,
    page: 0,
  },
};
