export const createBlobArray = (imageUrls: string[]) => {
  const blobArray: string[] = []

  imageUrls.forEach(imageUrl => {
    if (imageUrl) {
      // Проверяем, является ли URL base64-строкой
      if (imageUrl.startsWith('data:image/png;base64,')) {
        // Убираем префикс 'data:image/png;base64,' если он существует
        const base64Data = imageUrl.split(',')[1] // Получаем строку данных после запятой

        // Преобразуем base64 в Blob
        const byteString = atob(base64Data)
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uintArray = new Uint8Array(arrayBuffer)

        // Заполняем массив байтов
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i)
        }

        // Создаем Blob из данных
        const blob = new Blob([arrayBuffer], { type: 'image/png' })

        // Создаем объект URL для Blob
        const objectUrl = URL.createObjectURL(blob)
        blobArray.push(objectUrl)
      } else if (imageUrl.startsWith('blob:')) {
        // Если это Blob URL, просто добавляем его в массив
        blobArray.push(imageUrl)
      }
    }
  })

  return blobArray
}
