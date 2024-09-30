'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';


const page = () => {

    const handelSize = async(e)=>{
        e.preventDefault();
        let data = {
            name:e.target.name.value,
            order:e.target.order.value,
            status:e.target.status.value
        }
        try{
            let response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/insert-size`,data)
            if(response.status!==200) alert("something went wrong")
                 swal({
                title:"Data Saved Successfully",
                icon:"success"
            })
                console.log(response,data)
        }
          catch(error){
            console.log(error)
            alert("somthing wrong in backend")
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
                        <li>Add Size</li>
                        
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Add Size
                        </div>
                        <form onSubmit={handelSize} method='post'>
                        <div className='container p-3'>
                            <label className='my-2'>
                                Size Name
                            </label>
                            <input placeholder='Size Name' name='name' className='d-block w-100 rounded inn p-1 my-2' type='text' />
                            <label className='my-2'>
                                Size Order
                            </label>
                            <input placeholder='Size Order' name='order' className='d-block w-100 rounded inn p-1 my-2' type='number' />

                            <label className='mx-2 my-3'>
                                Status: 
                            </label>
                            
                            <input name='status' className=' rounded inn p-1 mx-2' value={true} type='radio' />
                            <label>
                                Display
                            </label>

                            <input name='status' className=' rounded inn p-1 mx-2' value={false} type='radio' />
                            <label>
                                Hide
                            </label>
                            <button type='submit' className='my-3 d-block p-2 rounded border-0 bg-primary text-white'>Add Size</button>
                        </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page