'use client'
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { ListGroup } from 'react-bootstrap';
import "./globals.css";
import { TfiDashboard } from "react-icons/tfi";
import { CiDroplet } from "react-icons/ci";
import { LiaHandPointerSolid } from "react-icons/lia";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsBasket } from "react-icons/bs";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { LuPenLine } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";

import Footer from "../dashboard/footer/Footer";

import { MdOutlineSettings } from "react-icons/md";
import Link from 'next/link';
import { IconContext } from 'react-icons';

export default function layout({ children }) {

    return (
        <>
            <div className='d-flex'>
                <div className='d_left'>
                    <div className='text-center p-3 border-bottom'>
                        <h2>Frank and Oak</h2>
                    </div>
                    <div className='scroll'>
                        <div className=''>
                            <ListGroup  >
                                <IconContext.Provider value={{ size: '24px' }}>
                                    <Link href="/dashboard" > <ListGroup.Item className='border-0 bg' action variant='light' >

                                        <TfiDashboard />

                                        &nbsp; Dashboard</ListGroup.Item></Link>
                                </IconContext.Provider>
                                {/* <IconContext.Provider value={{ size: '24px' }}>
                                    <Link href="/dashboard/theme" > <ListGroup.Item className='border-0 bg' action variant='light' >
                                        <CiDroplet />
                                        &nbsp;
                                        Color

                                    </ListGroup.Item></Link>
                                </IconContext.Provider> */}

                                <IconContext.Provider value={{ size: '24px' }}>
                                    <Link href='/dashboard/profile'><ListGroup.Item className='border-0 bg' action variant='light' >
                                        <MdOutlineSettings />
                                        &nbsp;
                                        Profile
                                    </ListGroup.Item></Link>
                                </IconContext.Provider>
                            </ListGroup>
                        </div>
                        <div className=''>
                            <h5 className='text-center fw-bold text-secondary'>Ecommerce Components</h5>
                            <Accordion >
                                <Accordion.Item className='border-0' eventKey="0">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header  >
                                            <LiaHandPointerSolid />
                                            &nbsp;
                                            Size

                                        </Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body >
                                        <ul >
                                            <Link href="/dashboard/size"><li>Size Details</li></Link>
                                            <Link href='/dashboard/viewS'><li>View Size</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="1">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header  >
                                        <CiDroplet />
                                            &nbsp;
                                            color

                                        </Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body >
                                        <ul >
                                            <Link href="/dashboard/theme"><li>Add Color</li></Link>
                                            <Link href='/dashboard/view-color'><li>View Color</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="2">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header>
                                            <HiMiniBars3CenterLeft />
                                            &nbsp;
                                            Parent Category

                                        </Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body>
                                        <ul>
                                            <Link href='/dashboard/addC'><li>Add Category</li></Link>
                                            <Link href='/dashboard/viewC'><li>view Category</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="3">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header>
                                            <HiOutlineShoppingCart />
                                            &nbsp;
                                            Product Category</Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body>
                                        <ul>
                                            <Link href='/dashboard/addPC'><li>Add Category</li></Link>
                                            <Link href='/dashboard/viewPC'><li>view Category</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="4">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header>
                                            <BsBasket />
                                            &nbsp;
                                            Product Details</Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body>
                                        <ul>
                                            <Link href='/dashboard/addD'><li>Add Details</li></Link>
                                            <Link href='/dashboard/viewD'><li>view Details</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="5">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header>
                                            <PiClockCounterClockwiseBold />
                                            &nbsp;
                                            Story</Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body>
                                        <ul>
                                            <Link href='/dashboard/addSt'><li>Story Details</li></Link>
                                            <Link href='/dashboard/viewSt'><li>Story View</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="6">
                                    <ul className='ls'>
                                        <IconContext.Provider value={{ size: '24px' }}>
                                            <Link href='/dashboard/order'>
                                                <li >
                                                    <LuPenLine />&nbsp;
                                                    Orders</li>
                                            </Link>
                                        </IconContext.Provider>
                                    </ul>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="7">
                                    <IconContext.Provider value={{ size: '24px' }}>
                                        <Accordion.Header>
                                            <PiClockCounterClockwiseBold />
                                            &nbsp;
                                            Slider</Accordion.Header>
                                    </IconContext.Provider>
                                    <Accordion.Body>
                                        <ul>
                                            <Link href='/dashboard/addslider'><li>Slider Details</li></Link>
                                            <Link href='/dashboard/viewslider'><li>view Slider</li></Link>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='border-0' eventKey="8">
                                    <ul className='ls'>
                                        <IconContext.Provider value={{ size: '24px' }}>
                                            <li >
                                                <IoNewspaperOutline />&nbsp;
                                                Terms And Condition</li></IconContext.Provider>
                                    </ul>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
                <div className='d_right'>
                    <div className='ft'>
                        {children}
                    </div>
                    
                </div>
            </div>

        </>
    )
}
