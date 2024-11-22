'use client'
import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import Image from 'next/image';
import logo from '../../../../public/images/FAO_logo2.jpg';
import Link from 'next/link';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoHeartOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import stockroom_men_header from '../../../../public/images/stockroom_men_header.jpg';
import stockroom_women_header from '../../../../public/images/stockroom_women_header.jpg';
import header_women1 from '../../../../public/images/header_women1.jpg';
import header_women2 from '../../../../public/images/header_women2.jpg';
import header_men1 from '../../../../public/images/header_men1.jpg';
import header_men2 from '../../../../public/images/header_men2.jpg';

import Who_we_are from '../../../../public/images/Who_we_are.jpg';
import jeans_story from '../../../../public/images/jeans_story.jpg';
import jacket_story from '../../../../public/images/jacket_story.jpg';
import factory_story from '../../../../public/images/factory_story.jpg';
import bundle_story from '../../../../public/images/bundle_story.jpg';
import cotton_story from '../../../../public/images/cotton_story.jpg';
import { FaBars } from 'react-icons/fa6';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import Loginform from './Loginform';
import { ContextAPI } from '@/app/context/Maincontext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { PiBookOpenTextFill } from 'react-icons/pi';

const Header = () => {
  const nav = useRouter();
  let {user,setUser,viewuser,setView} = useContext(ContextAPI)
  const [loginModal, setLoginModal] = useState(false);
  const [show, setShow] = useState(false);
  const [Profile,setProfile] = useState(false);
  // const [show2,setShow2]=useState(false);
  const [search,setSearch]=useState(false);
  


  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const handelLoginmodel = async()=>{
    setLoginModal(!loginModal)
    setProfile(!Profile)
  }

  const checkedifloggedin =()=>{
    
    let cookiedata= Cookies.get("FRANKANDOAK")
    if(!cookiedata){
      //  nav.push("/")
    }
    else{
     cookiedata = JSON.parse(cookiedata);
     setUser(cookiedata)
    //  console.log(cookiedata)
     setView(true)
    
    }
   }
 
   const handlelogout=()=>{
     Cookies.remove("FRANKANDOAK")
     
     setView(false)
     nav.push("/")
   }

   const handelsearchpage=()=>{
      if(search===false){
        nav.push('/website/search')
        setSearch(true)
      }
      else if(search===true){
        nav.push('/')
        setSearch(false)
      }
   }

   useEffect(()=>{checkedifloggedin();},[])

  // console.log(loginModal);
  // console.log(user)
  // console.log(search)
  return (
    <div>
      <header className='header'>
        <div className='bg-black text-white p-1'>
          <div className='w-60 mx-auto'>
            <Slider {...settings}>
              <div className='text-center fs-7'>
                <b>Just in: New organic cotton pieces for effortless looks.</b><u>Shop Women</u> <u>Shop Man</u>
              </div>
              <div className='text-center fs-7'>
                <b>These prices come once in a lifetime</b>.<u>Shop Women's Stockroom Sale</u> <u>Shop Man's Stockroom Sale</u>
              </div>
              <div className='text-center fs-7'>
                Enjoy <b>free shipping on orders over $ 99</b> and <b>free return</b>
              </div>
            </Slider>
          </div>
        </div>
        <div className='px-2 d-flex justify-contents-between position-sticky align-items-center bg-white w-100'>
          <div className='d-flex justify-contents-between w-80 header_inner'>

            <abbr title='logo'><Link href='/' className='cursor-pointer'><Image src={logo} width={150} height={30} className='mt-1' /></Link></abbr>


            <ul className=' d-flex justify-content-around align-items-center m-0 header_items'>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='The Stockroom Sale'><li className='mx-2 fs-6 p-2 text-danger stockroom'>

                The Stockroom Sale
                <div className='mega_menu_stockroom text-black'>
                  <div>
                    <div className='fs-7 my-3'><Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><u>Women's Stockroom Sale</u></Link></div>
                    <ul>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Shop All</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Accessories starting at $10</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Tops starting at $20</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Swimwear at $20</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Bottoms starting at $20</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Dresses at $40</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Blazers at $65</li></Link>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Jackets starting at $75</li></Link>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><u>Men's Stockroom Sale</u></Link></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Accessories starting at $10</li>
                      <li>Tops starting at $20</li>
                      <li>Swimwear at $20</li>
                      <li>Bottoms starting at $20</li>

                      <li>Blazers at $65</li>
                      <li>Jackets starting at $75</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={stockroom_women_header} width={300} className='my-4' />
                    <div className='inner_text'>Women's Stockroom Sale</div>
                  </div>
                  <div className='position-relative'>
                    <Image src={stockroom_men_header} width={300} className='my-4' />
                    <div className='inner_text'>Men's Stockroom Sale</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Women'><li className='mx-2 fs-6 p-2 women'>
                Women
                <div className='mega_menu_women'>
                  <div>
                    <div className='fs-7 my-3'><u>Featured</u></div>
                    <ul>
                      <li>New In</li>
                      <li>Best Sellers</li>
                      <li>Linen,the frabic of summer</li>
                      <li>The Originals</li>
                      <li>Workwear</li>
                      <li>Gift Cards</li>
                      <li className='text-danger'>Sale</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Clothing</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li> T-shirts & Tops</li>
                      <li>Blouses & Shirts</li>
                      <li>Dresses & Jumpsuits</li>
                      <li>Skirts & Shorts</li>
                      <li>Swimwear</li>
                      <li>Matching Sets</li>
                      <li>Sweaters & Cardigans</li>
                      <li>Jackets & Coats</li>
                      <li>Denim</li>
                      <li>Pants</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Accessories</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Caps & Hats</li>
                      <li>Shoes & Boots</li>
                      <li>Bags</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_women1} width={300} height={400} className='my-4' />
                    <div className='inner_text'>Shorts</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_women2} width={250} height={400} className='my-4' />
                    <div className='inner_text'>T-shirts & Tops</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Men'><li className='mx-2 fs-6 p-2 men'>
                Men
                <div className='mega_menu_men'>
                  <div>
                    <div className='fs-7 my-3'><u>Featured</u></div>
                    <ul>
                      <li>New In</li>
                      <li>Best Sellers</li>
                      <li>Linen,the frabic of summer</li>
                      <li>The Originals</li>
                      <li>Workwear</li>
                      <li>Gift Cards</li>
                      <li className='text-danger'>Sale</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Clothing</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>T-shirts & Tanks</li>
                      <li>Shirts & Polo Shirts</li>
                      <li>Shorts</li>
                      <li>Swimwear</li>
                      <li>Sweaters & Cardigans</li>
                      <li>Overshirts & Blazers</li>
                      <li>Jackets & Coats</li>
                      <li>Denim</li>
                      <li>Pants</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Accessories</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Caps & Hats</li>
                      <li>Shoes & Boots</li>
                      <li>Bags</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_men1} width={250} height={300} className='my-4 ms-5' />
                    <div className='inner_text'>T-shirt</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_men2} width={250} height={300} className='my-4' />
                    <div className='inner_text'>Shorts</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Our Story'><li className='mx-2 fs-6 p-2 our_story'>
                Our Story
                <div className='mega_menu_story'>

                  <div className='position-relative'>
                    <Image src={Who_we_are} width={220} height={300} />
                    <div className='inner_text'>Who we are</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={cotton_story} width={220} height={300} />
                    <div className='inner_text'>Sustainable Pracitices</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={jeans_story} width={220} height={300} />
                    <div className='inner_text'>Design Philosophy</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={jacket_story} width={220} height={300} />
                    <div className='inner_text'>Frabic</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={bundle_story} width={220} height={300} />
                    <div className='inner_text'>Circular Denim <sup>TM</sup></div>
                  </div>

                  <div className='position-relative'>
                    <Image src={factory_story} width={220} height={300} />
                    <div className='inner_text'>Partner & Factories</div>
                  </div>

                </div>
              </li></abbr>

            </ul>

          </div>
          <div className='text-end w-25'>

            <HiMagnifyingGlass className='fs-3 cursor-pointer mx-2' onClick={handelsearchpage} />

            <IoPersonCircleOutline
              className='fs-3 cursor-pointer  mx-2 position-relative'
              
              onClick={ handelLoginmodel } />
              
              {
                viewuser==true?
                <div className={`position-absolute ${Profile==true?'':'d-none'} bg-white w-20`}>
                  <div className='my-2 px-4'>
                    <h3>My account</h3>
                  </div>
                  <div className='bg-dark text-white fw-bold py-3'>
                    <div className='d-flex justify-content-between w-75 py-2 mx-auto border-bottom'>
                      <div>{user.f_name}</div>
                      <div>{user.l_name}</div>
                    </div>

                    <div className='d-flex justify-content-between w-75 py-2 mx-auto border-bottom'>
                      <div>Points :</div>
                      <div>20</div>
                    </div>

                    <div className='d-flex justify-content-between w-75 py-2 mx-auto border-bottom'>
                      <div>Tier :</div>
                      <div>Community</div>
                    </div>

                    <div className='text-center my-3 border border-2   w-75 p-2 mx-auto'>
                      <button className=' text-white bg-transparent border-0 '>
                        View Your Dashboard
                      </button>
                    </div>
                  </div>
                  <div className='fw-bold w-75 py-2 mx-auto lh-lg border-bottom '>
                    <div>Wishlist<IoHeartOutline className='fs-4  mx-2' /> </div>
                    <div>Order & returns</div>
                    <div>Address book</div>
                    <div>Account setting</div>
                  </div>
                  <div className='text-center  my-3 w-75 p-2 mx-auto'>
                      <button onClick={handlelogout} className='text-secondary text-decoration-underline cursor-pointer bg-white border-0'>Log out</button>
                  </div>
                </div>
                
                :
                <div className={
                  loginModal ? 'model' : 'd-none'
                }>
                  <Loginform close={setLoginModal} />
                </div>
              }


            {/* <div className='modal'>
              hello model
            </div> */}

            <Link href='/website/wishlist' style={{ 'color': 'black' }}><IoHeartOutline className='fs-3 cursor-pointer mx-2' /></Link>

            {/* offcanvas */}


            <Link href='/website/add-to-cart' style={{ 'color': 'black' }}>
              <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' />
            </Link>

            <Link href='/website/order-list' style={{ 'color': 'black' }}>
            <PiBookOpenTextFill className='fs-3 cursor-pointer mx-2 me-3' />
            </Link>



            {/* <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' /> */}

            {/* <button className='btn-header' onClick={() => setShow(true)}>
                
                <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' />
              </button>

              <Offcanvas show={show} onHide={() => setShow(false)} placement='end' name='end' key='1'>

                <Offcanvas.Header closeButton>
                  <HiMagnifyingGlass className='fs-3 cursor-pointer mx-2' />
                </Offcanvas.Header>


                <Offcanvas.Body className='p-0'>
                  <div>

                    <div className='width'>
                      <ul className=''>
                        <li className='text-danger'>The Stockroom Sale</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Our Story</li>
                      </ul>
                    </div>

                  </div>
                </Offcanvas.Body>
              </Offcanvas> */}

          </div>
        </div>
      </header>

      <div className='ress'>
        <header>
          <div className='bg-black text-white p-1'>
            <div className='w-60 mx-auto'>
              <Slider {...settings}>
                <div className='text-center fs-8'>
                  <b>Just in: New organic cotton pieces for effortless looks.</b><u>Shop Women</u> <u>Shop Man</u>
                </div>
                <div className='text-center fs-8'>
                  <b>These prices come once in a lifetime</b>.<u>Shop Women's Stockroom Sale</u> <u>Shop Man's Stockroom Sale</u>
                </div>
                <div className='text-center fs-8'>
                  Enjoy <b>free shipping on orders over $ 99</b> and <b>free return</b>
                </div>
              </Slider>
            </div>
          </div>
          <div className='px-2 d-flex justify-contents-between position-sticky align-items-center bg-white w-100'>
            <div className='d-flex justify-contents-between w-80 header_inner'>

              {/* <FaBars className='mt-2 me-2 cursor-pointer' /> */}

              {/* offcanvas start */}
              <button className='btn-header' onClick={() => setShow(true)}>
                {/* Launch */}
                <FaBars className='me-3 cursor-pointer' />
              </button>

              <Offcanvas show={show} onHide={() => setShow(false)} placement='start' name='start' key='2'>

                <Offcanvas.Header closeButton>
                  <HiMagnifyingGlass className='fs-3 cursor-pointer mx-2' />
                </Offcanvas.Header>


                <Offcanvas.Body className='p-0'>
                  <div>

                    <div className='width'>
                      <ul className=''>
                        <li className='text-danger'>The Stockroom Sale</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Our Story</li>
                      </ul>
                    </div>

                  </div>
                </Offcanvas.Body>
              </Offcanvas>
              {/* offcanvas end */}

              <abbr title='logo'><Link href='/' className='cursor-pointer'><Image src={logo} width={100} height={30} className='' /></Link></abbr>

            </div>
            <div className='text-end w-25'>
              <HiMagnifyingGlass className='fs-3 cursor-pointer mx-1' />

              <IoPersonCircleOutline className='fs-3 cursor-pointer mx-1' onClick={() => { setLoginModal(!loginModal) }} />
              <div className={loginModal ? 'model' : 'd-none'}>
                <Loginform close={setLoginModal} />

              </div>

              <IoHeartOutline className='fs-3 cursor-pointer mx-1' />
              <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-1 me-3' />
            </div>
          </div>
        </header>
      </div>
    </div>

  )
}

export default Header