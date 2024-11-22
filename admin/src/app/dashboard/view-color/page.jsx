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

    const [readColors, setReadColor] = useState([]);
    const [selectedid,setSelectedid] = useState([]);
    const [ifChecked,SetIfChecked] = useState(false);

    const fetchedData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/read-color`);
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                })
            )
            setReadColor(response.data.data);
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

    const handelStatus = async(e)=>{
       
        const newValue = (e.target.textContent==="Active")?false:true;

        // console.log(e.target.value,newValue);
        try{

            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/update-color-status/${e.target.value}`,{newValue})

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

            const index = readColors.findIndex((v)=>v._id === e.target.value);

            const newArr = [...readColors];
            
            newArr[index].status=newValue;

            setReadColor(newArr);
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

    const handeldeleteColor = async(e)=>{
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/delete-color/${e}`);
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                })
            )
            swal({
                title: "Success",
                text: response.data.message,
                icon: "success"
            })

            const indexNo = readColors.findIndex((id)=>id._id === e)
            const newarr = [...readColors];
            newarr.splice(indexNo,1)

            setReadColor(newarr)



            
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

    const ifCheckedIds = (e)=>{

        const {value,checked} = e.target;

        if(checked){
            let arr = [...selectedid];
            arr.push(value);
            setSelectedid(arr)
        }
        else{
           let arr = [...selectedid].filter((v)=>v !== value);
           setSelectedid(arr);

        }

    }

    const handelSelectedIds = (e)=>{

        if(e.target.checked){
            let allids = readColors.map((v)=>(v._id));
            setSelectedid(allids);
            SetIfChecked(true);
        }
        else{
            setSelectedid([]);
            SetIfChecked(false);
        }

    }

    const handelmultidelete = async()=>{
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/multi-delete-color`,{ids:selectedid});
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                })
            )
            swal({
                title: "Success",
                text: response.data.message,
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

    useEffect(() => {
        fetchedData();
        SetIfChecked(selectedid.length === readColors.length && readColors.length !== 0)
    }, [readColors,selectedid])

    // console.log(readColors)

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Color</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Color
                        </div>
                        <div className='container p-3'>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th className='d-flex'><button onClick={handelmultidelete} className='bg-danger border-0 me-1 p-1 rounded text-white'>Delete</button> <input  type='checkbox' checked={ifChecked} onClick={handelSelectedIds} /></th>
                                        <th>S.No</th>
                                        <th>Color Name</th>
                                        <th>Color Code</th>
                                        <th>Color</th>
                                        {/* <th>Slider Image</th> */}
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        readColors.map((v, i) => (
                                            <tr>
                                                <td><input type='checkbox' value={v._id} checked={selectedid.includes(v._id)}  onClick={ifCheckedIds} /></td>
                                                <td>{i+1}</td>
                                                <td>{v.color}</td>
                                                <td>{v.color_code}</td>
                                                <td><input type='color' value={v.color_code} /></td>
                                                {/* <td><img src='https://cdn.shopify.com/s/files/1/0553/7100/6130/t/12/assets/ourstorytopv21-1638308615192.jpg?v=1638308650' width='100%' height='60px' className='rounded'/></td> */}
                                                <td>
                                                    <span className='d-flex ls'>
                                                        <IconContext.Provider value={{ color: 'red', size: '21px' }}>
                                                            <label className='me-2' onClick={()=>handeldeleteColor(v._id)} ><MdDelete /></label>
                                                        </IconContext.Provider>
                                                        <label>|</label>
                                                        <IconContext.Provider value={{ color: 'yellow ', size: '18px' }}>
                                                            <Link href={`/dashboard/update-colors/${v._id}`}><label className='ms-2'><SlNote /></label></Link>
                                                        </IconContext.Provider>
                                                    </span>
                                                </td>
                                                <td>
                                                    <button value={v._id} onClick={handelStatus} className={`p-1 border-0 rounded ${v.status?'bg-success':'bg-secondary'} text-white`}>
                                                        {(v.status)?"Active":"Inactive"}
                                                    </button>
                                                </td>
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