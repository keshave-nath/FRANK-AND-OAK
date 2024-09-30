'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

const page = () => {
    return (
        <div>
            <Headers/>
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Slider Details</li>
                    </ul>
                </div>
                <Container>
                <div className='border-start border-end border-bottom my-4 rounded-top'>
                    <div className='bgg fw-bold fs-3 py-2 px-3'>
                        Add Slider    
                    </div>    
                    <div className='container p-3'>
                        <label className='my-2'>
                            Slider Name
                        </label>
                        <input placeholder='Slider Name' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                        <label className='my-2'>
                            Heading
                        </label>
                        <input placeholder='Heading' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                        <label className='my-2'>
                            Sub Heading
                        </label>
                        <input placeholder='Sub Heading' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                        <label className='my-2'>
                            Slider Image
                        </label>
                        <input placeholder='Category Image' className='d-block w-100 rounded inn p-1 my-2' type='file'/>

                        

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

                        <button className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Add Slider</button>
                    </div>
                </div>
                </Container>
            </div>
        </div>
    )
}

export default page