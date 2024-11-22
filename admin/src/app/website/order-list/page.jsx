import React from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Container } from 'react-bootstrap'
import { RxCross2 } from 'react-icons/rx'

const page = () => {
  return (
    <>
        <Header/>
            <Container className='my-3 w-25'>
            <h1>
                Order Lists
            </h1>
            </Container>
            <Container className='border my-3 d-flex'>
            <div className='w-100 border-bottom pb-2 my-5 row'>
                                <div className='col-2 '>
                                    <img src="" width='100%' height={150} />
                                </div>
                                <div className='col-10  px-2'>
                                    <div className='d-flex justify-content-between'>

                                        <div className='fw-bold my-1'>Keshave</div>

                                        <div ><RxCross2 /></div>

                                    </div>

                                    <div className='text-secondary my-2'>SIZE:L</div>

                                    

                                    <div className='d-flex justify-content-between mt-4'>
                                        <div className='d-flex'>
                                            {/* <button className='border px-2 ' onClick={()=>addition(v._id)}>+</button> */}
                                            <div className='border px-2'>Quantity:</div>
                                            {/* <button className='border px-2 ' onClick={()=>subtraction(v._id)}>-</button> */}
                                        </div>

                                        <div>
                                           Price:  &#8377;1499  
                                        </div>
                                    </div>

                                </div>
                            </div>
            </Container>
        <Footer/>
    </>
  )
}

export default page