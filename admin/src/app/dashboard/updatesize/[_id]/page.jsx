'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import swal from 'sweetalert';


const page = () => {

    const params = useParams()
    const router = useRouter();

    const [datass,setDatass]=useState([])
    // console.log(params._id)

    const readDataById =async()=>{
        let response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/read-size-byid/${params._id}`)
        if(response.status!==200)alert("after sometime")
            setDatass(response.data.data)

    }
    useEffect(()=>{
        readDataById()
    },[])
    // console.log(datass)
    const handelUpdate =async (e)=>{
        e.preventDefault();
        let newData = {
            name:e.target.name.value,
            order:e.target.order.value
        }

        try{
                let response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/update-size/${params._id}`,newData);
                if(response.status!==200) alert("try after sometime")
                    swal({
                        text:"successfully updated",
                        icon:"success"
                    })
                    router.push("/dashboard/viewS")

        }
        catch(error){
            console.log(error)
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
                        <li>Update Size</li>
                        
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Update Size
                        </div>
                       <form onSubmit={handelUpdate} method='post'>
                       <div className='container p-3'>
                            <label className='my-2'>
                                Size Name
                            </label>
                            <input placeholder='Size Name' name='name' value={datass.name} onChange={(e)=>{setDatass({...datass,name:e.target.value})}} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                            <label className='my-2'>
                                Size Order
                            </label>
                            <input placeholder='Size Order' name='order' value={datass.order} onChange={(e)=>{setDatass({...datass,order:e.target.value})}} className='d-block w-100 rounded inn p-1 my-2' type='number' />

                            {/* <label className='mx-2 my-3'>
                                Status: 
                            </label>
                            
                            <input className=' rounded inn p-1 mx-2' name='status' type='radio' checked/>
                            <label>
                                Display
                            </label>

                            <input className=' rounded inn p-1 mx-2' name='status' type='radio' />
                            <label>
                                Hide
                            </label> */}
                            <button type='submit' className='my-3 d-block p-2 rounded border-0 bg-primary text-white'>Update Size</button>
                        </div>
                       </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page