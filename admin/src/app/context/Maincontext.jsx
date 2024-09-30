import React, { createContext, useState } from 'react'

export const ContextAPI=createContext()

const Maincontext = ({children}) => {
    const [adminData,setAdminData]=useState({})
    const  [user,setUser]=useState({})
    const [viewuser,setView]=useState(false)
    const [cartdata,setcartdata]=useState({});
    const [wishData,setWishData]=useState({});
    const [wishh,setwish]=useState(false);

  return (
    <div>
        <ContextAPI.Provider value={{adminData,setAdminData,user,setUser,viewuser,setView,cartdata,setcartdata,wishData,setWishData,wishh,setwish}}>
            {children}
        </ContextAPI.Provider>
    </div>
  )
}

export default Maincontext