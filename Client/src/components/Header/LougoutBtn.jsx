import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth.js'//check this if the file is auth.js or configeration.js
import {logout} from '../../store/authSlice.js'

const LogoutBtn = () => {
    const dispatch=useDispatch()

    const handleLogout=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch(()=>{
            console.log("Unable to logout user") 
            return false
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handleLogout}>LougoutBtn</button>
  )
}

export default LogoutBtn