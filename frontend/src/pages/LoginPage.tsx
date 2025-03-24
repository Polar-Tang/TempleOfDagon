import Footer from '@/components/Footer'
import AuthCard from '@/components/AuthCard'
import Navbar from '@/components/Navbar'
import "./home.css"
import "../output.css"
// import { useEffect } from 'react'
// import { AlertErrorComponent } from '@/components/AlertErrorComponent'

const LoginPage = () => {
  
  return (
    <>
        <div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black'>
        <Navbar/>
        {/* <AlertErrorComponent/> */}
        <AuthCard/>
        </div>
        <Footer/>
    </>
  )
}

export default LoginPage