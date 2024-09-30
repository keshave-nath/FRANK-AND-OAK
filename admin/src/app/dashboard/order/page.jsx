'use client'
import React, { useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { IconContext } from 'react-icons';


const page = () => {

    const [discri,setdiscri] = useState(false)

    let handledis=()=>{
        setdiscri(!discri)
    }

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Order</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Order's List
                        </div>
                        <div className='container p-3'>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th>Delete <input type='checkbox'/></th>
                                        <th>S.No</th>
                                        <th>Order Name</th>
                                        <th>Product id</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input  type='checkbox'/></td>
                                        <td>1</td>
                                        <td>S</td>
                                        <td> 1 </td>
                                        <td> <img src='https://cdn.shopify.com/s/files/1/0553/7100/6130/t/12/assets/ourstorytopv21-1638308615192.jpg?v=1638308650' width='100px' height='50px' className='rounded'/> </td>
                                        <td className='wtdd'>
                                        {discri==true?
                                            <span >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet suscipit nemo deleniti qui cupiditate eveniet officiis hic placeat, sequi, maxime non ut illo voluptatem et quaerat quasi. Delectus, veniam velit?&nbsp;
                                            <Link className='text-info' href='' onClick={handledis}>"read less"</Link>
                                             </span>
                                            :
                                            <span >
                                           Lorem, ipsum dolor sit amet consectetur adipisicing elit.&nbsp;
                                           <Link className='text-info' href=""  onClick={handledis}>"read more"</Link>
                                            </span>
                                            }

                                        </td>
                                        <td>
                                            1
                                        </td>
                                        <td>$1499</td>
                                        <td>Processing...</td>
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