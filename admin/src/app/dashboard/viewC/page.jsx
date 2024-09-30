'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { IconContext } from 'react-icons';
import axios from 'axios';
import swal from 'sweetalert';

const page = () => {

   

    const [parentDetails, setParentDetails] = useState([]);
    const [viewId, setViewId] = useState([]);
    const [ifChecked, SetIfChecked] = useState(false);
    const [givenid, setid] = useState([])

    const handelReadParent = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/read-parent-categories`)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))
            // console.log(response.data.data);
            setParentDetails(response.data.data)
            // console.log(parentDetails)
        }
        catch (error) {
            console.log(error)
        }

    }

    const handelSingleDelete = async (_id) => {
        try {
            // console.log(e)
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/delete-parent-category/${_id}`)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))
            swal({
                title: "Success !!",
                text: "Data Deleted Successfully !!",
                icon: "success"
            })
            const indexNo = parentDetails.findIndex((parentCat) => parentCat._id === _id);
            const newData = [...parentDetails]
            newData.splice(indexNo, 1);

            setParentDetails(newData);
            // handelReadParent();
            // console.log(response.data.data)
        }
        catch (error) {
            console.log(error);
            alert("back problem");
        }
    }

    const handelStatusUpdate = async (e) => {

        const newValue = (e.target.textContent === "Active") ? false : true;

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/update-parent-category-status/${e.target.value}`, { newValue })
            // console.log(response.data.data)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))
            swal({
                title: "Success !!",
                text: "Status Updated Successfully !!",
                icon: "success"
            })
            const indexNo = parentDetails.findIndex((parentCat) => parentCat._id === e.target.value);

            const newData = [...parentDetails]
            newData[indexNo].status = newValue

            setParentDetails(newData);
        }
        catch (error) {
            console.log(error)
            swal({
                title: "Something Went Wrong !!",
                text: "Internal Server Error !!",
                icon: "warning"
            })
        }
    }

    const handelcheck = (e) => {
        const { value, checked } = e.target

        if (checked) {
            let arr = [...viewId];
            arr.push(value);
            setViewId(arr);
        }
        else {
            let arr = [...viewId].filter((v) => v != value)
            setViewId(arr);
        }
    }
    // console.log(viewId)
    const handelSelectAll = (e) => {
        if (e.target.checked) {
            let allIds = parentDetails.map((v) => v._id)
            setViewId(allIds);
            SetIfChecked(true);
        }
        else {
            setViewId([]);
            SetIfChecked(false);
        }
    }

    const handelmultidelete = async () => {
        try {
            if (viewId.length == 0) return (
                swal({
                    title: "WARNING !!",
                    text: "Please Select Data ",
                    icon: "info"
                })
            )
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/multi-delete-parent-category`, { ids: viewId });
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please try after sometime !!",
                    icon: "warning"
                })
            )
            swal({
                title: "Success !!",
                text: "Data Deleted Successfully !!",
                icon: "success"
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




    

    useEffect(() => { handelReadParent(); SetIfChecked(viewId.length === parentDetails.length && parentDetails.length !== 0) }, [parentDetails, viewId])

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Parent Category</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Parent Category
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th className='d-flex'><button onClick={handelmultidelete} className='bg-danger border-0 me-1 p-1 rounded text-white'>Delete</button> <input type='checkbox' checked={ifChecked} onClick={handelSelectAll} /></th>
                                        <th>S.No</th>
                                        <th>Category Name</th>
                                        {/* <th>Image</th> */}
                                        <th>Description</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        parentDetails.map((v, i) => (
                                            <tr>
                                                <td><input type='checkbox' value={v._id} checked={viewId.includes(v._id)} onClick={handelcheck} /></td>
                                                <td>{i + 1}</td>
                                                <td>{v.name}</td>
                                                {/* <td><img src='https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/25072178/2023/9/20/c097aded-8dfb-497d-87c0-e0ef5ec5c8761695179114326StormbornMenBrownPrintedPoloCollarPocketsT-shirt1.jpg' className='rounded' width='50px' height='50px' /></td> */}
                                                <td className='wtd'>
                                                        <ReadMore vd={v} id={i}/>

                                                </td>
                                                <td>
                                                    <span className='d-flex ls'>
                                                        <IconContext.Provider value={{ color: 'red', size: '21px' }}>
                                                            <label className='ms-4 me-2' onClick={() => handelSingleDelete(v._id)}><MdDelete /></label>
                                                        </IconContext.Provider>
                                                        <label>|</label>
                                                        <IconContext.Provider value={{ color: 'yellow ', size: '18px' }}>
                                                            <Link href={`/dashboard/updateparent/${v._id}`}><label className='ms-2'><SlNote /></label></Link>
                                                        </IconContext.Provider>
                                                    </span>
                                                </td>
                                                <td><button value={v._id} onClick={handelStatusUpdate}
                                                    className={`my-3 ms-5 p-2 d-block rounded border-0 
                                               ${v.status ? 'bg-success' : 'bg-secondary'} 
                                                text-white`}>
                                                    {v.status ? 'Active' : "Inactive"}</button></td>
                                            </tr>
                                        ))
                                    }



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

function ReadMore({vd,id}){


    const [discri, setdiscri] = useState(false)

    let handledis = () => {
        setdiscri(!discri)
    }

    return(
    <>
        {discri == true ?
            <span >
                {vd.discription}&nbsp;
                <button className='text-info bg-transparent border-0' value={vd._id} key={id} onClick={handledis}>"read less"</button>
            </span>
            :
            <span >
                {vd.short_discription}.&nbsp;
                <button className='text-info bg-transparent border-0' value={vd._id} key={id} onClick={handledis}>"read more"</button>
            </span>
        }
    </>
    )
}