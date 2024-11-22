'use client'
// import React from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

const page = () => {

    const params=useParams();
    const [dataa,setdataa] = useState([]);
    let nav = useRouter()

    // console.log(params._id)
    const readDataById = async()=>{
        try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/parent-category-byId/${params._id}`)
                if(response.status!==200)return(
                    swal({
                        title:"Something Went Wrong !!",
                        text:"Please try after sometime !!",
                        icon:"warning"
                    })
                )
                setdataa(response.data.data)
                // console.log(response.data.data)
        }
        catch(error){
            console.log(error);
            swal({
                title:"Something Went Wrong !!",
                text:"Internal Server Error !!",
                icon:"error"
            })
        }
    }
    // console.log(dataa)

    const handelUpdate= async (e)=>{
        e.preventDefault();
        let data={
            name:e.target.name.value,
            short_discription:e.target.short_discription.value,
            discription:e.target.discription.value
        }

        try{
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/update-parent-category/${params._id}`,data);
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
                nav.push("/dashboard/viewC");
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

    useEffect(()=>{readDataById()},[])


  return (
    <div>
            <Headers/>
            
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Update Parent Category</li>
                    </ul>
                </div>
                <Container>
                <div className='border-start border-end border-bottom my-4 rounded-top'>
                    <div className='bgg fw-bold fs-3 py-2 px-3'>
                        Update Parent Category    
                    </div>    
                    <form  onSubmit={handelUpdate} method='post'>
                    <div className='container p-3'>
                        <label className='my-2'>
                            Category Name
                        </label>
                        <input placeholder='Category Name' name='name' value={dataa.name} onChange={(e)=>setdataa({...dataa,name:e.target.value})} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                        <label className='my-2'>
                            Short Description
                        </label>
                        <textarea name='short_discription' placeholder='Short_Description' value={dataa.short_discription} className='d-block w-100 rounded inn p-2 my-2' onChange={(e)=>setdataa({...dataa,short_discription:e.target.value})}></textarea>

                        <label className='my-2'>
                            Category Description
                        </label>
                        <textarea name='discription' placeholder='Description' value={dataa.discription} onChange={(e)=>setdataa({...dataa,discription:e.target.value})} className='d-block w-100 rounded inn p-2 my-2'></textarea>

                        {/* <label className='mx-2 my-3'>
                                Status: 
                            </label>
                            
                            <input name='status' className=' rounded inn p-1 mx-2' value={true} type='radio' />
                            <label>
                                Display
                            </label>

                            <input name='status' className=' rounded inn p-1 mx-2' value={false} type='radio' />
                            <label>
                                Hide
                            </label> */}

                        <button type='submit' className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Update Parent Category</button>
                    </div>
                    </form>
                </div>
                </Container>
            </div>
            
        </div>
  )
}

export default page

    