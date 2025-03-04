import { useSelector } from 'react-redux'
import { RootState } from '@/shared/store/store'

export const useAppSelector = useSelector.withTypes<RootState>()
