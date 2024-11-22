'use client'
import React from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const page = () => {

    const handleInsert =async(e)=>{
        e.preventDefault();

         let data= {
            name:e.target.name.value,
            short_discription:e.target.short_discription.value,
            discription:e.target.discription.value,
            status:e.target.status.value
         }
         try{   
                let response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/insert-parent-category`,data)
                // if(response.status===11000)return alert(response.message)
                if(response.status!==200)return alert("data not saved,something went wrong")
                    
                    swal({
                        icon:"success",
                        title:"success",
                        text:"Data Saved Successfully"
                    })

                    e.target.name.value=""
                    e.target.short_discription.value=""
                    e.target.discription.value=""
                    e.target.status.value=""

                // console.log(response,data)
         }
         catch(error){
            console.log(error)
            
            alert("somthing wrong in backend")
         }
        //  console.log(data)
    }

    return (
        <div>
            <Headers/>
            
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Add Parent Category</li>
                    </ul>
                </div>
                <Container>
                <div className='border-start border-end border-bottom my-4 rounded-top'>
                    <div className='bgg fw-bold fs-3 py-2 px-3'>
                        Add Parent Category    
                    </div>    
                    <form onSubmit={handleInsert} method='post'>
                    <div className='container p-3'>
                        <label className='my-2'>
                            Category Name
                        </label>
                        <input placeholder='Category Name' name='name' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                        <label className='my-2'>
                            Short Description
                        </label>
                        <textarea name='short_discription' placeholder='Short_Description' className='d-block w-100 rounded inn p-2 my-2'></textarea>

                        <label className='my-2'>
                            Category Description
                        </label>
                        <textarea name='discription' placeholder='Description' className='d-block w-100 rounded inn p-2 my-2'></textarea>

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

                        <button type='submit' className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Add Parent Category</button>
                    </div>
                    </form>
                </div>
                </Container>
            </div>
            
        </div>
    )
}

export default page