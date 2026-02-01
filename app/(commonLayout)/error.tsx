"use client"
import Error from '@/components/error/error'
import React from 'react'

const error = (props: { error: Error; reset: () => void }) => {
  return (
    <div>
      <Error error={props.error} reset={props.reset} />
    </div>
  )
}

export default error
