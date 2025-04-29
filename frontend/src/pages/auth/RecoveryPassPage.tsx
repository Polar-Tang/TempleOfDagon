import AuthCard from '@/components/cards/AuthCard'
import { useParams } from 'react-router-dom'
import type {AuthTypeProps} from "@/types/AuthProps"

const RecoveryPassPage = () => {
  const { reset_token } = useParams()

    const auth_card_props: AuthTypeProps = {
		titleH1: "Recuperar Contraseña",
		cardDescription: "Escibe tu nueva contraseña",
		field_data_props: [
			{
				field_tag: 'input',
				type: "password",
				name: "password",
				id: "password",
				placeholder: "Escribe tu nueva contraseña",
				className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
			},
            {
				field_tag: 'input',
				type: "password",
				name: "password",
				id: "password",
				placeholder: "Rescribí tu contraseña",
				className: "mt-1 p-2 w-full border rounded-md border-gray-700 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
			}
		],
		submit_bottom_text: "Enviar",
	}

	return (
		<>
			<div className='h-dvh w-full flex items-center justify-center flex-col-1 relative bg-black w-screen'>
				<AuthCard endpointInSuccessCase="/login" endpoint={`recovery-password/${reset_token}`} submit_bottom_text={auth_card_props.submit_bottom_text} field_data_props={auth_card_props.field_data_props} linkDirections={[]} cardDescription={auth_card_props.cardDescription} titleH1={auth_card_props.titleH1} />
			</div>
		</>
	)
}

export default RecoveryPassPage