export const petModalFormValue = {
  input: [
    {
      controlName: 'name',
      controlKey: 'Імʼя',
      placeholder: 'Введіть імʼя тварини',
      type: 'text',
    },
    {
      controlName: 'breed',
      controlKey: 'Порода',
      placeholder: 'Введіть породу',
      type: 'text',
    },
  ],
  select: [
    {
      controlName: 'type',
      controlKey: 'Вид',
      controlValue: ['Собака', 'Кіт'],
    },
    {
      controlName: 'size',
      controlKey: 'Розмір',
      controlValue: ['Малий', 'Середній', 'Великий'],
    },
    {
      controlName: 'sex',
      controlKey: 'Стать',
      controlValue: ['Він', 'Вона'],
    },
    {
      controlName: 'status',
      controlKey: 'Статус',
      controlValue: ['Прилаштований', 'Живий', 'Мертвий'],
    },
  ],
  textarea: {
    controlName: 'description',
    controlKey: 'Додаткова інформація',
    placeholder: 'Введіть додаткову інформацію про тварину',
  },
  datepicker: {
    controlName: 'birthDate',
    controlKey: 'Дата народження',
  },
};
