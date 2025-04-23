import { Root, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './Table'
import { MyPayments } from '@/shared/api/payments/paymentsApi.types'

export type Props = {
  payments: MyPayments[]
}

export const PaymentsTable = ({ payments }: Props) => {
  return (
    <Root>
      <TableHead>
        <TableRow>
          <TableHeadCell>Date of Payment</TableHeadCell>
          <TableHeadCell>End date of subscription</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>Subscription Type</TableHeadCell>
          <TableHeadCell>Payment Type</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map(payment => (
          <TableRow key={payment.subscriptionId}>
            <TableCell>{new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}</TableCell>
            <TableCell>
              {new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}
            </TableCell>
            <TableCell>{payment.price}</TableCell>
            <TableCell>{payment.subscriptionType}</TableCell>
            <TableCell>{payment.paymentType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Root>
  )
}
