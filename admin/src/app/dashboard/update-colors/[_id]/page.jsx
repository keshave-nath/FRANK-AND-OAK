'use client'
import React, { useEffect, useState } from 'react'
import Headers from '../../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import ntc from 'ntcjs';
import "react-color-palette/css";
import axios from 'axios';
import swal from 'sweetalert';
import { useParams, useRouter } from 'next/navigation';

const page = () => {

    let params= useParams();
    let nav = useRouter();

    let [Color, setColor] = useState("");
    let color_name;
    let code;
    
    
    const readColorDataById = async()=>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/read-color-byId/${params._id}`);

            if(response.status!==200)return(
                swal({
                    title:"Something Went Wrong !!",
                    text:"Please try After Sometime !!",
                    icon:"warning"
                })
            )
            setColor(response.data.data);

        }
        catch(error){
            console.log(error)
            swal({
                title:"Something Went Wrong !!",
                text:"Internal Server Error !!",
                icon:"Error"
            })
        }
    } 

    const setImage = () => {
        let imageFileInput = document.querySelector("#image_src");
        let imagePreview = document.querySelector("#image_preview");
        let colorCode = document.querySelector("#color_code");
        let color_picker = document.querySelector("#color_picker");
        imageFileInput.addEventListener("change", function () {
            const file = this.files[0];
            //   console.log(file);
            if (!file) return;

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                imagePreview.src = this.result;
            });
            reader.readAsDataURL(file);

            const colorPicker = new window.EyeDropper();
            const colorSelector = document.querySelector("#colorPicker");
            colorSelector.addEventListener("click", () => {
                colorPicker
                    .open()
                    .then((res) => {
                            code=res.sRGBHex;
                            if(code){
                                let result = ntc.name(`${code}`)
                   
                             color_name = result[1]
                             setColor({color:color_name,
                                color_code:code
                             })
                            }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        });
        
    };

    const handelColorUpdate = async(e)=>{
        e.preventDefault();
        const data ={
            color:e.target.color.value,
            color_code:e.target.color_code.value
        }
        // console.log(params)
        try{
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/update-color/${params._id}`,data);
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
            nav.push("/dashboard/view-color");
    }
    catch(error){
        console.log(error);
        swal({
            title:"Something Went Wrong !!",
            text:"Please Try After Sometime !!",
            icon:"error"
        })

    }

        // console.log(data);
    }

    useEffect(()=>{
        readColorDataById();
        
    },[])
    // console.log(Color)

    return (

        <div>
            <Headers />
            <div className=''>
                <div className='p-2 border-top border-bottom border-end'>
                    <ul className=' list-unstyled d-flex gap-2 mx-3'>
                        <Link className='text-decoration-none' href='/dashboard' ><li className='text-info'>Home</li></Link>
                        <li>/</li>
                        <li className='text-info'>Theme</li>
                        <li>/</li>
                        <li>Update Color</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Update Color
                        </div>
                        <form onSubmit={handelColorUpdate} method='post'>
                            
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Color Name
                                </label>
                                <input placeholder='Color Name' name='color' value={ Color.color} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                <label className='my-2'>
                                    Color Code
                                </label>
                                <input placeholder='Color Code' name='color_code' id='color_code' value={Color.color_code} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                <label className='my-2'>
                                    Color Picker
                                </label>
                                <div style={{
                                    width: '320px'
                                }}>

                                    {/* <ColorPicker  height={200} id='color_picker' hideInput={["rgb", "hsv"]} color={color} onChange={setColor} onClick={()=>setImage()} /> */}
                                    <input type='color' value={Color.color_code} id='color_picker'  />
                                </div>


                                <label className='my-2'>
                                    Image
                                </label>

                                <input placeholder='Image' id="image_src" onClick={() => setImage()} className='d-block w-100 rounded inn p-1 my-2' type='file' />

                                <div id="colorPicker" className='d-table p-2 rounded fw-bold mt-4 bg-light text-black'>
                                    Pick Color
                                </div>

                                <img
                                    src=""
                                    alt="Select product"
                                    id="image_preview"
                                    className='d-block mt-5'
                                    width={300}
                                    height={200}
                                />

                                {/* <label className='mx-2 my-3'>
                                    Status:
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={true} />
                                <label>
                                    Display
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={false} />
                                <label>
                                    Hide
                                </label> */}

                                <button type='submit' className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Update Colors</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )

}

export default page