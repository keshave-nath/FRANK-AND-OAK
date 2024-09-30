'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { IconContext } from 'react-icons';

const page = () => {
    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Size</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Size
                        </div>
                        <div className='container p-3'>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th>Delete <input type='checkbox'/></th>
                                        <th>S.No</th>
                                        <th>Slider Name</th>
                                        <th>Heading</th>
                                        <th>Sub Heading</th>
                                        <th>Slider Image</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input  type='checkbox'/></td>
                                        <td>1</td>
                                        <td>S</td>
                                        <td>New summer must-haves just dropped.</td>
                                        <td>free shipping on orders over $79</td>
                                        <td><img src='https://cdn.shopify.com/s/files/1/0553/7100/6130/t/12/assets/ourstorytopv21-1638308615192.jpg?v=1638308650' width='100%' height='60px' className='rounded'/></td>
                                        <td>
                                            <span className='d-flex ls'>
                                                <IconContext.Provider value={{color:'red',size:'21px'}}>
                                                <label className='me-2'><MdDelete /></label>
                                                </IconContext.Provider>
                                                <label>|</label>
                                                <IconContext.Provider value={{color:'yellow ',size:'18px'}}>
                                                <Link href='/dashboard/updateslider'><label className='ms-2'><SlNote /></label></Link>
                                                </IconContext.Provider>
                                            </span>
                                        </td>
                                        <td>Display</td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page