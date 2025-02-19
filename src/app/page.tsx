'use client'
import { Pagination } from "@/shared/ui/pagination";

export default function BaseHome() {
  const test = (value:number) => {
    console.log()
  }
  const test2 = (value:number) => {
    console.log()
  }

    return <>Base Home
      <Pagination 
      changeCurrentPage={test} 
      changeItemsPerPage={test2} 
      currentPage={1} 
      pageSize={10} 
      totalCount={100} 
      neighbours={1}>

      </Pagination>
    </>
  }