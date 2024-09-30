'use client'
import './style.css'
import './website/common_components/footer.css'
import Header from "./website/common_components/Header";
import Footer from "./website/common_components/Footer";
import gif from '../../public/images/Stockroom_sale_homepage.webp'
import Image from 'next/image';
import logo from '../../public/images/favicon.png'
import { Col, Container, Row } from 'react-bootstrap';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { PiArrowCounterClockwiseLight } from 'react-icons/pi';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import tshirts from "../../public/images/tshirts.jpg";
import mens_shorts from '../../public/images/mens_short.jpg'
import capris from '../../public/images/capris.jpg'
import mens_tshirts from '../../public/images/mens_tshirt.jpg'
import women_gown from "../../public/images/women_gown.jpg";
import women_shorts from '../../public/images/women_shorts.jpg'
import { BiSolidStar } from 'react-icons/bi';

import second_slider_img1 from '../../public/images/second_slider_img1.jpg';
import second_slider_img2 from '../../public/images/second_slider_img2.jpg';
import second_slider_img3 from '../../public/images/second_slider_img3.jpg';
import second_slider_img4 from '../../public/images/second_slider_img4.jpg';
import second_slider_img5 from '../../public/images/second_slider_img5.jpg';
import second_slider_img6 from '../../public/images/second_slider_img6.jpg';
import { CiStar } from 'react-icons/ci';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  // let all = document.querySelector(".content")
  // let all_btn = document.querySelector(".btn_content")
  // console.log(all_btn);

  // function tab(v) {
  //   all.forEach(val,index => {
  //     all[index].classList.remove("active");
  //     all_btn[index].classList.remove("activebtn");
  //   });
  //   all[v].classList.add("active");
  //   all_btn[v].classList.add("activebtn");

  // }



  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplayspeed: 7000,
  }
  return (
    <>
      <div>
        <Header />
        <div className='w-100'>
          {/* <Row xl={1} md={}> */}
            <div className='main-width'>
              <div>
                <h1 className='font-size-main'> The<br /> Stockroom Sale</h1>
                <div>
                  <button className='btn-main'>Women</button>
                  <button className='btn-main'>Men</button>
                </div>
              </div>
              <div>
                <Image alt='' src={gif} width={500} />
              </div>
            </div>
          {/* </Row> */}

          <div className='w-100 bg-black text-white fs-12 p-1'>
            <Container className='d-flex justify-content-evenly align-items-center'>
              <div className='d-flex  align-items-center '>
                <MdOutlineLocalShipping className='fs-4 ' />
                <div className='my-2 mx-2'>Free Shipping</div>
              </div>

              <div className='d-flex  align-items-center '>
                <PiArrowCounterClockwiseLight className='fs-4 ' />
                <div className='my-2 mx-2'>Free Return</div>
              </div>

              <div className='d-flex  align-items-center '>
                <Image alt='' src={logo} width={30} className=' rounded-circle border border-white border-2 p-1' />
                <div className='my-1 mx-2'>Frank Rewards</div>
              </div>

              <div className='d-flex  align-items-center '>
                <HiOutlineCreditCard className='fs-4 ' />
                <div className='my-2 mx-2'>Buy Now, Pay Later</div>
              </div>

            </Container>
          </div>

          <div className='my-5 mx-auto'>
            <h2 className='mx-4'>Featured Categories</h2>
            <Row xl={6} md={3} sm={2} className='mx-3 my-5'>
              <Col className='p-1'>
                <Image alt='' src={women_gown} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Women Dresses at $40</h4>
              </Col>

              <Col className='p-1'>
                <Image alt='' src={mens_shorts} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Mens Shorts at $25</h4>
              </Col>

              <Col className='p-1'>
                <Image alt='' src={mens_tshirts} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Womens Tops from $20</h4>
              </Col>

              <Col className='p-1'>
                <Image alt='' src={capris} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Mens Pants & Jeans at $35</h4>
              </Col>

              <Col className='p-1'>
                <Image alt='' src={women_shorts} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Womens Shorts & Skirts at $25</h4>
              </Col>

              <Col className='p-1'>
                <Image alt='' src={tshirts} width={200} />
                <h4 className='fs-6 fs-400 my-2'>Mens Tops from $20</h4>
              </Col>
            </Row>
          </div>

          <div className='d-flex'>
            {/* <div className='content'>1.lorem</div>
            <button onClick={() => tab(0)} className='btn_content'>click-1</button>

            <div className='content'>2.lorem</div>
            <button onClick={() => tab(1)} className='btn_content'>click-2</button> */}
          </div>

          <div className='w-100 p-5 bg-color'>
            <div className='text-center  mb-5'>
              <span className='fs-3 fw-600'>You didn't hear it from us</span>

            </div>
            <Slider {...settings}>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 118 reviews</span>
                    <div>Very flattering cut,comfortable fabric and nice details . Wish I had bought a few of these</div><br />
                    <div className='font-color'>Amy H.</div><br /><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img1} width={300} />
                </div>
              </div>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 132 reviews</span>
                    <div>Great summer shirt, already have in another color. Fit is also great and true to size. Would recommend!</div><br />
                    <div className='font-color'>Angelo N.</div><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img2} width={300} />
                </div>
              </div>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 79 reviews</span>
                    <div>Great staple wardrobe piece and a flattering fit</div><br />
                    <div className='font-color'>Lee-Anne D.</div><br /><br /><br /><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img3} width={300} />
                </div>
              </div>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><CiStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 48 reviews</span>
                    <div>So comfy! Easily the comfiest softest shirt I own, while also being very breathable</div><br />
                    <div className='font-color'>Travis M.</div><br /><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img4} width={300} />
                </div>
              </div>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 127 reviews</span>
                    <div>Love these pants — they're fitted and give outfits a clean look, but they're also very stretchy and non-constrictive.</div><br />
                    <div className='font-color'>Chris O.</div><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img5} width={300} />
                </div>
              </div>

              <div>
                <div className='d-flex mx-4'>
                  <div className='bg-white p-3'>
                    <BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' /><BiSolidStar className='mx-2 fs-5' />
                    <span className='fs-12'>Based on 134 reviews</span>
                    <div>This is my third pair.Love the way they fit.</div><br />
                    <div className='font-color'>Justine B.</div><br /><br /><br /><br /><br /><br /><br />
                    <span className='cursor-pointer border-btm'>Shop now</span>
                  </div>
                  <Image alt='' src={second_slider_img6} width={300} />
                </div>
              </div>



            </Slider>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;

