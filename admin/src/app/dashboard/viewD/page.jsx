'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { SlNote } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { IconContext } from 'react-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
require("react-bootstrap/ModalHeader");
import swal from 'sweetalert';
import axios from 'axios';

const page = () => {
    const [ProdDiscri, setProdDiscri] = useState([])
    const [selectedid, setselectedid] = useState([]);
    const [ifchecked, setifchecked] = useState(false);

    let [paath, setpaath] = useState([]);

    const readFetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/read-products`)
            if (response.status !== 200) {
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please try after sometime !!",
                    icon: "warning"
                })
            }
            // console.log(response)
            setProdDiscri(response.data.data)
            setpaath(response.data.file_path);
            // paath.push()

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

    const handelAllSelect = (e) => {

        if (e.target.checked) {
            const arr = ProdDiscri.map((v) => v._id);
            setselectedid(arr);
            setifchecked(true);
        }
        else {
            setselectedid([]);
            setifchecked(false);
        }

    }

    const handelCheck = (e) => {
        let { value, checked } = e.target

        if (checked) {
            const newarr = [...selectedid];
            newarr.push(value);
            setselectedid(newarr)
        }
        else {
            const newarr = [...selectedid].filter((v) => v != value)
            setselectedid(newarr)
        }
    }

    const handelUpdateStatus = async (e) => {

        const newValue = (e.target.textContent === "Active") ? "false" : "true";

        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/update-product-status/${e.target.value}`, { newValue });

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

            let indexNo = ProdDiscri.findIndex((v) => v._id === e.target.value);
            const newData = [...ProdDiscri]
            newData[indexNo].status = newValue;

            setProdDiscri(newData);
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

    const handelDelete = async (e) => {
        console.log(e)
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/delete-product/${e}`)
            if (response.status !== 200) return (swal({
                title: "Something Went Wrong !!",
                text: "Please Try After Sometime !!",
                icon: "warning"
            }))

            const indexNo = ProdDiscri.findIndex((v) => v._id === e)
            const Newarr = [...ProdDiscri];
            Newarr.splice(indexNo, 1),
                setProdDiscri(Newarr);

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

    const handelMultipleDelete = async () => {
        try {

            if (selectedid.length == 0) return (
                swal({
                    title: "WARNING !!",
                    text: "Please Select Data ",
                    icon: "info"
                })
            )

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/multi-delete-product`, { ids: selectedid })

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
            // console.log(response)
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

    useEffect(() => {
        readFetchData();
        setifchecked(selectedid.length === ProdDiscri.length && ProdDiscri.length !== 0)
    },
        [ selectedid])
    // console.log(ProdDiscri)


    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>View Product</li>

                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Product Items
                        </div>
                        <div className='container p-3'>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                        <th className='d-flex'><button onClick={handelMultipleDelete} className='p-1 text-white bg-danger border-0 rounded me-2' >Delete</button> <input type='checkbox' checked={ifchecked} onClick={handelAllSelect} /></th>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Discription</th>
                                        <th>Price</th>
                                        {/* <th>MRP</th> */}
                                        {/* <th>Brand</th> */}
                                        {/* <th>Parent</th> */}
                                        <th>Product</th>
                                        {/* <th>Size</th> */}
                                        {/* <th>Color</th> */}
                                        <th>Stock</th>
                                        {/* <th>Short Discription</th> */}
                                        <th className='text-center'>Tumbnail</th>
                                        <th>Action</th>
                                        <th className='text-center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ProdDiscri.map((v, i) => (
                                            <tr>
                                                <td className='text-center'><input type='checkbox' value={v._id} checked={selectedid.includes(v._id)} onClick={handelCheck} /></td>
                                                <td>{i + 1}</td>
                                                <td className='wtdd'>{v.name}</td>
                                                <td className='wtdd'>

                                                    <ViewProductDiscription vd={v} id={i} />
                                                </td>
                                                <td>
                                                    {v.price}
                                                </td>
                                                {/* <td>
                                                    {v.mrp}
                                                </td> */}
                                                {/* <td>
                                                    {v.brand}
                                                </td> */}
                                                {/* <td>
                                                    {
                                                        
                                                            
                                                                <label>{v.parent_Category.name}</label>
                                                           
                                                        
                                                    }
                                                </td> */}
                                                <td>
                                                    {<label>{v.product_Category.name}</label>}
                                                </td>
                                                {/* <td className='row row-cols-1'>
                                                
                                                        {
                                                            v.sizes.map((v)=>(
                                                                <label>{v.name}</label>
                                                            ))
                                                        }
                                                    
                                                </td>    */}
                                                {/* <td>
                                                    
                                                        {
                                                            v.colors.map((v)=>(
                                                                <label>{v.color}</label>
                                                            ))
                                                        }
                                                    
                                                </td>   */}
                                                <td>
                                                        {
                                                            v.stocks?"In Stock":"Out of Stock"
                                                        }
                                                </td>      
                                                <td className='text-center p-1 m-0'>
                                                    <IMAGEPROS v={v} paath={paath}  />
                                                </td>
                                                <td>
                                                    <span className='d-flex ls'>
                                                        <IconContext.Provider value={{ color: 'red', size: '21px' }}>
                                                            <label className='me-2' onClick={() => handelDelete(v._id)} ><MdDelete /></label>
                                                        </IconContext.Provider>
                                                        <label>|</label>
                                                        <IconContext.Provider value={{ color: 'yellow ', size: '18px' }}>
                                                            <Link href={`/dashboard/updatedetail/${v._id}`}><label className='ms-2'><SlNote /></label></Link>
                                                        </IconContext.Provider>
                                                    </span>
                                                </td>
                                                <td className='text-center'>
                                                    <button value={v._id} onClick={handelUpdateStatus} className={`p-2 border-0 rounded ${(v.status) ? 'bg-success' : 'bg-secondary'} text-white`}>{(v.status) ? "Active" : "Inactive"}</button>
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

