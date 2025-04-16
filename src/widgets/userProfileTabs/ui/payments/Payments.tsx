"use client"

import s from "./Payments.module.scss"
import { PaymentsTable } from '@/shared/ui/table'
// import { useGetMyPaymentsQuery } from '@/shared/api/payments/paymentsApi'

// import { useAppDispatch } from '@/shared/hooks'
import { useEffect, useState } from 'react'
// import { setAllPayments } from '@/shared/store/paymentsSlice/paymentsSlice'
import { Pagination } from '@/shared/ui/pagination'
const paymentsPlaceholder = [
  {
    userId: 1,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 10,
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    userId: 1,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 2,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 2,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 10,
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    userId: 3,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 2,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 4,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    userId: 5,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 4,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 5,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    userId: 7,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    userId: 9,
    subscriptionId: "6",
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: 50,
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
]

const Payments = () => {
  // const dispatch = useAppDispatch()
  // const { data } = useGetMyPaymentsQuery()
  //
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setAllPayments(data)) // <-- исправили здесь
  //   }
  // }, [data, dispatch])
  // const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [paginatedData, setPaginatedData] = useState(paymentsPlaceholder)

  useEffect(() => {
    const firstItemIndex = (currentPage - 1) * itemsPerPage
    const lastItemIndex = currentPage * itemsPerPage
    setPaginatedData(paymentsPlaceholder.slice(firstItemIndex, lastItemIndex))
  }, [currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }
  return (
    // <><div className={s.payments}>
    //   <PaymentsTable payments={paymentsPlaceholder} />
    // </div>
    // {/*<div><Pagination changeCurrentPage={2} currentPage={1} changeItemsPerPage={(1)=>{}} pageSize={4} totalCount={3}/></div>*/}
    // </>
    <div className={s.payments}>
      <PaymentsTable payments={paginatedData} /> {/* Передаем пагинированные данные в таблицу */}
      <Pagination
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalCount={paymentsPlaceholder.length}
        changeCurrentPage={handlePageChange}
        changeItemsPerPage={handleItemsPerPageChange}
      />
    </div>
  )
}

export default Payments
