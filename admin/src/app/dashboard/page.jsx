'use client'
import React from 'react'
import { Accordion } from 'react-bootstrap'
import Headers from './header/Headers';
import Link from 'next/link';

export default function page() {
  return (
    <div>
      <Headers/>
      <div className=''>
          <div className='p-2 border-top border-bottom border-end'>
             <ul className=' list-unstyled d-flex gap-2 mx-3'>
               <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                <li>/</li>
                <li>Dashboard</li>
             </ul>
          </div>
          <div className='p-2'>
            Dashboard
          </div>
      </div>
    </div>
  )
}
