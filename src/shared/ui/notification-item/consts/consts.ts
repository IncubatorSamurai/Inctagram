export const notifications = [
  {
    id: '1',
    title: 'Новое уведомление!',
    message: 'Следующий платеж у вас спишется через 1 день',
    date: new Date(Date.now() - 60 * 60 * 1000),
    isNew: true,
    path: '#',
  },
  {
    id: '2',
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isNew: true,
    path: '#',
  },
  {
    id: '3',
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isNew: false,
    path: '#',
  },
  {
    id: '4',
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
    isNew: false,
    path: '#',
  },
]
