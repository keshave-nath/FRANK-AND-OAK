'use client'
import React, { useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'

const page = () => {
    const [searchdata,setsearchdata]=useState([]);
    const [file,setfile]=useState()
    const handelform=async(e)=>{
        // console.log(e.target.value)
        try{
            if(!e.target.value)return
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/search-product/${e.target.value}`)
            if(response.status!==200)return(
                swal({
                    title: "Something went wrong !!",
                    text:'Please try after sometime !!',
                    icon: "warning",
                })
            )
            setsearchdata(response.data.data)
            setfile(response.data.file_path);
            // console.log(response)
        }
        catch(error){
            console.log(error)
            swal({
                title: "Something went wrong !!",
                text:'Internal Server Error !!',
                icon: "error",
            })
        }
    }
    // console.log(searchdata)

  return (
    <div>
        <Header/>
            <div className=' p-2 border-bottom'>
                <form >
                <div className='position-relative'>
                    <input type="search" name='search' onChange={handelform} className='w-100 p-2 border-0'
                    style={{
                        outline:'none'
                    }}
                    placeholder='Search' />
                    {/* <div className='position-absolute top-0  end-0'>

                    <RxCross2  className='fs-3 me-3 mt-2'/>
                    </div> */}
                </div>
                </form>
            </div>
            <div className='p-3 mt-3'>
            <Row >
                <Col xl={2}>
                    <div className='fw-bold fs-4'>
                        Suggestions
                    </div>
                    <div >
                        {
                            searchdata.map((v)=>(
                                <p className='my-2'>{v.name}</p>
                            ))
                        }
                    </div>
                </Col>
                <Col xl={10} className='d-flex '>
                    {
                        searchdata.map((v)=>(
                            <Link href={`/website/product-details/${v._id}`} 
                            style={{
                                'color': 'black', 'textDecoration': 'none'}}>
                                <div style={{
                                width:'250px',
                                marginRight:'20px'
                            }}>
                                <div>
                                    <img src={file+v.thumbnail}  width='100%' height={300}    alt="" />
                                </div>
                                <div>
                                    <div className='my-2 fw-bold'>{v.name}</div>
                                    <div className='my-2'>Price : &#8377;<span className='text-danger' > {v.price} </span></div>
                                </div>
                            </div></Link>
                        ))
                    }
                </Col>
            </Row>
            </div>
        <Footer/>
    </div>
  )
}

export default page