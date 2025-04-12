import { createSlice } from '@reduxjs/toolkit'
import { MyPayments } from '@/shared/api/payments/paymentsApi.types'

type PaymentsState = {
  allPayments: MyPayments[]
}

const initialState: PaymentsState = {
  allPayments: [],
}

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: create => ({
    setAllPayments: create.reducer<MyPayments[]>((state, action) => {
      state.allPayments = action.payload
    }),
  }),
  selectors: {
    selectAllPayments: state => state.allPayments,
  },
})

export const { setAllPayments } = paymentsSlice.actions
export const { selectAllPayments } = paymentsSlice.selectors
export const paymentsReducer = paymentsSlice.reducer
