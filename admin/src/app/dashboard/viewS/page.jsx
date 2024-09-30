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
import { useRouter } from 'next/navigation';

const page = () => {
    // const router = useRouter();
    const [Readsize,setReadSize] = useState([])
    const [SelectedId,SetSelectedId] = useState([])
    const [ifChecked,SetIfChecked] = useState(false)

    const handelReadData = async()=>{
        try{
            const response =await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/read-size`)
            // console.log(response.data.data)
            if(response.status!==200) alert("something wrong happens")

                setReadSize(response.data.data)
                // console.log(response.data.data)
                // console.log(Readsize)
               

        }
        catch(error){
            console.log(error);
            alert("Something wrong in backend")
        }
        
    }

    const handelDelete =async(_id)=>{
        try{    

                let response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/delete-size/${_id}`)

                if(response.status!==200)return alert("Please try after sometime")

                swal({
                    text:"Data Deleted",
                    icon:'success'
                })
                handelReadData();
                // console.log(response)

        }
        catch(error){
            console.log(error);
            alert("something wrong in back");
        }
    }
    
    const handelStatus = async(e)=>{
        // console.log(Readsize)
        // console.log(Readsize[0]._id)
        // console.log(e.target.value)
        const newvalue = (e.target.textContent === "Active")? false : true;
        // console.log(newvalue)
        
        try{
                const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/update-status/${e.target.value}`,{newvalue});
                if(response.status!==200)return swal({
                    title:"Something went Wrong",
                    text:"please try after sometimes",
                    icon:"warning"
                })
                swal({
                    title: "Success !!",
                    text: "Status Updated Successfully !!",
                    icon: "success"
                })
                    // alert("Status Updated")
                const indexNo = Readsize.findIndex((readsize)=> readsize._id === e.target.value);

                const newData = [...Readsize]
                newData[indexNo].status = newvalue
                
                setReadSize(newData);
                // console.log(response.data.data)
                // handelReadData();

        }
        catch(error){
            console.log(error);
            alert("wrong in back")
        }
    }
    const handelCheckInput = (e)=>{

        const {checked,value}=e.target

        if(checked){
            let arr =[...SelectedId];
            arr.push(value);
            SetSelectedId(arr);
        }
        else{
            const arr =[...SelectedId].filter((id)=>id!=value);
            SetSelectedId(arr)
        }

        // console.log(SelectedId)
        
    };

    const handelSelectAll=(e)=>{

        if(e.target.checked){
            const allIds = Readsize.map((v)=>v._id);
            SetSelectedId(allIds)
            SetIfChecked(true)
        }
        else{
            SetSelectedId([])
            SetIfChecked(false)
        }
        // console.log(SelectedId)
    }

    const handelDeleteAll= async()=>{
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/delete-many`,{ids:SelectedId});
            if(response.status!==200) return(
                swal({
                    text:"Please try after sometime",
                    icon:"warning"
                })
               
            )
            swal({
              title:"Success",
              text:"Data Deleted Successfully",
              icon:"success"      
            })
            handelReadData();
        }
        catch(error){
            console.log(error)
        }
       
    }
    // const handelDisplay = ()=>{
    //     setReadSize()
    //             console.log(Readsize)
    // }

    useEffect(()=>{handelReadData();
        SetIfChecked(SelectedId.length === Readsize.length && Readsize.length !== 0);
    },[Readsize,SelectedId])

    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Size</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            View Size
                        </div>
                        <div className='container p-3'>
                            <Table className='text-center ' striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th style={{
                                            display:'flex'
                                        }}><button onClick={handelDeleteAll} className='my-3 ms-5 p-2 d-block rounded border-0 text-white bg-danger'>Delete</button> <input type='checkbox' className='ms-5' checked={ifChecked} onClick={handelSelectAll}/></th>
                                        <th>S.No</th>
                                        <th>Size Name</th>
                                        <th>Size Order</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {
                                        Readsize.map((v,i)=>(  
                                                                                      
                                            <tr key={i} >
                                            <td><input  type='checkbox' value={v._id} checked={SelectedId.includes(v._id)} onClick={handelCheckInput} /></td>
                                            <td>{i+1}</td>
                                            <td>{v.name}</td>
                                            <td>{v.order}</td>
                                            <td style={{
                                                paddingTop : '20px',
                                                width : '170px',
                                                boxSizing:'border-box'
                                            }}>
                                                <span className='d-flex ls'>
                                                    <IconContext.Provider value={{color:'red',size:'21px'}}>
                                                    <label className='me-2 ms-5' onClick={()=>handelDelete(v._id)} ><MdDelete /></label>
                                                    </IconContext.Provider>
                                                    <label>|</label>
                                                    <IconContext.Provider value={{color:'yellow ',size:'18px'}}>
                                                    <Link  href={`/dashboard/updatesize/${v._id}`}><label className='ms-2' ><SlNote /></label></Link>
                                                    </IconContext.Provider>
                                                </span>
                                            </td>
                                            <td style={{
                                                padding : '0px',
                                                width : '170px',
                                                boxSizing:'border-box'
                                            }}><button 
                                             value={v._id}
                                              onClick={handelStatus} 
                                               className={`my-3 ms-5 p-2 d-block rounded border-0 
                                               ${v.status? 'bg-success' :'bg-secondary'} 
                                                text-white`}>
                                                     { v.status? 'Active' : "Inactive"}
                                                </button></td>
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