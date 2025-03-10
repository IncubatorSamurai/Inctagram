import { Meta, StoryObj } from '@storybook/react'
import { Root, TableBody, TableCell, TableEmpty, TableHead, TableHeadCell, TableRow } from './Table'

const meta = {
  title: 'Components/Table',
  component: Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Root>

export default meta

type Story = StoryObj<typeof meta>

const payments = [
  {
    id: '1',
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: '$10',
    subscriptionType: '1 day',
    paymentType: 'Stripe',
  },
  {
    id: '2',
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: '$50',
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
  {
    id: '3',
    dateOfPayment: '2022-12-12',
    endDateOfSubscription: '2022-12-12',
    price: '$50',
    subscriptionType: '7 days',
    paymentType: 'Stripe',
  },
]

export const PaymentsTable: Story = {
  args: {
    children: (
      <>
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
      </>
    ),
  },
}

export const Empty: Story = {
  args: {
    children: <TableEmpty />,
  },
}
