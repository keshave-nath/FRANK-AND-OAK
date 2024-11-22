'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';


const page = () => {
    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Update Story</li>
                        
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Update Story
                        </div>
                        <div className='container p-3'>
                            <label className='my-2'>
                                Size Name
                            </label>
                            <input placeholder='Size Name' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                            <label className='my-2'>
                                Image
                            </label>
                            <input placeholder='Size Name' className='d-block w-100 rounded inn p-1 my-2' type='file' />

                            <label className='my-2'>
                                Banner Image
                            </label>
                            <input placeholder='Size Name' className='d-block w-100 rounded inn p-1 my-2' type='file' />

                            <label className='my-2'>
                                Description
                            </label>
                            <textarea className='d-block w-100 rounded inn p-2 my-2'>Description</textarea>

                            <label className='mx-2 my-3'>
                                Status: 
                            </label>
                            
                            <input className=' rounded inn p-1 mx-2' type='radio' checked/>
                            <label>
                                Display
                            </label>

                            <input className=' rounded inn p-1 mx-2' type='radio' />
                            <label>
                                Hide
                            </label>
                            <button className='my-3 d-block p-2 rounded border-0 bg-primary text-white'>Update Story</button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page