"use client"

import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function page() {
  const {user} = useAuth();
  return (
    <div>
      <div className='text-4xl font-bold'>Settings</div>
      <div className='border-b mt-8'></div>
      <div className='mt-8 text-2xl font-bold'>Your Subscription Plan</div>
      <div className='border-b mt-8'></div>
      <div className='mt-8 text-2xl font-bold'>Email</div>
      {user?.email}

    </div>
  )
}
