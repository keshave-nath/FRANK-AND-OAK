'use client'
import React from 'react'
import './footer.css'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { PiArrowCounterClockwiseLight } from 'react-icons/pi'
import logo from '../../../../public/images/favicon.png'
import Image from 'next/image'
import { CiInstagram, CiMail, CiTwitter } from 'react-icons/ci'
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { FaPinterestP } from 'react-icons/fa6'
import certified_corporation from '../../../../public/images/certified_corporation.webp'
import { Accordion } from 'react-bootstrap'



const Footer = () => {
    return (
        <div>
            <footer className='w-100 mt-4 bg-black text-white'>
                <div className='pt-5 pb-2'>
                    <div className='d-flex justify-content-evenly'>
                        <div className='text-center'>
                            <MdOutlineLocalShipping className='fs-1 my-3' />
                            <div className='fs-6 font-ress my-2'>Free Shipping</div>
                            <div className='fs-7 font-ress'>On orders over $99</div>
                        </div>

                        <div className='text-center'>
                            <PiArrowCounterClockwiseLight className='fs-1 my-3' />
                            <div className='fs-6 font-ress my-2'>Free Return</div>
                            <div className='fs-7 font-ress'>Only keep what you love</div>
                        </div>

                        <div className='text-center'>
                            <Image src={logo} className='w-25 h-25 my-4 rounded-circle border border-white border-2 p-1' />
                            <div className='fs-6 font-ress my-1'>Frank Rewards</div>
                            <div className='fs-7 font-ress'>Earn points and get rewards</div>
                        </div>

                        <div className='text-center'>
                            <HiOutlineCreditCard className='fs-1 my-3' />
                            <div className='fs-6 font-ress my-2'>Buy Now, Pay Later</div>
                            <div className='fs-7 font-ress'>Select Klarna at checkout</div>
                        </div>
                    </div>

                    <div className='grid'>
                        <div className='p-2'>
                            <Image src={logo} width={100} className='my-2' />
                            <div>
                                <CiInstagram className='m-2 fs-5 cursor-pointer' />
                                <SlSocialFacebook className='m-2 fs-5 cursor-pointer' />
                                <CiTwitter className='m-2 fs-5 cursor-pointer' />
                                <FaPinterestP className='m-2 fs-5 cursor-pointer' />
                                <CiMail className='m-2 fs-5 cursor-pointer' /><br />
                                <SlSocialLinkedin className='m-2 fs-5 cursor-pointer' />
                            </div>
                            <Image src={certified_corporation} width={40} className='mx-2 my-3' />
                        </div>

                        <div className=' p-2'>
                            <div className='fs-4 mb-3'>Our Story</div>
                            <ul className='p-0 m-0  fw-500'>
                                <li className='cursor-pointer'>Who we are</li>
                                <li className='cursor-pointer'>Sustainable practices</li>
                                <li className='cursor-pointer'>Design Ideology</li>
                                <li className='cursor-pointer'>Frabic</li>
                                <li className='cursor-pointer'>Circular denim<sup className='fw-normal'>TM</sup></li>
                                <li className='cursor-pointer'>Partners and factories</li>
                            </ul>
                        </div>

                        <div className=' p-2'>
                            <div className='fs-4 mb-3'>Discover</div>
                            <ul className='p-0 m-0  fw-500'>
                                <li className='cursor-pointer'>Gift Cards</li>
                                <li className='cursor-pointer'>Frank Rewards</li>
                                <li className='cursor-pointer'>Give $15, Get $15</li>
                                <li className='cursor-pointer'>Affiliate</li>
                                <li className='cursor-pointer'>Blog</li>
                                <li className='cursor-pointer'>Work with us</li>
                                <li className='cursor-pointer'>Our Stores</li>
                            </ul>
                        </div>

                        <div className=' p-2'>
                            <div className='fs-4 mb-3'>Customer Care</div>
                            <ul className='p-0 m-0  fw-500'>
                                <li className='cursor-pointer'>Shipping Information</li>
                                <li className='cursor-pointer'>Returns & Exchanges</li>
                                <li className='cursor-pointer'>Coupon Codes</li>
                                <li className='cursor-pointer'>F.A.Q.</li>
                                <li className='cursor-pointer'>Terms & Conditions</li>
                                <li className='cursor-pointer'>Return Policy</li>
                                <li className='cursor-pointer'>Privacy Policy</li>
                                <li className='cursor-pointer'>Accessibility Statement</li>
                                <li className='cursor-pointer'>Curtomer Data Requests</li>
                            </ul>
                        </div>


                        <div className=' p-2 max-width'>
                            <div className='fs-4 mb-3'>Stay in touch</div>
                            <p className='fs-12 para-foot'>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
                            <input type='email' placeholder='Email' name='foot_email' className='input-foot' /><br/>
                            <input type='text' placeholder='First Name' name='foot_name' className='input-foot' /><br/>
                            I shop for &nbsp;
                            <input type='radio' name='shop_for' /> Women &nbsp;
                            <input type='radio' name='shop_for' /> Men&nbsp;
                            <input type='radio' name='shop_for' /> All<br/>
                            <button className='btn-foot'>Subscribe</button>
                        </div>
                    </div>


                    <div className='grid2'>
                        <div className='border border-1'></div>

                        <div className=' p-2'>
                            <div className='fs-4 mb-3'>Stay in touch</div>
                            <p className='fs-12'>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
                            <input type='email' placeholder='Email' name='foot_email' className='input-foot' />
                            <input type='text' placeholder='First Name' name='foot_name' className='input-foot' />
                            I shop for &nbsp;
                            <input type='radio' name='shop_for' /> Women &nbsp;
                            <input type='radio' name='shop_for' /> Men&nbsp;
                            <input type='radio' name='shop_for' />
                            <button className='btn-foot'>Subscribe</button>
                        </div>
                        <div className='border border-1 mt-2'></div>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Our Story</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'>Who we are</li>
                                        <li className='cursor-pointer'>Sustainable practices</li>
                                        <li className='cursor-pointer'>Design Ideology</li>
                                        <li className='cursor-pointer'>Frabic</li>
                                        <li className='cursor-pointer'>Circular denim<sup className='fw-normal'>TM</sup></li>
                                        <li className='cursor-pointer'>Partners and factories</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Discover</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'>Gift Cards</li>
                                        <li className='cursor-pointer'>Frank Rewards</li>
                                        <li className='cursor-pointer'>Give $15, Get $15</li>
                                        <li className='cursor-pointer'>Affiliate</li>
                                        <li className='cursor-pointer'>Blog</li>
                                        <li className='cursor-pointer'>Work with us</li>
                                        <li className='cursor-pointer'>Our Stores</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Customer Care</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'>Shipping Information</li>
                                        <li className='cursor-pointer'>Returns & Exchanges</li>
                                        <li className='cursor-pointer'>Coupon Codes</li>
                                        <li className='cursor-pointer'>F.A.Q.</li>
                                        <li className='cursor-pointer'>Terms & Conditions</li>
                                        <li className='cursor-pointer'>Return Policy</li>
                                        <li className='cursor-pointer'>Privacy Policy</li>
                                        <li className='cursor-pointer'>Accessibility Statement</li>
                                        <li className='cursor-pointer'>Curtomer Data Requests</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className='border border-1 mb-3'></div>
                        <div className='m-3'>
                            <div className='fs-6'>Stay Connected</div>
                            <div>
                                <CiInstagram className='fs-3 cursor-pointer' />
                                <SlSocialFacebook className='m-2 fs-3 cursor-pointer' />
                                <CiTwitter className='m-2 fs-3 cursor-pointer' />
                                <FaPinterestP className='m-2 fs-3 cursor-pointer' />
                                <CiMail className='m-2 fs-3 cursor-pointer' />
                                <SlSocialLinkedin className='m-2 fs-3 cursor-pointer' />
                            </div>
                            <Image src={certified_corporation} width={30} className='my-3 me-3'/>
                            <span className='fs-10'>This means we meet the highest standards of social and environmental performance, public transparency, and legal accountability in the industry.</span>
                            <div className='text-center my-4'>
                                <Image src={logo} width={100}/>
                                <div className='mt-5 fs-10'>&copy; Frank And Oak 2024,All Rights Reserved</div>
                            </div>

                        </div>
                    </div>

                </div>
            </footer>
        </div>
    )
}

export default Footer