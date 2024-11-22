
'use client'
import React, { useState } from 'react'
import Headers from '../header/Headers';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import ntc from 'ntcjs';
import "react-color-palette/css";
import axios from 'axios';
import swal from 'sweetalert';


const page = () => {

    let [Color, setColor] = useState("#ffffff");
    let color_name;

    
    

    // colorCode = 


    // let someColor = colorNameList.find((color)=> color.hex === "#ffffff");
    // console.log(someColor.name);
    
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
                            
                            // colorCode.value = res.sRGBHex;
                            // color_picker.value = res.sRGBHex;
                            setColor(res.sRGBHex); 
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                
            });
        };
    
    let result = ntc.name(`${Color}`)
   
    color_name = result[1]

    // console.log(Color,color_name)
    


    const handelInputColor = async (e) => {
        e.preventDefault();
        let data = {
            color: e.target.color.value,
            color_code: e.target.color_code.value,
            status:e.target.status.value
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/admin-panel/colorss/insert-color`, data);
            if (response.status !== 200) return (
                swal({
                    title: "Something Went Wrong !!",
                    text: "Please Try After Sometime !!",
                    icon: "warning"
                })
            )
            swal({
                title: "SUCCESS !!",
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
        // console.log(data);
    }

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
                        <li>Color</li>
                    </ul>
                </div>
                <Container>
                    <div className='border-start border-end border-bottom my-4 rounded-top'>
                        <div className='bgg fw-bold fs-3 py-2 px-3'>
                            Add Color
                        </div>
                        <form onSubmit={handelInputColor} method='post'>
                            <div className='container p-3'>
                                <label className='my-2'>
                                    Color Name
                                </label>
                                <input placeholder='Color Name' name='color' value={color_name} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                <label className='my-2'>
                                    Color Code
                                </label>
                                <input placeholder='Color Code' name='color_code'  id='color_code' value={Color} className='d-block w-100 rounded inn p-1 my-2' type='text' />

                                <label className='my-2'>
                                    Color Picker
                                </label>
                                <div style={{
                                    width: '320px'
                                }}>

                                    {/* <ColorPicker  height={200} id='color_picker' hideInput={["rgb", "hsv"]} color={color} onChange={setColor} onClick={()=>setImage()} /> */}
                                    <input type='color' id='color_picker' value={Color}   />
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

                                <label className='mx-2 my-3'>
                                    Status:
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={true} />
                                <label>
                                    Display
                                </label>

                                <input name='status' className=' rounded inn p-1 mx-2' type='radio' value={false} />
                                <label>
                                    Hide
                                </label>

                                <button className='my-3 p-2 d-block rounded border-0 bg-primary text-white'>Select Colors</button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default page