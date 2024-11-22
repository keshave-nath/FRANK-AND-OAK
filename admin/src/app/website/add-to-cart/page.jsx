'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Image from 'next/image'
import { IoHeartOutline } from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import { ContextAPI } from '@/app/context/Maincontext'
import Cookies from 'js-cookie'
import { loadStripe } from '@stripe/stripe-js'

const page = () => {


    const [viewcart, setviewCart] = useState([]);
    const [file, setfile] = useState()
    
    const [carttowish, setcarttowish] = useState([]);
    const [val, setval] = useState(1);

    // let {_id} = user;
    let cookieData = Cookies.get('FRANKANDOAK')
    if (cookieData) {
        cookieData = JSON.parse(cookieData)
    }

    const handelViewCart = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/cart/view-cart/${cookieData._id}`)
            if (response.status !== 200) {
                swal({
                    text: 'Please try later !!',
                    title: 'Something Went Wrong !!',
                    icon: 'warning'
                })
            }
            // console.log(response)
            setviewCart(response.data.data);
            setcarttowish(response.data.data)
            setfile(response.data.file_path);
            // setval(response.data.data.quantity)

        }
        catch (error) {
            console.log(error)
            swal({
                text: 'Internal Server Error !!',
                title: 'Something Went Wrong !!',
                icon: 'error'
            })
        }
    }

    const deleteproduct = async (e) => {
        console.log(e)
        try {
            // console.log(e)
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/cart/delete-cart-item/${e}`)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))
            swal({
                title: "Success !!",
                icon: "success"
            })
            const indexNo = viewcart.findIndex((cart) => cart._id === e);
            const newData = [...viewcart]
            newData.splice(indexNo, 1);

            setviewCart(newData);
            // handelReadParent();
            // console.log(response.data.data)
        }
        catch (error) {
            console.log(error);
            alert("back problem");
        }
    }

    const handelcarttowish = async (e) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/wishlist/wish-product/${e}`);
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                }))
            if (response.status == 200) (
                swal({
                    title: "Success !!",
                    icon: "success"
                })
            ).then(deleteproduct(e))
        }

        catch (error) {
            console.log(error);
            swal({
                title: "internal server",
                icon: "error"
            })
        }
    }
    // const addition = () => {
    //     if (val < 10) {
    //         setval(val + 1)
    //     }
    // }

    // const subtraction = () => {
    //     if (val > 1) {
    //         setval(val - 1)
    //     }
    // }

    const addition = (_id) => {
        // console.log(_id);

        const ind = viewcart.findIndex((datapre) => datapre._id === _id);
        const dataToUpdate = [...viewcart];
        if (dataToUpdate[ind].quantity < 8) {
            dataToUpdate[ind].quantity = dataToUpdate[ind].quantity + 1;
            setviewCart(dataToUpdate);
        }
    }

    const subtraction = (_id) => {
        // console.log(_id);

        const ind = viewcart.findIndex((datapre) => datapre._id === _id);
        const dataToUpdate = [...viewcart];
        if (dataToUpdate[ind].quantity > 1) {
            dataToUpdate[ind].quantity = dataToUpdate[ind].quantity - 1;
            setviewCart(dataToUpdate);
        }
    }


    useEffect(() => {
        handelViewCart();
    }, [])


    return (
        <div>
            <Header />

            <div className='container'>
                <Link href={'/'} style={{ 'color': 'black', 'textDecoration': 'none' }}><div className='my-3'><FaArrowLeftLong /> Continue Shopping</div></Link>
                <div>
                    {
                        viewcart.map((v) => (
                            <div className='w-100 border-bottom pb-2 my-5 row'>
                                <div className='col-2 '>
                                    <img src={file + v.proo.thumbnail} width='100%' height={150} />
                                </div>
                                <div className='col-10  px-2'>
                                    <div className='d-flex justify-content-between'>

                                        <div className='fw-bold my-1'>{v.proo.name}</div>

                                        <div onClick={() => deleteproduct(v._id)}><RxCross2 /></div>

                                    </div>

                                    <div className='text-secondary my-2'>SIZE: {v.size.name}</div>

                                    <div onClick={() => handelcarttowish(v._id)} className='text-secondary cursor-pointer text-decoration-underline my-2'>Move to wishlist <IoHeartOutline className='fs-5 cursor-pointer' /></div>

                                    <div className='d-flex justify-content-between mt-4'>
                                        <div className='d-flex'>
                                            <button className='border px-2 ' onClick={()=>addition(v._id)}>+</button>
                                            <div className='border px-2'>{v.quantity}</div>
                                            <button className='border px-2 ' onClick={()=>subtraction(v._id)}>-</button>
                                        </div>

                                        <div>
                                            &#8377;  {v.proo.price * v.quantity}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </div>

                <Handelcheckout v={viewcart} />

            </div>

            <Footer />
        </div >
    )
}

export default page


function Handelcheckout({v}) {
    // console.log(v)
    const [price,setprice] = useState([]);
    const [viewcart, setviewCart] = useState([]);
    // let { user } = useContext(ContextAPI);
    // let {val, setval} = useContext(ContextAPI);
    // console.log(val)
    const subtotal = v.reduce((acc, item) => acc + item.proo.price * item.quantity, 0);
    // const subtotal=0;

    const tax = Math.floor(subtotal * (18 / 100));

    // let data;
    // const data;
    
    

    // let tot = 0;
    // let price = v.v.map((v) => (
    //     v.proo.price * v.quantity
    // ))

    // price.map((v) => (
    //     tot = tot + Number(v)
    // ))

    const handelPaymentGateway = async () => {
            // setprice({...price,v,subtotal})
                const data =v.map((v)=>(
                {
                    product:v.proo,
                    color:v.color,
                    size:v.size,
                    quantity:v.quantity,
                    subtotal:subtotal,
                    user:v.userr
                }
            ))
            
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
        
            axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/payment/purchase`,data)
            .then((response)=>{
                console.log(response);
                stripe.redirectToCheckout({
                    sessionId:response.data.session
                })
                setviewCart(null);
                // console.log(data)
            }) 
            .catch((error)=>{
                console.log(error);
            swal({
                title: "Something went Wrong !!",
                icon: 'error'
            })
            })
    }
  
    return (
        <div>
            <div className='w-100 border d-flex justify-content-between'>
                <div className='fs-4 fw-bold'>Subtotal <span className='text-secondary fw-light'>({v.length < 2 ? v.length + ' item' : v.length + ' items'})</span> </div>
                <div className='fs-4 fw-bold'>&#8377; {subtotal}</div>
            </div>
            <div className='w-100' >
                <button onClick={handelPaymentGateway} className='w-100 py-3 my-3 bg-dark text-white border-0'>Secure Checkout</button>
            </div>
        </div>
    )
}