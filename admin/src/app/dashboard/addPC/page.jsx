'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';

const page = () => {

    const handelProductInsert = async (e) => {
        e.preventDefault();
        const data={
            name:e.target.name.value,
            discription:e.target.discription.value,
            short_discription:e.target.short_discription.value,
            status:e.target.status.value
        }
        // console.log(data);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/insert_product_categories`,data);
            if(response.status!==200)return(
                swal({
                    title:"Something Went Wrong !!",
                    text:"Please Try After Sometime !!",
                    icon:"warning"
                })
            )
            swal({
                title:"Success !!",
                text:response.data.message,
                icon:"success"
            })
            
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something Went Wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }
    }

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Add Product Category</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Add Product Category
                        </div>
                        <form onSubmit={handelProductInsert} method='post'>
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Category Name
                                </label>
                                <input placeholder='Category Name' name='name' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                {/* <label className='my-2'>
                                    Category Image
                                </label>
                                <input placeholder='Category Image' className='d-block w-100 rounded inn p-1 my-2' type='file' /> */}

                                <label className='my-2'>
                                    Category Description
                                </label>
                                <textarea name='discription' placeholder='Category Description' className='d-block w-100 rounded inn p-2 my-2'maxLength={500} ></textarea>

                                <label className='my-2'>
                                    Category Short Description
                                </label>
                                <textarea name='short_discription' placeholder='Category Short Description' className='d-block w-100 rounded inn p-2 my-2' maxLength={200}></textarea>

                                <label className='mx-2 my-3'>
                                    Status:
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={true} />
                                <label>
                                    Display
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={false} />
                                <label>
                                    Hide
                                </label>

                                <button className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Add Product Category</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page