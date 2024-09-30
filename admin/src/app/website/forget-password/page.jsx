import React from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Container } from 'react-bootstrap'

const page = () => {
    return (
        <div>
            <Header />
            <Container className='my-3'>

                <div className='text-start mx-6 w-50'>
                    <h2 className='fw-600'>Forget Password?</h2>
                    <p className='fs-12 my-3 '>Please enter your email below and we will send you a link to reset your password.</p>
                    <form className=''>
                        <div className='mb-3'>
                            <label
                             for='email'
                             className='fs-12 fw-600'
                              >Email address</label><br />
                            <input
                                type='email'
                                className='w-100 p-2'
                                name='email'
                                id='email' />
                        </div>
                        <button type='submit' className=' w-25 bg-black text-white p-2'>Send</button>
                    </form>
                </div>

            </Container>
            <Footer />
        </div>
    )
}

export default page