'use client'

import React, { useContext, useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { ContextAPI } from '@/app/context/Maincontext'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const page = () => {
    const [hideinputs,showinputs]=useState(false);
    const [btntext,setbtntext]=useState("Send OTP");
    const {user,setUser}=useContext(ContextAPI);
    let nav = useRouter();
    const handlegenerateotp = ()=>{
        showinputs(!hideinputs)
        let otptimer=60
        setbtntext(`REGENERATE OTP IN ${otptimer}`)    
        const timerInterval = setInterval(()=>{
            otptimer--
            setbtntext(`REGENERATE OTP IN ${otptimer}'s`)
            if(otptimer===0){
                clearInterval(timerInterval)
                showinputs(false)
                setbtntext("Send OTP")
            }
        },1000)   
        
        try{
            const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/user/generate-otp`,user);
            // alert("")
            toast("otp is sent");

        }
        catch(error){
            console.log(error)
            swal({
                title:"Something went wrong in server !!",
                text:"Please try again",
                icon:"error"
            })
        }
    }

    const updateemail=(e)=>{
        e.preventDefault();
        const newvalues = {
            email:e.target.email.value,
            userotp:e.target.otp.value,
            password:e.target.newpassword.value
        }
        // console.log(e.target.otp.value)
        // console.log(newvalues,getAdminData._id)
        try{
            if( !window.confirm("Do you want to update this Password"))return
            
            const response = axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/user/update-password`,newvalues);
            if(response.status!==200){
                swal({
                    title:"Someting  went wrong !!",
                    text:"Warning !!",
                    icon:"warning"
                })    
            }
            swal({
                title:"SUCCESS ",
                text:"Password has been successfully updated !!",
                icon:"success"
            })
            if(Cookies){
                Cookies.remove("FRANKANDOAK")
                nav.push("/")
            }
        }
        catch(error){
            console.log(error)
            swal({
                title:"Something went wrong in server !!",
                text:"Please try again",
                icon:"error"
            })
        }
    }
    console.log(user)
    return (
        <div>
            <Header />
            <Container className='my-3'>

                <div className='text-start mx-6 w-50'>
                    <h2 className='fw-600'>Forget Password?</h2>
                    <p className='fs-12 my-3 '>Please enter your email below and we will send you a link to reset your password.</p>
                    {/* <form className=''>
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
                    </form> */}

        <form onSubmit={updateemail} method='post'>
                <Container>
                <div className='border-start border-end border-bottom my-4 rounded-top'>
                      
                    <div className='container p-3'>
                    <label
                             for='email'
                             className='fs-12 fw-600'
                              >Email address</label><br />
                            <input
                                type='email'
                                className='w-100 p-2'
                                value={user.email}
                                onChange={(e)=>setUser({...user,email:e.target.value})}
                                name='email'
                                id='email' />

                        {
                            hideinputs==true?
                            <><label className='my-2'>
                        OTP
                    </label>
                    <input placeholder='Enter your OTP'
                    name='otp'
                    className='d-block w-100 rounded inn p-1 my-2'  type='text'/>

                    <label className='my-2'>
                       Enter New Password
                    </label>
                    <input placeholder='New Password' className='d-block w-100 rounded inn p-1 my-2' name='newpassword' type='password' />

                    <button className='my-3 p-2 rounded border-0 bg-secondary text-white' disabled >{btntext}</button>
                    <button  type='submit' className='my-3 mx-5 p-2 rounded border-0 bg-primary text-white'  >Update Password</button>
                          </>
                    
                    :
                    
                    <button type='button' className='my-3 p-2 rounded border-0 bg-primary text-white' onClick={handlegenerateotp} >{btntext}
                    <ToastContainer />
                    </button>
                        }

                        
                    </div>
                </div>
                </Container>
                </form>

                </div>

            </Container>
            <Footer />
        </div>
    )
}

export default page