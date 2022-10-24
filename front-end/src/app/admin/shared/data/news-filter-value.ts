import { AdminNewsFilterValue } from './../interfaces/admin-news-filter-value';

export const newsFilterValue: AdminNewsFilterValue = {
  search: [
    {
      controlName: 'title',
      placeholder: 'Введіть заголовок',
      controlKey: 'Заголовок статті',
      type: 'text',
    },
  ],
  defValue: {
    title: null,
    // subtitle: null,
    // text: null,
    active: 'createdAt',
    direction: 'DESC',
    limit: 10,
    page: 0,
  },
};
