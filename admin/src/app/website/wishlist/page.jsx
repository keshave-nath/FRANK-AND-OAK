'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import './wishlist.css'
import second_slider_img1 from '../../../../public/images/second_slider_img1.jpg'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa6'
import { IoHeartOutline } from 'react-icons/io5'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { ContextAPI } from '@/app/context/Maincontext'

const page = () => {
  const [file, setfile] = useState()
  // const [viewwish, setviewWish] = useState([]);
  let {wishData,setWishData} = useContext(ContextAPI);

  // let {_id} = user;
  let cookieData = Cookies.get('FRANKANDOAK')
  if (cookieData) {
    cookieData = JSON.parse(cookieData)
  }

  const handelWishData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/wishlist/view-wish/${cookieData._id}`)
      if (response.status !== 200) {
        swal({
          text: 'Please try later !!',
          title: 'Something Went Wrong !!',
          icon: 'warning'
        })
      }
      // console.log(response)
      setWishData(response.data.data);
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

  const handeldeletewish = async(e)=>{
    try {
      // console.log(e)
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/franandoak-services/wishlist/delete-wish-item/${e}`)
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
      const indexNo = viewwish.findIndex((wish) => wish._id === e);
      const newData = [...viewwish]
      newData.splice(indexNo, 1);

      setviewWish(newData);
      // handelReadParent();
      // console.log(response.data.data)
     }
     catch(error) {
       console.log(error);
       swal({
        title: "Something Went Wrong !!",
          text: "Internal server error !!",
        icon: "error"
       })
     }
   }

  //  let idd;
  useEffect(() => {
    handelWishData()
  }, [])
  // console.log("WishData",wishData)
  
  return (
    <div>
      <Header />
      <Container className='my-4 index-z'>
        <Row>
          <Col xl={2}>
            <div className='bg-color my-3'>
              <ul className='ul-wishlist'>
                <li>Orders & returns</li>
                <li>Address book</li>
                <li>Account settings</li>
                <li>Wishlist <IoHeartOutline /></li>
                <li>Frank Rewards</li>
                <li>Refer a Friend</li>
              </ul>
            </div>
          </Col>
          <Col xl={10}>
            <h2 className='my-3'>Wishlist</h2>
            <div className='grid-wishlist'>

              {
                wishData.map((v) => (
                  <Link href={`/website/product-details/${v.proo._id}`} style={{
                    'color': 'black', 'textDecoration': 'none'
                    }}>
                  <div className="card border-0 index-z" style={{ width: '250px' }}>
                    <img src={file+v.proo.thumbnail} className="card-img-top cursor-pointer" width={250} height={300} alt="" />
                    <img src={file+v.proo.thumbnail_animation} className="card-img-bottom cursor-pointer" width={250} height={300} alt="" />
                    <div className='btn-position'>Quick Add</div>
                    <div className='wishlist-position'>{Math.floor((v.proo.price/v.proo.mrp)*100)}%</div>
                    <div className="card-body p-0 py-2">
                      <div className="card-title fw-bold d-flex justify-content-between">
                        <div className='fs-12'>{v.proo.name}</div>
                        <FaHeart className='fs-5' onClick={()=>handeldeletewish(v._id)} />
                      </div>
                      <p className="card-text fs-12 py-2"> &#8377;<del>{v.proo.mrp}</del> <span className='text-danger'>{v.proo.price}</span> </p>
                      <p className='fs-12'>Size : {v.size.name}</p>
                      <div className='position-relative '> 
                        <p className='fs-12 color-color'>1 color</p>
                        <span className='colo p-2 rounded-circle position-absolute top-0'
                        style={{
                          backgroundColor:`${v.color.color_code}`
                        }}
                        >
                        </span>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))
              }
              {/* <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div> */}

            </div>

          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default page