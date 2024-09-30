'use client'
import React, { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { FaEyeSlash } from 'react-icons/fa6';
import './../style.css'
import login_logo from '../../../public/images/login_logo.png';
import Image from 'next/image';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';


const page = () => {
    const nav =useRouter()
    const [pass,setpass]=useState(false)
    const [eye,seteye] = useState(false)
    const [admindata,setadmindata]=useState({})

    const handlelogin=async(e)=>{
        e.preventDefault()
        const formdata ={
            email:e.target.email.value,
            password:e.target.password.value
        }
        // console.log()
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/admin/log-in`,formdata)

           

            if(response.status===200){
                Cookies.set("frankandoak-login",JSON.stringify(response.data.data),{expires:1})
                nav.push("/dashboard")
                // console.log(response.data)
            }
            
        }
        catch(error){
            console.log(error)
            alert("login details incorrect")
        }
        // console.log(formdata)
    }

    let show=()=>{
        seteye(!eye)
        setpass(!pass)
        // alert("hadbc")
    }

  return (
    <div className='login_body'>
         <div class="img"><Image src={login_logo} width="250" alt="LOGO"/></div>
        <div class="f1">
            <div class="form">
            <form onSubmit={handlelogin} method='post'> 
                <div id="l1"><label>Email :- </label></div>
    
                <div class="i11"><input id="i1" type="text" name='email' placeholder="Email"/></div>
    
                <div id="l2"><label>Password :- </label></div>
    
                <div class="pass">
                    <div class="i22"><input
                     type={
                        (pass==true)?"text":"password"
                    } 
                    placeholder="password" name='password' id="i2"/></div>
                    <div id="r1" onClick={show}>
                        {
                            (eye==true)?<FaEyeSlash />:<IoEyeSharp />
                        }
                    </div>
                </div>
    
                <div id="i3">
                    <button type='submit' class="submit" > Login </button>
                </div>
            </form>
            
            </div>
        </div>
    </div>
  )
}

export default page