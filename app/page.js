import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'
import CategoryList from './_components/CategoryList'

const page = () => {
  return (
    <>
      <CategoryList />
    </>
  )
}

export default page