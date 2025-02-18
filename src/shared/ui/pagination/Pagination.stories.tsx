import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Pagination } from './Pagination'



export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>

export const Default = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(4)
  const TOTAL_PAGES_COUNT = 100

  return (
      <Pagination
      changeCurrentPage={setPage}
      totalCount={TOTAL_PAGES_COUNT}
        currentPage={page}
        pageSize={perPage}
        changeItemsPerPage={setPerPage}
      />
  )
}

