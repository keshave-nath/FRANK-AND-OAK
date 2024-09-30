'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const page = () => {

    const [parent, setParent] = useState([]);
    const [products, setProducts] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [checkedSizes, setCheckedSizes] = useState([]);
      const [checkedColors, setCheckColors] = useState([]);


    const handelParentcategory = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/parentCategory/active-parent-categories`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setParent(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelProductCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/productCategory/active_product_categories`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setProducts(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelSizes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/size/active-Size`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setSize(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    const handelColors = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/active-colors`)
            if (response.status !== 200) {
                swal({
                    title: "Something went wrong !!",
                    text: "Please try after sometime !!",
                    icon: "error"
                })
            }
            setColor(response.data.data)
        }
        catch (error) {
            console.log(error);
            swal({
                title: "Something went wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }

    }

    
  const handleCheckSize = (e) => {
    if(e.target.checked){
      setCheckedSizes((pre)=> (
        [...pre, e.target.value]
      ));
    }
    else
    {
      setCheckedSizes((pre)=> (
        pre.filter(item => item !== e.target.value)
      ));
    }
  }


  const handleCheckColor = (e) => {
    if(e.target.checked){
      setCheckColors((pre)=> (
        [...pre, e.target.value]
      ));
    }
    else
    {
      setCheckColors((pre)=> (
        pre.filter(item => item !== e.target.value)
      ));
    }

  }

    const handelAddProduct = async(e)=>{
        e.preventDefault();
        const data= new FormData(e.target);
        data.append('colors',JSON.stringify(checkedColors));
        data.append('sizes',JSON.stringify(checkedSizes));

        try{
             const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/product-details/insert-products`,data);
             if(response.status!==200)return swal({title:"something went wrong !!",
                text:"data not saved",
                icon:"warning"
             })
            //  e.target=""
                swal({
                    icon:"success",
                    title:"success",
                    text:"Data Saved Successfully"
                })
            //  console.log(response.data.data,response.data.message)
        }
        catch(error){
            console.log(error);
            swal({
                title: "Something Went Wrong !!",
                text: "Internal Server Error !!",
                icon: "error"
            })
        }
        console.log(data)

    }

    useEffect(() => {
        handelParentcategory();
        handelProductCategories();
        handelSizes();
        handelColors();
    }, [])
    // console.log(parent)rs


    return (
        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li>Add Product</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Product Details
                        </div>
                        <form onSubmit={handelAddProduct} method='post'>
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Product Name
                                </label>
                                <input placeholder='Product Name' name='name' className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                <label className='my-2'>
                                    Product Discription
                                </label>
                                <textarea placeholder='Discription' name='discription' className='d-block w-100 rounded inn p-2 my-2'></textarea>

                                <label className='my-2'>
                                    Short Description
                                </label>
                                <textarea placeholder='Short Description' name='short_discription' className='d-block w-100 rounded inn p-2 my-2'></textarea>

                                <label className='my-2'>
                                    Product Image
                                </label>
                                <input placeholder='Category Image' name='thumbnail' className='d-block w-100 rounded inn p-1 my-2' type='file' />

                                <label className='my-2'>
                                    Image Animation
                                </label>
                                <input placeholder='Category Image' name='thumbnail_animation' className='d-block w-100 rounded inn p-1 my-2' type='file' />

                                <label className='my-2'>
                                    Product Gallary
                                </label>
                                <input placeholder='Category Image' name='images' className='d-block w-100 rounded inn p-1 my-2' type='file' multiple/>

                                <div className='w-100 d-flex gap-2'>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            Price
                                        </label>
                                        <input placeholder='Price' name='price' className='d-block w-100 rounded inn p-1 my-2' type='text' />
                                    </div>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            MRP
                                        </label>
                                        <input placeholder='MRP' name='mrp' className='d-block w-100 rounded inn p-1 my-2' type='text' />
                                    </div>
                                </div>

                                <label className='my-2'>
                                    Select Parent Category
                                </label>
                                <select name='parent_Category' className='w-100 p-2 rounded '>
                                {/* <option>--Select Parent Category</option> */}
                                    {
                                        parent.map((v,i)=>(
                                            <option value={v._id}>{v.name}</option>
                                        ))
                                    }
                                   
                                </select>

                                <label className='my-2'>
                                    Select Product Category
                                </label>
                                <select name='product_Category' className='w-100 p-2 rounded '>
                                    {
                                        products.map((v,i)=>(
                                            <option value={v._id}>{v.name}</option>
                                        ))
                                    }
                                    
                                </select>

                                <div className='w-100 d-flex gap-2'>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            Manage Stocks
                                        </label>
                                        <select name='stocks' className='w-100 p-2 my-2 rounded '>
                                            <option disabled>--Select Stock--</option>
                                            <option value={true}>In Stock</option>
                                            <option value={false}>Out of Stock</option>
                                        </select>
                                    </div>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            Brand Name
                                        </label>
                                        <input placeholder='Brand' name='brand' className='d-block w-100 rounded inn p-2 my-2' type='text' />
                                    </div>
                                </div>

                                <div className='w-100 d-flex gap-2'>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            Size
                                        </label>
                                        <div className='row row-cols-3'>
                                            {
                                                size.map((v,i)=>(
                                                    <div className='d-flex my-1'>
                                                        <input type='checkbox'  value={v._id} onClick={handleCheckSize} />
                                                        <div className='ms-1'>{v.name}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* <select name='size' className='w-100 p-2 my-2 rounded '>
                                            <option>--Select Size--</option>
                                            <option>xl</option>
                                            <option>xxl</option>
                                        </select> */}
                                    </div>
                                    <div className='w-50'>
                                        <label className='my-2'>
                                            Color
                                        </label>
                                        <div className='row row-cols-3'>
                                            {
                                                color.map((v,i)=>(
                                                    <div className='d-flex my-1'>
                                                        <input type='checkbox'  value={v._id} onClick={handleCheckColor} />
                                                        <div className='ms-1'>{v.color}</div>
                                                        <div style={{
                                                            backgroundColor:`${v.color_code}`
                                                        }} className='ms-1 py-1 px-3 rounded border border-2 border-black'></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* <select name='color' className='w-100 p-2 my-2 rounded '>
                                            <option>--Select Color--</option>
                                            <option>Red</option>
                                            <option>Orange</option>
                                        </select> */}
                                    </div>
                                </div>

                                <label className='mx-2 my-3'>
                                    Status:
                                </label>

                                <input className=' rounded inn p-1 mx-2' name='status' type='radio' value={true} />
                                <label>
                                    Display
                                </label>

                                <input className=' rounded inn p-1 mx-2' name='status' type='radio' value={false} />
                                <label>
                                    Hide
                                </label>

                                <button className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Add Category</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}



export default page