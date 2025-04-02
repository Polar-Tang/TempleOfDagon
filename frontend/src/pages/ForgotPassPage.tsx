import AuthCard from '@/components/cards/AuthCard'
import "./home.css"
import "../output.css"

const ForgotPassPage = () => {
	const auth_card_props = {
		title: "Recuperar contraseña",
		cardDescription: "Enter your email and password to login to your account",
		linkDirection: [{
			to: "/login",
			label: "Voy a loguearme"

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
		],
		submit_bottom_text: "Enviar",
	}

	return (
		<>
			<div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black'>
				<AuthCard endpoint="register" submit_bottom_text={auth_card_props.submit_bottom_text} field_data_props={auth_card_props.field_data_props} linkDirections={auth_card_props.linkDirection} cardDescription={auth_card_props.cardDescription} titleH1={auth_card_props.title} />
			</div>
		</>
	)
}

export default ForgotPassPage