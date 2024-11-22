'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common_components/Header'
import Footer from '../../common_components/Footer'
import './productdetails.css'
import '../../clothing/clothing.css'
import { IoHeartOutline } from 'react-icons/io5'
import { BsTruck } from 'react-icons/bs'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { PiArrowCounterClockwiseLight } from 'react-icons/pi'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import recycle from '../../../../../public/images/icon-recycled_polyester_label.svg'
import tree from '../../../../../public/images/icon-organic_cotton.svg'
import Image from 'next/image'
import short from '../../../../../public/images/mens_short.jpg'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { ContextAPI } from '@/app/context/Maincontext'
import { FaHeart } from 'react-icons/fa6'


const page = () => {
    const params = useParams();
    const [products,setProducts] = useState([])
    const [file,setFile] = useState();
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [checkedColors, setCheckColors] = useState([]);
    const [Images,setImages] = useState([]);
    let {user,cartdata,setcartdata,wishh,setwish,wishData} = useContext(ContextAPI);
    
    let nav = useRouter();
    

    const handelFetchedDataByid = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/read-product-by-id/${params._id}`);
            if (response.status !== 200) {
                swal({
                    text: "try after sometime",
                    icon: "warning"
                })
            }
            // console.log(response)
            setProducts(response.data.data);
            setFile(response.data.file_Path);

               const size= response.data.data.sizes.map((v)=>({"name":v.name,"_id":v._id}))
               setCheckedSizes(size)
               

               const colorr= response.data.data.colors.map((v)=>({"color_code":v.color_code,"_id":v._id}))
               setCheckColors(colorr)

               const images = response.data.data.images
               setImages(images)

            //    const produc = [response.data.data.product_Category].map((v)=>v._id)
            //    setproduct(produc)

            


        }
        catch (error) {
            console.log(error);
            swal({
                title: "internal server",
                icon: "error"
            })
        }
    }

    const handelCartData=async()=>{
       
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/cart/add-product`,cartdata);
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))
            swal({
                title: "Success !!",
                text: "Data Added Successfully !!",
                icon: "success"
            })
        }
        catch (error) {
            console.log(error);
            swal({
                title: "internal server",
                icon: "error"
            })
        }
        // .then(
        //     nav.push('/website/add-to-cart')
        // )
    }

    const handelWishlist=async()=>{
        
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/wishlist/wishlist-product`,cartdata);
        if (response.status !== 200) return (
            swal({
            title: "Something Went Wrong !!",
            text: "Please Try After Sometime !!",
            icon: "warning"
        }))
        if(wishData.map((v)=>v.proo._id==products._id))
        {
            setwish(true);
        }
        else{
            setwish(false);
        }
        swal({
            title: "Success !!",
            text: "Data Added Successfully !!",
            icon: "success"
        })
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
        handelFetchedDataByid();
    },[])
    // console.log(wishData)
    // console.log(file , products,checkedSizes,checkedColors,Images)
    // console.log(products.images)
    // console.log(wishData,products)

    return (
        <div>
            <Header />

            <div className="w-100 row row-cols-1 row-cols-lg-2  px-4">
                <div className="width-60 row row-cols-2 px-4">
                    <div>
                        <img src={file+products.thumbnail} width={200} height={500} className='w-100 my-3' />
                    </div>

                    <div>
                        <img src={file+products.thumbnail_animation} width={200} height={500} className='w-100 my-3' />
                    </div>
               
                   {
                    Images.map((v,i)=>(
                        <div>
                          <img src={file+v} width={200} height={500} className='w-100 my-3' />
                         </div>

                    ))
                   }
                    
                   
                </div>
                <div className='width-40'>
                    <div className='border-bottom mt-4 pb-5'>
                        <div className='fw-bold'>
                            <p>Home/men/shop all</p>
                        </div>
                        <div className='fw-bold'>
                            <p>{products.name}</p>
                        </div>
                        <div className='fw-bold'>
                            <p>&#8377; {products.price} / <span className='text-decoration-line-through'>{products.mrp}  </span>
                            <span className='text-danger ms-2'> {
                                Math.floor((products.price/products.mrp)*100)
                                }%</span>
                            </p>
                        </div>
                        <div>
                            <p>4 interest-free payments. Available for orders above $35. <b>Klarna</b>. </p>
                        </div>
                    </div>

                    <div className='border-bottom pb-4'>
                        <div className='mt-4'>
                            <p>Color</p>
                        </div>
                        <div className='d-flex'>
                            {
                                checkedColors.map((v)=>(
                                   <HandelColorsbutton v={v} p={products} />
                                ))
                            }
                            
                        </div>
                        <div className='mt-4'>
                            <p>Select Size</p>
                        </div>
                        <div className='d-flex'>
                            {
                                checkedSizes.map((v)=>(
                                    <Handelsizebutton v={v} />
                                ))
                            }
                            
                        </div>
                        <div className='d-flex mt-3'>
                            <div className='width-75'>
                                <button onClick={handelCartData} className='w-100 py-3 px-5 border-0 bg-dark text-white'>Add to cart</button>
                            </div>
                            <div className='pt-3 px-2 ms-2 border border-2 border-dark' onClick={handelWishlist}>
                                {
                                    wishh==true?<FaHeart className='fs-3 cursor-pointer mx-1' />:<IoHeartOutline className='fs-3 cursor-pointer mx-1' />
                                }
                                </div>
                        </div>
                        <div className='w-100 mt-3 text-center border border-dark rounded-pill'>
                            <p>Get 15% off your order*</p>
                        </div>
                    </div>

                    <div className='border-bottom d-flex py-3'>
                        <div className='d-flex'>
                            <div>
                                <MdOutlineLocalShipping className='fs-4 me-2' />
                            </div>
                            <div>
                                <p>Free Shipping over $99</p>
                            </div>
                        </div>

                        <div className='d-flex ms-5'>
                            <div>
                                <PiArrowCounterClockwiseLight className='fs-4 me-2' />
                            </div>
                            <div>
                                <p>Free Returns</p>
                            </div>
                        </div>
                    </div>

                    <div className='border-bottom py-3'>
                        <div>
                            <p className='fw-bold fs-5'>Overview</p>
                        </div>

                        <div>
                            <p>Thanks to pops around the world, your head just got an upgrade. The Dad cap is the soft, slightly-curved, low-sitting cousin to the classic baseball cap. Organic cotton canvas. Six-panel design. Logo label at front.</p>
                        </div>
                    </div>

                    <div className='border-bottom py-3'>
                        <Accordion defaultActiveKey="0" flush className=' z-index-1'>
                            <Accordion.Item eventKey="0" className='z-index-1'>

                                <Accordion.Header className='z-index-1 p-0'>Features</Accordion.Header>
                                <Accordion.Body>
                                    <p>Sustainable Materials</p>
                                    <div className='d-flex'>
                                        <Image src={recycle} width={30} alt="" />
                                        <p className='ms-2 cursor-pointer '>Recycled Polyester Label</p>
                                    </div>
                                    <div className='d-flex'>
                                        <Image src={tree} width={30} alt="" />
                                        <p className='ms-2 cursor-pointer'>Organic Cotton</p>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className='z-index-1'>
                                <Accordion.Header className='z-index-1'>Shipping & Returns</Accordion.Header>
                                <Accordion.Body>
                                    <div className='lh-lg'>
                                        <div>
                                            Free and Easy Returns
                                        </div>
                                        <div>
                                            You have 15 days from the date your order is shipped to request a prepaid return shipping label online. Visit our FAQ for our full return policy.
                                        </div>

                                        <table class="table mt-3">
                                            <thead>
                                                <tr className='table-secondary'>
                                                    
                                                    <th colSpan={3} scope="col">American Addresses</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    
                                                    <td>Standard (orders over $99)</td>
                                                    <td>3-5 Days</td>
                                                    <td>FREE</td>
                                                </tr>
                                                <tr>
                                                   
                                                    <td>Standard</td>
                                                    <td>3-5 Days</td>
                                                    <td>$15</td>
                                                </tr>

                                                <tr className='table-secondary'>
                                                    
                                                    <td scope="col">Purchases under $800</td>
                                                    <td colSpan={2} scope="col">NO DUTIES</td>
                                                </tr>

                                                <tr className=''>
                                                    
                                                    <td scope="col">Purchases over $800</td>
                                                    <td colSpan={2} scope="col">Duties applicable</td>
                                                </tr>
                                              
                                            </tbody>
                                        </table>

                                        <table class="table mt-5">
                                            <thead>
                                                <tr className='table-secondary'>
                                                    
                                                    <th colSpan={3} scope="col">Canadian Addresses</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    
                                                    <td>Standard (orders over $99)</td>
                                                    <td>3-5 Days</td>
                                                    <td>FREE</td>
                                                </tr>
                                                <tr>
                                                   
                                                    <td>Standard</td>
                                                    <td>3-5 Days</td>
                                                    <td>$15</td>
                                                </tr>
                                              
                                            </tbody>
                                        </table>

                                        <div>
                                            Online orders take 2 to 3 days to fulfill
                                        </div>
                                        <div>
                                            Free standard shipping offer is valid on orders placed on http://frankandoak.com  and http://ca.frankandoak.com  with a minimum purchase value of $99 after discounts and before taxes or any other associated fees are applied. Offer cannot be applied to past purchases. Additional restrictions may apply.
                                        </div>
                                        <div>
                                            Visit our Orders & Shipping FAQ for more information on shipping rates and delivery times.
                                        </div>
                                        <div>
                                            International Addresses
                                        </div>
                                        <div>
                                            Note: International shipping, outside of the US and Canada, is temporarily unavailable. We look forward to shipping around the world again soon!


                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}



export default page

function Handelsizebutton(v){
    let {cartdata,setcartdata} = useContext(ContextAPI);
    // console.log('size',v)
    const [shad,setshad] = useState(false);
    // const [selectsize,setsize] = useState([]);
    const handelSelectSize = (e)=>{
        const size = e.target.value
        setcartdata({...cartdata,size})
        setshad(!shad)  
        }
    
    return(
        <button value={v.v._id} className={`px-2  me-2 border ${shad == true?'bg-dark text-white':''}`}
                                    onClick={handelSelectSize}
                                    >{v.v.name}</button>
    )
}

function HandelColorsbutton(v){
    // console.log(v)
    let {user,cartdata,setcartdata} = useContext(ContextAPI);

    const [selcol,setselcol] = useState(true);

    const handelSelectColor = (e)=>{
        const color=e;
        const userr = user._id;
        const proo = v.p._id;
        // setcartdata({...cartdata,});
        
        setcartdata({...cartdata,color,userr,proo})
        setselcol(!selcol);
    }


    return(
        <button 
        style={{
            backgroundColor:`${v.v.color_code}`
        }}
        className={`p-3 ${selcol==true?'border border-black':'border border-2 border-black'}  rounded-circle me-2`}
        onClick={()=>handelSelectColor(v.v._id)}
        
        ></button>
    )
}