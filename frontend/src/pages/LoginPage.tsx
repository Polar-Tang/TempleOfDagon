// import Footer from '@/components/Footer'
import AuthCard from '@/components/cards/AuthCard'
// import Navbar from '@/components/Navbar'
import "./home.css"
import "../output.css"
// import { useEffect } from 'react'
// import { AlertErrorComponent } from '@/components/AlertErrorComponent'

const LoginPage = () => {
	const auth_card_props = {
		title: "Login",
		cardDescription: "Enter your email and password to login to your account",
		linkDirection: [{
			to: "/registrar",
			label: "No tengo cuenta"

		}, {
			to: "/recuprarcontraseña",
			label: "Olvidé mi contraseña"
		}],
		field_data_props: [
			{
				field_tag: 'input',
				type: "email",
				name: "email",
				id: "email",
				placeholder: "What's your email?",
				className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
			},
			{
				field_tag: 'input',
				type: "password",
				name: "password",
				id: "password",
				placeholder: "Enter your password",
				className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
			}
		],
		submit_bottom_text: "Login",
	}

	return (
		<>
			<div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black w-screen'>
				{/* <Navbar /> */}
				<AuthCard endpoint="login" submit_bottom_text={auth_card_props.submit_bottom_text} field_data_props={auth_card_props.field_data_props} linkDirections={auth_card_props.linkDirection} cardDescription={auth_card_props.cardDescription} titleH1={auth_card_props.title} />
			</div>
			{/* <Footer /> */}
		</>
	)
}

export default LoginPage