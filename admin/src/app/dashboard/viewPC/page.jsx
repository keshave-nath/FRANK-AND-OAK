'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { IconContext } from 'react-icons';
import { LocaleRouteNormalizer } from 'next/dist/server/future/normalizers/locale-route-normalizer';
import axios from 'axios';
import { LuEye } from 'react-icons/lu';
import swal from 'sweetalert';

const page = () => {

    
    const [ProductCat, SetProductCat] = useState([]);
    const [selectedid,setselectedid] = useState([]);
    const [ifchecked,setifchecked] = useState(false);
    

    const fetchProductCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/read_product_categories`)
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                })
            )
            SetProductCat(response.data.data);

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

    const handelAllSelect =(e)=>{

        if(e.target.checked){
            const arr = ProductCat.map((v)=>v._id);
        setselectedid(arr);
        setifchecked(true);
        }
        else{
            setselectedid([]);
            setifchecked(false);
        }

    }

    const handelCheck=(e)=>{
        let {value,checked} = e.target
       
        if(checked){
            const newarr = [...selectedid];
            newarr.push(value);
            setselectedid(newarr)
        }
        else{
            const newarr = [...selectedid].filter((v)=>v!=value)
            setselectedid(newarr)
        }
    }

    const handelUpdateStatus =async(e)=>{

        const newValue = (e.target.textContent==="Active")?"false":"true";

        try{
            const response = await axios.put(`http://localhost:5200/api/admin-panel/productCategory/update_status_product_category/${e.target.value}`,{newValue});

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
            let indexNo = ProductCat.findIndex((v)=>v._id === e.target.value);
            const newData = [...ProductCat]
            newData[indexNo].status = newValue;

            SetProductCat(newData);
        }
        catch (error) {
            console.log(error)
            swal({
                title: "Something Went Wrong !!",
                text: "Internal Server Error !!",
                icon: "warning"
            })
        }
        
        // console.log(newValue,e.target.value)

    }

    const handelDelete = async(e)=>{
        console.log(e)
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/delete_product_category/${e}`)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))

            const indexNo = ProductCat.findIndex((v)=>v._id === e)
            const Newarr = [...ProductCat];
            Newarr.splice(indexNo,1),
            SetProductCat(Newarr);

            swal({
                title: "Success !!",
                text: response.data.message,
                icon: "success"
            })
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

    const handelMultipleDelete = async()=>{
        try{

            if (selectedid.length == 0) return (
                swal({
                    title: "WARNING !!",
                    text: "Please Select Data ",
                    icon: "info"
                })
            )

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/multi_delete_product_category`,{ ids : selectedid })

            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))

           

            swal({
                title: "Success !!",
                text: response.data.message,
                icon: "success"
            })
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

    useEffect(() => { fetchProductCategories(); setifchecked(selectedid.length === ProductCat.length && ProductCat.length !== 0) }, [ProductCat,selectedid])

    // console.log(ProductCat)
    // console.log(selectedid)

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Product Size</li>

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
                                        <th className='d-flex'><button onClick={handelMultipleDelete} className='p-1 text-white bg-danger border-0 rounded me-2' >Delete</button> <input type='checkbox' checked={ifchecked} onClick={handelAllSelect} /></th>
                                        <th>S.No</th>
                                        <th>Category Name</th>
                                        {/* <th>Image</th> */}
                                        <th>Discription</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ProductCat.map((v, i) => (
                                            <tr>
                                                <td className='text-center'><input type='checkbox' value={v._id} checked={selectedid.includes(v._id)} onClick={handelCheck} /></td>
                                                <td>{i+1}</td>
                                                <td>{v.name}</td>
                                                {/* <td><img src='https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/25072178/2023/9/20/c097aded-8dfb-497d-87c0-e0ef5ec5c8761695179114326StormbornMenBrownPrintedPoloCollarPocketsT-shirt1.jpg' className='rounded' width='50px' height='50px' /></td> */}
                                                <td className='wtd'>
                                                    <ViewProductDetails vd={v} id={i} />
                                                </td>
                                                <td>
                                                    <span className='d-flex ls'>
                                                        <IconContext.Provider value={{ color: 'red', size: '21px' }}>
                                                            <label className='me-2' onClick={()=>handelDelete(v._id)} ><MdDelete /></label>
                                                        </IconContext.Provider>
                                                        <label>|</label>
                                                        <IconContext.Provider value={{ color: 'yellow ', size: '18px' }}>
                                                            <Link href={`/dashboard/updatecategory/${v._id}`}><label className='ms-2'><SlNote /></label></Link>
                                                        </IconContext.Provider>
                                                    </span>
                                                </td>
                                                <td><button value={v._id} onClick={handelUpdateStatus} className={`p-2 border-0 rounded ${(v.status)?'bg-success':'bg-secondary'} text-white`}>{(v.status)?"Active":"Inactive"}</button></td>
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

function ViewProductDetails({ vd, id }) {
    const [discri, setdiscri] = useState(false);
    let handledis = () => {
        setdiscri(!discri)
    }

    return (
        <>
            {discri == true ?
                <span >
                    {vd.discription}&nbsp;
                    <Link className='text-info' href='' onClick={handledis}>"read less"</Link>
                </span>
                :
                <span >
                    {vd.short_discription}&nbsp;
                    <Link className='text-info' href="" onClick={handledis}>"read more"</Link>
                </span>
            }
        </>
    )
}

export default page