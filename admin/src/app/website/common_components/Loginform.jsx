import React, { useContext, useState } from 'react'
import './loginform.css'
import { FaHeart, FaTag } from 'react-icons/fa6'
import Link from 'next/link';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { RiFacebookFill, RiGoogleFill } from 'react-icons/ri';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ContextAPI } from '@/app/context/Maincontext';
import Cookies from 'js-cookie';

const Loginform = ({ close }) => {
    let {user,setUser,viewuser,setView}=useContext(ContextAPI);
    const [signUp, setSignUp] = useState(true);
    const [showPass, setShowPass] = useState(true);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    // const [viewotp,setotp] = useState(false);
    // const [btntext,setbtntext]=useState("Send OTP")
    

    const validateFormDate = () => {

        let checkError = {};
        if (!formData.f_name) {
            checkError.f_name = 'First Name is required';
        }
        if (!formData.l_name) {
            checkError.l_name = 'Last Name is required';
        }

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!formData.email || !formData.email.match(emailPattern)) {
            checkError.email = 'Email is required';
        }

        // if(!formData.email.test(emailPattern)){
        //     checkError.email='Enter a Valid Email'
        // }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!formData.password || !formData.password.match(passwordPattern)) {
            checkError.password = 'Password must be of 8 digit long & contains uppercase and lowercase character any number and special character';
        }

        // if(!formData.password.test(passwordPattern)){
        //     checkError.password='Enter a Valid Password'
        // }

        setErrors(checkError);
        return (Object.keys(checkError).length === 0);

    };
    const handleGenerateOtp = async () => {
        const ifValid = validateFormDate();
        if (ifValid) { 

            try{
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/user/register-user`,formData);

                // console.log(response)
    
                if(response.status!==200) return(
                    swal({
                        title: "Something went wrong !!",
                        text:"Please try after sometime !!",
                        icon: "warning"
                    })
                )
                swal({
                    title:"SUCCESS !!",
                    text:"User is being register successfully",
                    icon:"success"
                })
                    
                
                   setSignUp(true);
                   
                
                
    
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
        else {
            setTimeout(() => {
                setErrors({});
            }, 3000);
        }

        
       
    };
    const handelLogin = async(e)=>{
        // e.preventDefault();
         const datas = {
            "email":e.target.email.value,
            "password":e.target.password.value
        }
    //    console.log(datas)
            try{

                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/user/login-user`,datas);
                if(response.status!==200) return(
                    swal({
                        title: "Something went wrong !!",
                        text:"Please try after sometime !!",
                        icon: "warning"
                    })
                )
                if(response.status===200){
                    
                     Cookies.set("FRANKANDOAK",JSON.stringify(response.data.data),{expires:1})
                    
                    
                    // console.log(response.data)
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

    // console.log(formData)
    return (
        <div className='login text-start'>
            
            <span onClick={() => close(false)} className='close-btn'> x </span>
            <div className='bg-color-offwhite p-4'>

                <p className='fs-3 text-center my-0'>Welcome Back!</p>
                <p className='text-center my-0 p-1 '>Log in to enjoy your perks</p>

                <div className='d-flex my-3'>
                    <div className='text-center w-33'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="24"
                            viewBox="0 0 23 24"
                            fill="none"
                            className='m-2'
                        >
                            <g clip-path="url(#clip0_2406_20469)">
                                <path
                                    d="M18.9397 16.0898C18.9397 15.7398 18.8797 15.3898 18.7697 15.0498C18.7397 14.9398 18.6997 14.8298 18.6497 14.7298C18.3397 13.9998 17.7997 13.3998 17.1097 13.0298C16.9097 12.9298 16.7097 12.8398 16.4897 12.7798C16.2697 12.7098 16.0497 12.6698 15.8197 12.6498C15.5897 12.6298 15.3497 12.6298 15.1197 12.6498C14.8897 12.6798 14.6697 12.7198 14.4597 12.7998C14.3497 12.8398 14.2497 12.8798 14.1497 12.9198C13.7097 13.1098 13.3197 13.3998 12.9997 13.7598C12.6797 14.1198 12.4297 14.5398 12.2797 15.0098C12.1297 15.4698 12.0697 15.9598 12.1097 16.4498C12.1497 16.9398 12.2897 17.4098 12.5297 17.8298C12.5497 17.8598 12.5697 17.8998 12.5897 17.9298C12.6497 18.0198 12.7097 18.1198 12.7697 18.1998C13.1997 18.7898 13.7997 19.2298 14.4897 19.4598C15.1797 19.6798 15.9197 19.6798 16.5997 19.4398C17.2797 19.2098 17.8797 18.7598 18.2997 18.1498C18.7197 17.5498 18.9397 16.8298 18.9297 16.0898V16.0698L18.9397 16.0898Z"
                                    fill="black"
                                ></path>
                                <path
                                    d="M8.08 3.31982L0 6.02982L5.66 23.6598C10.35 19.3498 11.28 11.8198 8.08 3.31982Z"
                                    fill="black"
                                ></path>
                                <path
                                    d="M21.8598 0.000234375L11.2598 0.150234C11.3498 6.14023 16.1598 10.9202 22.0198 10.8302L21.8698 -0.00976562L21.8598 0.000234375Z"
                                    fill="black"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_2406_20469">
                                    <rect width="22.02" height="23.66" fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        <p className='my-0 fs-14 fw-600 '>Frank's Club</p>
                        <p className='my-0 fs-14 fw-600 '>Earn points, get rewards</p>
                    </div>
                    <div className='text-center w-33'>
                        <FaHeart className='fs-3 m-2' />
                        <p className='my-0 fs-14 fw-600 '>Wishlist</p>
                        <p className='my-0 fs-14 fw-600 '>Save your favourite</p>
                    </div>
                    <div className='text-center w-33'>
                        <FaTag className='fs-3 m-2' />
                        <p className='my-0 fs-14 fw-600 '>Early Access</p>
                        <p className='my-0 fs-14 fw-600 '>Exclusive Sale perks</p>
                    </div>
                </div>
            </div>

            <div className='padding'>
                {
                    signUp ? (
                        <form onSubmit={handelLogin} method='post'>
                            <div className='position-relative'>
                            
                                <input
                                    className='w-100 p-2 my-4 rounded-0'
                                    type='email'
                                    name='email'
                                    placeholder='Email Address' />
                            </div>

                            <div className='position-relative'>
                                
                                <input
                                    className='w-100 p-2 my-4 rounded-0'
                                    type={showPass ? 'password' : 'text'}
                                    placeholder='Password'
                                    name='password'
                                />
                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className='show-hidee'
                                >
                                    {showPass ? 'Show' : 'Hide'}
                                </span>
                            </div>

                            <div className='my-2'>
                                <Link href='/website/forget-password' style={{ color: 'black' }}>
                                    <p className='cursor-pointer fw-600 fs-14' style={{ textDecoration: 'underline' }}>Forget Password?</p>
                                </Link>
                            </div>
                            <div className='text-start my-3'>
                                <button className='text-center p-2 bg-black text-white border-0 w-100'  >Log In</button>
                            </div>

                        </form>
                    ) : (

                        <div>
                            <p className='text-center fs-14'>
                                Already have an account?&nbsp;&nbsp;&nbsp;
                                <spna onClick={() => setSignUp(true)} className='cursor-pointer' style={{ textDecoration: 'underline' }}>Log In <HiOutlineArrowLongRight /></spna>
                            </p>
                            <form method='post'>
                                <div className='d-flex justify-content-between'>
                                    <div className='position-relative'>
                                        {errors.f_name &&
                                            <p className='errors'>{errors.f_name}</p>
                                        }
                                        <input
                                            className='w-100 p-2 my-4 rounded-0'
                                            type='text'
                                            name='f_name'
                                            value={formData.f_name}
                                            onChange={(e) => { setFormData({ ...formData, f_name: e.target.value }) }}
                                            placeholder='first name' />
                                    </div>

                                    <div className='position-relative'>
                                        {errors.l_name &&
                                            <p className='errors'>{errors.l_name}</p>
                                        }
                                        <input
                                            className='w-100 p-2 my-4 rounded-0'
                                            type='text'
                                            name='l_name'
                                            value={formData.l_name}
                                            onChange={(e) => { setFormData({ ...formData, l_name: e.target.value }) }}
                                            placeholder='last name' />
                                    </div>
                                </div>
                                <div className='position-relative'>
                                    {errors.email &&
                                        <p className='errors'>{errors.email}</p>
                                    }
                                    <input
                                        className='w-100 p-2 my-4 rounded-0'
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                                        placeholder='Email Address' />
                                </div>
                                <div className='position-relative'>
                                    {errors.password &&
                                        <p className='errors'>{errors.password}</p>}
                                    <input
                                        className='w-100 p-2 my-4 rounded-0'
                                        type={showPass ? 'password' : 'text'}
                                        name='password'
                                        value={formData.password}
                                        onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                                        placeholder='Password'
                                    />
                                    <span
                                        onClick={() => setShowPass(!showPass)}
                                        className='show-hidee'
                                    >
                                        {showPass ? 'Show' : 'Hide'}
                                    </span>
                                </div>

                                
                                <div className='text-start my-3'>
                                    <button
                                        className='text-center p-2 bg-black text-white border-0 w-100'
                                        type='button'
                                        
                                        onClick={handleGenerateOtp}
                                    >
                                    Sign Up
                                    </button>
                                    
                                </div>

                            </form>
                        </div>
                    )
                }

                <div className='my-2'>
                    <div className='d-flex justify-content-center align-items-center my-3'>
                        <hr className='w-35' />
                        <p className='mx-2 my-0'>Social Login</p>
                        <hr className='w-35' />
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <button className='w-45 border border-2 border-black p-2 bg-white hover:bg-secondary'>
                            <RiFacebookFill className='text-start' />
                            <span className='mx-3'> Sign in with Facebook</span>
                        </button>
                        <button className='w-45 border border-2 border-black p-2 bg-white hover:bg-secondary'>
                            <RiGoogleFill className='text-start' />
                            <spna className='mx-3'> Sign in with Google</spna>
                        </button>
                    </div>
                </div>

                {
                    signUp ? (
                        <div>
                            <div className='d-flex align-items-center my-3 justify-content-center'>
                                <hr className='w-35' />
                                <p className='mx-2 my-0'>Create an Account</p>
                                <hr className='w-35' />
                            </div>
                            <p className='fs-14 text-center'>Don't have an account? <span onClick={() => setSignUp(false)} className='cursor-pointer' style={{ textDecoration: 'underline' }}>Sign Up <HiOutlineArrowLongRight />
                            </span></p>
                        </div>

                    ) : (
                        <div className='my-5'>
                            <hr />
                            <p className='fs-10'>By joining, you agree to Frank And Oak’s Terms & Conditions and Privacy Policy and to receive Frank And Oak’s electronic communications.</p>
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default Loginform