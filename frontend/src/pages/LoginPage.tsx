import Footer from '@/components/Footer'
import AuthCard from '@/components/AuthCard'
import Navbar from '@/components/Navbar'
import "./home.css"
import "../output.css"
// import { useEffect } from 'react'
// import { AlertErrorComponent } from '@/components/AlertErrorComponent'

const LoginPage = () => {
//   const auth_card_props = {
//     title: "Login",
// 			linkDirection: [{
// 				redirect: "/register",
// 				text: "No tengo cuenta"

// 			},
// 			{
// 				redirect: "/forgot-password",
// 				text: "Olvide mi contraseña"
// 			}],
// 			label_text: [{
// 				text: "Porfavor ingresar contraseña",
// 				htmlFor: "hole",
// 				className: "block rounded text-sm font-medium text-gray-300"
// 			  }],
// 			submit_text: "Login",
// 			input_classes: "block text-sm font-medium text-gray-300",
// 			field_container_props: {
// 				className: 'form'
// 			},
// 			field_input_props: {
// 				className: 'form__input'
// 			},
// 			field_data_props: [
// 				{
// 					field_component: 'input',
// 					type: "email",
// 					name: "email",
// 					id: "email",
// 					placeholder: "What's your email?",
// 					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
// 					// value: formState.email
// 				},
// 				{
// 					field_component: 'input',
// 					type: "password",
// 					name: "password",
// 					id: "password",
// 					placeholder: "Enter your password",
// 					className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
// 					// value: formState.password,
// 					// onChange: handlechange
// 				}
// 			]
// 		}
	
  return (
    <>
        <div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black'>
        <Navbar/>
        {/* <AlertErrorComponent/> */}
        {/* title={auth_card_props.title} */}
        <AuthCard  />
        </div>
        <Footer/>
    </>
  )
}

export default LoginPage