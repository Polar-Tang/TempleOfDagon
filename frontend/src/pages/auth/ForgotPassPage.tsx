import AuthCard from '@/components/cards/AuthCard'
import type {AuthTypeProps} from "@/types/AuthProps"

const ForgotPassPage = () => {
	const auth_card_props: AuthTypeProps = {
		titleH1: "Recuperar contraseña",
		cardDescription: "Ingrse su mail y se le enviara un correo electrónico",
		linkDirections: [{
			to: "/login",
			label: "Voy a loguearme"

		}],
		field_data_props: [
			{
				field_tag: 'input',
				type: "email",
				name: "email",
				id: "email",
				placeholder: "Ingrese su mail",
				className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
			},
		],
		submit_bottom_text: "Enviar",
	}

	return (
		<>
			<div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black'>
				<AuthCard endpointInSuccessCase="" endpoint="forgot-password" submit_bottom_text={auth_card_props.submit_bottom_text} field_data_props={auth_card_props.field_data_props} linkDirections={auth_card_props.linkDirections} cardDescription={auth_card_props.cardDescription} titleH1={auth_card_props.titleH1} />
			</div>
		</>
	)
}

export default ForgotPassPage