/**
 * Функция для конвертации размера файла из мегабайтов в байты.
 * @param sizeInMB - Размер файла в мегабайтах.
 * @returns Размер файла в байтах.
 */
export const convertToBytes = (sizeInMB: number): number => {
  return sizeInMB * 1024 * 1024
}
