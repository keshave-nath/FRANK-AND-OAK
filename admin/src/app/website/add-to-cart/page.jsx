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


const page = () => {

    let [val,setval] = useState(1);
    const [viewcart,setviewCart]=useState([]);
    const [file,setfile]=useState()
    let {user} = useContext(ContextAPI);
    const [carttowish,setcarttowish] = useState([])

    // let {_id} = user;
    let cookieData = Cookies.get('FRANKANDOAK')
    if(cookieData){
    cookieData = JSON.parse(cookieData)
    }

    const handelViewCart=async()=>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/cart/view-cart/${cookieData._id}`)
            if(response.status!==200){
                swal({
                    text:'Please try later !!',
                    title:'Something Went Wrong !!',
                    icon:'warning'
                })
            }
            console.log(response)
            setviewCart(response.data.data);
            setcarttowish(response.data.data)
            setfile(response.data.file_path);
            // setval(response.data.data.quantity)

        }
        catch(error){
            console.log(error)
            swal({
                text:'Internal Server Error !!',
                title:'Something Went Wrong !!',
                icon:'error'
            })
        }
    }

   
    const addition=()=>{
        if(val<10){
            setval(val+1)
        }
    }

    const subtraction=()=>{
        if(val>1){
        setval(val-1)
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
                text: "Data Deleted Successfully !!",
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

  const handelcarttowish=async(e)=>{
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/wishlist/wish-product/${e}`);
    if (response.status !== 200) return (
        swal({
        title: "Something Went Wrong !!",
        text: "Please Try After Sometime !!",
        icon: "warning"
    }))
    if(response.status==200)(
        swal({
            title: "Success !!",
            text: "Data Added Successfully !!",
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

    useEffect(()=>{
        handelViewCart();
    },[])


    return (
        <div>
            <Header />

            <div className='container'>
                <Link href={'/'} style={{ 'color': 'black', 'textDecoration': 'none' }}><div className='my-3'><FaArrowLeftLong /> Continue Shopping</div></Link>
                <div>
                    {
                        viewcart.map((v)=>(
                            <div className='w-100 border-bottom pb-2 my-5 row'>
                        <div className='col-2 '>
                            <img src={file+v.proo.thumbnail} width='100%' height={150} />
                        </div>
                        <div className='col-10  px-2'>
                            <div className='d-flex justify-content-between'>
                                
                            <div className='fw-bold my-1'>{v.proo.name}</div>

                            <div onClick={()=>deleteproduct(v._id)}><RxCross2 /></div>

                            </div>

                            <div className='text-secondary my-2'>SIZE: {v.size.name}</div>

                            <div onClick={()=>handelcarttowish(v._id)} className='text-secondary cursor-pointer text-decoration-underline my-2'>Move to wishlist <IoHeartOutline className='fs-5 cursor-pointer' /></div>

                            <div className='d-flex justify-content-between mt-4'>
                                <div className='d-flex'>
                                    <button className='border px-2 ' onClick={addition}>+</button>
                                    <div className='border px-2'>{val}</div>
                                    <button className='border px-2 ' onClick={subtraction}>-</button>
                                </div>

                                <div>
                                     &#8377;  {v.proo.price}
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
        </div>
    )
}

export default page

function Handelcheckout(v){
    // console.log(v)
    // const [price,setprice] = useState([])
   let tot=0;
   let price = v.v.map((v)=>(
        v.proo.price
    ))

    price.map((v)=>(
        tot = tot + Number(v)
    ))
    // console.log(tot)
    return(
        <div>
                    <div className='w-100 border d-flex justify-content-between'>
                        <div className='fs-4 fw-bold'>Subtotal({v.v.length<2?v.v.length+' item':v.v.length+' items'})</div>
                        <div className='fs-4 fw-bold'>&#8377; {tot}</div>
                    </div>
                    <div className='w-100' >
                        <button className='w-100 py-3 my-3 bg-dark text-white border-0'>Secure Checkout</button>
                    </div>
                </div>
    )
}