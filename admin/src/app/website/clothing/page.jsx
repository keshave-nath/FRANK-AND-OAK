'use client'
import React, { useContext, useEffect, useState } from 'react'
// import Header from '../common_components/Header'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
// import Footer from '../common_components/Footer'
import './clothing.css'
import Link from 'next/link'
import Image from 'next/image'
import tshirt from '../../../../public/images/tshirts.jpg'
import { IoHeartOutline } from 'react-icons/io5'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import axios from 'axios'
import swal from 'sweetalert'
import { ContextAPI } from '@/app/context/Maincontext'

const page = () => {

    const [activeData, setactiveData] = useState([]);
    // const [parent, setParent] = useState([]);
    const [products, setProducts] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [file, setFile] = useState();
    const [ProductFilter, setProductFilter] = useState([]);
   const {FilterData,setFilterData,SizeFilter,setSizeFilter,ColorFilter, setColorFilter}=useContext(ContextAPI);
   
   
    // const handelParentcategory = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/active-parent-categories`)
    //         if (response.status !== 200) {
    //             swal({
    //                 title: "Something went wrong !!",
    //                 text: "Please try after sometime !!",
    //                 icon: "error"
    //             })
    //         }
    //         setParent(response.data.data)
    //     }
    //     catch (error) {
    //         console.log(error);
    //         swal({
    //             title: "Something went wrong !!",
    //             text: "Internal Server Error !!",
    //             icon: "error"
    //         })
    //     }

    // }
   

    const handelProductCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/active_product_categories`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setProducts(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelSizes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/active-Size`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setSize(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelColors = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/active-colors`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setColor(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelProductsApi = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/active-products`);
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please try again later",
                    icon: 'warning'
                })
            )
            // console.log(response)
            setactiveData(response.data.data)
            setFile(response.data.file_Path)
        }
        catch (error) {
            console.log(error)
            swal({
                title: "Something Went Wrong !!",
                text: "Something went wrong in server",
                icon: 'error'
            })
        }
    }

    const handelValueProduct = (e) => {
        // console.log("Product",e);
        if (e.target.checked) {
            setProductFilter([...ProductFilter, e.target.value]);
        }
        else {
            setProductFilter(ProductFilter.filter(item => item != e.target.value))
        }   
        setFilterData({...FilterData,product:ProductFilter})
    }

    const data={
        product:ProductFilter,
        size:SizeFilter,
        color:ColorFilter
    }

    useEffect(() => {
        handelProductsApi();
        handelProductCategories();
        handelSizes();
        handelColors();
    }, [])

    // console.log('active',activeData,products, size, color)
    // console.log(FilterData,ProductFilter)
    console.log("Data",data)
    return (
        <div>
            <Header />
            <div>
                <div className='text-center bg-color'>
                    <div className='fs-3 fw-bold'> The Stockroom Sale</div>
                    <div className='fs-5 my-2'>Incomparable price,from warehouse to you.</div>
                </div>
                <Row className='px-3 py-5 m-0'>
                    <Col xl={3} className='scroll'>
                        <div><Link href='/' className='active'>Home</Link> /<span className='active'> Women</span> </div>
                        <div className='fs-5 my-3'>The Stockroom Sale</div>

                        <Accordion defaultActiveKey="0" flush className=' z-index-1'>
                            <Accordion.Item eventKey="0" className='z-index-1'>

                                <Accordion.Header className='z-index-1 p-0'>Subcategory</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        {
                                            products.map((v) => (
                                                <li className='cursor-pointer '><input type='checkbox' value={v.name} onClick={handelValueProduct} checked={ProductFilter.includes(v.name)} /> {v.name} </li>
                                            ))
                                        }
                                        {/* <li className='cursor-pointer'><input type='checkbox' /> Sweaters</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Blazers</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Button-Down Shirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Shorts & Skirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Dresses</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Overshirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Pants</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Denim</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Jackets</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Accessories</li> */}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className='z-index-1'>
                                <Accordion.Header className='z-index-1'>Size</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500 d-flex flex-wrap gap-4'>
                                        {
                                            size.map((v) => (
                                                <HandelSizeLi v={v} />
                                            ))
                                        }
                                        {/* <li className='cursor-pointer'><span className='border border-1 p-2'>XS</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>S</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>M</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>L</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>XL</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2 '>ONE SIZE</span></li> */}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Color</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        {
                                            color.map((v) => (
                                               <HandelColorLi v={v}/>
                                            ))
                                        }
                                        {/* <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-black p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Black</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-light p-1 px-2'></span> &nbsp;&nbsp;&nbsp;White</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-blue p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Blue</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-beige p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Beige</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-brown p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Brown</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-secondary p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Gray</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-purple p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Purple</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-yellow p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Yellow</li> */}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Price</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'><input type='checkbox' /> $0-$50</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $50-$100</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $100-$200</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $250-$500</li>

                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <div className='border border-1 my-3'></div>

                        <div>
                            <div className='fw-bold fs-12 my-3'>Featured</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='text-success lh-lg cursor-pointer'>New In</li>
                                <li className='lh-lg cursor-pointer'>Best Seller</li>
                                <li className='lh-lg cursor-pointer'>The Originals</li>
                                <li className='lh-lg cursor-pointer'>Workwear</li>
                                <li className='lh-lg cursor-pointer'>Sale</li>
                            </ul>

                            <div className='fw-bold fs-12 my-3'>Clothing</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='lh-lg cursor-pointer'>Shop All</li>
                                <li className='lh-lg cursor-pointer'>T-Shirts & Tops</li>
                                <li className='lh-lg cursor-pointer'>Blouses & Shirts</li>
                                <li className='lh-lg cursor-pointer'>Dresses & Jumpsuite</li>
                                <li className='lh-lg cursor-pointer'>Skirts & Shorts</li>
                                <li className='lh-lg cursor-pointer'>Sweaters & Cardigans</li>
                                <li className='lh-lg cursor-pointer'>Blazers & Overshirts</li>
                                <li className='lh-lg cursor-pointer'>Jackets & Coats</li>
                                <li className='lh-lg cursor-pointer'>Denim</li>
                                <li className='lh-lg cursor-pointer'>Pants</li>
                            </ul>

                            <div className='fw-bold fs-12 my-3'>Accessories</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='lh-lg cursor-pointer'>Shop All</li>
                                <li className='lh-lg cursor-pointer'>Caps & Hats</li>
                                <li className='lh-lg cursor-pointer'>Shoes & Boots</li>
                                <li className='lh-lg cursor-pointer'>Bags</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xl={9} className='p-3'>
                        <div className='fs-4 my-3'>New In</div>

                        <Row xl={4} >

                            {
                                activeData.map((v, i) => (
                                    <Link href={`/website/product-details/${v._id}`} style={{
                                        'color': 'black', 'textDecoration': 'none'
                                    }}>
                                        <Col className='mx-2 cursor-pointer p-0 ' style={{ 'width': '250px' ,'marginBottom':'150px'}}>
                                            <div className='cards z-index-1' style={{ 'width': '250px', 'position': 'relative' }}>
                                                <div style={{
                                                    height: '350px'
                                                }}>
                                                    <img src={file + v.thumbnail} width={250} height={350} className='img' />
                                                    <img src={file + v.thumbnail_animation} width={250} height={350} className='imagee' alt="" />
                                                </div>
                                                <button className='border-0 clothing-button'>
                                                    <div className='quick'>Quick Add</div>
                                                    <div className='size row row-cols-4'>
                                                        {
                                                            v.sizes.map((v) => (
                                                                <button className='border-0 ms-2 mt-2'>
                                                                    {v.name}
                                                                </button>
                                                            ))
                                                        }
                                                    </div>
                                                </button>
                                                <div className='d-flex position-absolute w-100'
                                                    style={{
                                                        top: '350px'
                                                    }}
                                                >
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between w-100 '>
                                                            <p className='fs-12 fw-bold my-3'>{v.short_discription}</p>
                                                            <div>
                                                                <IoHeartOutline className='my-3' />
                                                            </div>
                                                        </div>
                                                        <p className='fs-12 fw-bold'>&#8377; {v.price}</p>
                                                        {
                                                            v.colors.map((v) => (
                                                                <button className=' ms-2 collo border-0 rounded-circle'
                                                                    style={{
                                                                        padding: '10px 10px',
                                                                        backgroundColor: `${v.color_code}`
                                                                    }}
                                                                >
                                                                    <span className='border bord  border-dark rounded-circle'></span>
                                                                </button>
                                                            ))
                                                        }
                                                        <p className='fs-12 position-absolute top-50 color fw-bold my-3'>{v.colors.length} colour</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </Col>
                                    </Link>
                                ))
                            }

                        </Row>

                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default page

function HandelSizeLi({ v }) {
    const {SizeFilter, setSizeFilter,FilterData,setFilterData} = useContext(ContextAPI);
    const [Sizesel, setSizesel] = useState(false);
    const handelValueProductSize = (e) => {
        // console.log("Size",e.target.value)
        if(Sizesel === false) {
            setSizeFilter([...SizeFilter,e.target.value]);
            if(SizeFilter.map(item => item == e.target.value)) (
                setSizesel(true)
            )
        }
        if(Sizesel===true){
            setSizesel(false);
            setSizeFilter(SizeFilter.filter(item => item != e.target.value))
        }
        setFilterData({...FilterData,size:SizeFilter})
        
    }
    // console.log(FilterData)
    return (
        <li className='cursor-pointer'><button value={v.name} className={`${Sizesel === true ? 'border border-black border-2 bg-dark text-white' : 'border border-1'} px-2`}
            onClick={handelValueProductSize}
        >{v.name}</button></li>
    )
}

function HandelColorLi({ v }) {
    const [Colorsel, setColorsel] = useState(false);
    const {ColorFilter, setColorFilter,FilterData,setFilterData} = useContext(ContextAPI);
    const handelValueProductColor = (e) => {
        // console.log("Size",e.target.value)
        if(Colorsel === false) {
            setColorFilter([...ColorFilter,e.target.value]);
            if(ColorFilter.map(item => item == e.target.value)) (
                setColorsel(true)
            )
            setFilterData({...FilterData,color:ColorFilter})
        }
        if(Colorsel===true){
            setColorsel(false);
            setColorFilter(ColorFilter.filter(item => item != e.target.value))
            setFilterData({...FilterData,color:ColorFilter})
        }
        
    }
    // console.log(FilterData)
    return (
        <li className='cursor-pointer'><button value={v.color} className={`rounded-circle ${Colorsel==true?'border border-1 border-black':'border border-0'} py-2 px-2`}
        style={{
            backgroundColor: `${v.color_code}`
        }}
        onClick={handelValueProductColor}
         ></button>&nbsp;&nbsp;{v.color}</li>
    )
}