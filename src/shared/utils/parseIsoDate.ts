/**
 * Преобразует строку даты в формате ISO в локализованную строку даты.
 *
 * @param {string} isoDate - дата в формате ISO ("2025-05-17T12:41:21.778Z").
 * @returns {string} дата в формате 'дд.мм.гггг' (Россия).
 */
export const parseIsoDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('ru-Ru')
}
