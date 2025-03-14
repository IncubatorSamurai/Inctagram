export const config = {
  centeredScaling: true,
  objectCaching: true,
  lockScalingX: true, // Запрещаем масштабирование по оси X
  lockScalingY: true, // Запрещаем масштабирование по оси Y
  lockMovementX: true, // Запрещаем перемещение по оси X
  lockMovementY: true, // Запрещаем перемещение по оси Y
  hasControls: false, // Убираем контролы для масштабирования и вращения
  hasBorders: true, // Убираем границы, если не нужно
  selectable: false, // Запрещает выделение объекта
  evented: false, // Отключает обработку событий (например, клик)
  hoverCursor: 'default', // Убирает курсор "перемещения"
}