function IMAGEPROS(v,i) {
// console.log(v,i)
    
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <img src={`${v.paath}/${v.v.thumbnail}`} className='rounded' width='80%' height='90px' onClick={() => setModalShow(true)} />

            <MyVerticallyCenteredModal

                show={modalShow}
                vd={v}
                img={v.paath}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}


function MyVerticallyCenteredModal(props) {
    // console.log(props)


    return (
        <Modal
            style={
                {
                    height: "100vh"
                }
            }
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='bg-dark' closeVariant='white' closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Images
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark '>
            <div>
                    <h2>MRP :-</h2>
                    <h4 className='text-success'>{props.vd.v.mrp}</h4>
                </div>
                <div>
                    <h2>BRAND :-</h2>
                    <h4 className='text-danger'>{props.vd.v.brand}</h4>
                </div>

                <div>
                    <h2>Parent</h2>
                    <h4 className='text-warning'>{props.vd.v.parent_Category.name}</h4>
                </div>
                <div>
                    <h2>Sizes</h2>
                    <h4 className='text-warning'>{
                         props.vd.v.sizes.map((v)=>(
                            <label className='d-block'>{v.name}</label>
                        ))    
                    }</h4>
                </div>
                <div>
                    <h2>Colors</h2>
                    <h4>{
                         props.vd.v.colors.map((v)=>(
                            <label className='d-block'
                                style={{
                                    color:`${v.color_code}`
                                }}
                            >{v.color}</label>
                        ))    
                    }</h4>
                </div>
                
                <div>
                    <h2>Thumbnail</h2>
                    <img src={`${props.img}/${props.vd.v.thumbnail}`} className='rounded' width='20%' />
                </div>
                <div>
                    <h2>Hover Thumbnail</h2>
                    <img src={`${props.img}/${props.vd.v.thumbnail_animation}`} className='rounded' width='20%' />
                </div>
                <div>
                    <h2>Images</h2>
                    <div className='row row-cols-3   text-center'>
                        {
                            props.vd.v.images.map((v) => (
                                <img src={`${props.vd.paath}/${v}`} className='rounded' width='50%' style={{
                                    marginTop: '30px'
                                }} />
                            ))
                        }
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer className='bg-dark'>
                <Button className='bg-danger border-0' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function ViewProductDiscription({ vd, id }) {
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