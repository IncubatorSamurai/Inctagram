import { Root, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './Table'

export type Payment = {
  id: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: string
  subscriptionType: string
  paymentType: string
}

export type Props = {
  payments: Payment[]
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
          <TableRow key={payment.id}>
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
