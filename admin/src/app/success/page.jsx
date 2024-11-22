import React from 'react'
import './success.css'
import { TiTick } from "react-icons/ti";
import Link from 'next/link';


const page = () => {
    return (
        <div>
            <div class="row justify-content-center my-5 mx-2">
                <div class="col-md-5">
                    <div class="message-box _success">
                    <center>
                    <div className='bg-success border border-0 rounded-circle' style={{
                        width:'30px'
                    }}>
                        <TiTick className='text-white fs-3' />
                    </div>
                    </center>

                        <h2> Your payment was successful </h2>
                        <p> Thank you for your payment. we will <br/>
                            be in contact with more details shortly </p>
                            <Link href='/' style={{
                                color:'blue'
                            }}><p>  Click here to Continue </p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page