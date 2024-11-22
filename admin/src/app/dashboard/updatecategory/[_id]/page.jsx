'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import swal from 'sweetalert';

const page = () => {

    let params = useParams();
    // console.log(params._id)
    let nav = useRouter();
    const [fetchedData,setFetchedData] = useState([]);

    const fetchById = async()=>{
        try{
            const response = await axios.get(`http://localhost:5200/api/admin-panel/productCategory/fetch_product_category_byid/${params._id}`);

            if(response.status!==200)return(
                swal({
                    title:"Something Went Wrong !!",
                    text:"Please try After Sometime !!",
                    icon:"warning"
                })
            )
            setFetchedData(response.data.data);

        }
        catch(error){
            console.log(error)
        }
    }

    const handelUpdate = async (e)=>{
        e.preventDefault();
        let data={
            name:e.target.name.value,
            short_discription:e.target.short_discription.value,
            discription:e.target.discription.value
        }
        // console.log(data)
        try{
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/update-product-category/${params._id}`,data);
                if(response.status!==200)return(
                    swal({
                        title:"Something Went Wrong !!",
                        text:"Please Try After Sometime !!",
                        icon:"warning"
                    })
                )
                swal({
                    title:"Success",
                    text:"Data Updated Successfully",
                    icon:"success"
                })
                nav.push("/dashboard/viewPC");
        }
        catch(error){
            console.log(error);
            swal({
                title:"Something Went Wrong !!",
                text:"Please Try After Sometime !!",
                icon:"error"
            })

        }
        // console.log(data)
    }

    useEffect(()=>{
        fetchById();
    },[])
    

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Update Product Category</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Update Product Category
                        </div>
                        <form  onSubmit={handelUpdate} method='post'>
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Category Name
                                </label>
                                <input placeholder='Category Name' name='name' value={fetchedData.name} onChange={(e)=>{setFetchedData({...fetchedData,name:e.target.value})}} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                {/* <label className='my-2'>
                            Category Image
                        </label>
                        <input placeholder='Category Image' className='d-block w-100 rounded inn p-1 my-2' type='file'/> */}

                                <label className='my-2'>
                                    Category Description
                                </label>
                                <textarea placeholder='Category Description' name='discription' value={fetchedData.discription}  className='d-block w-100 rounded inn p-2 my-2'
                                onChange={(e)=>{setFetchedData({...fetchedData,discription:e.target.value})}}
                                ></textarea>

                                <label className='my-2'>
                                    Category Short Description
                                </label>
                                <textarea placeholder='Category Short Description' name='short_discription' className='d-block w-100 rounded inn p-2 my-2'
                                 value={fetchedData.short_discription} onChange={(e)=>{setFetchedData({...fetchedData,short_discription:e.target.value})}}
                                ></textarea>




                                <button className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Update Product Category</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page