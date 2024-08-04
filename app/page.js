import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import CategoryList from './_components/CategoryList'
import BusinessList from './_components/BusinessList'


const page = () => {
  return (
    <>

      <div className='w-full min-h-full'>
        <CategoryList />
        <BusinessList />
      </div>

    </>
  )
}

export default page