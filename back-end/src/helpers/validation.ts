export const validateLen = function validateLen(input: string, field: string): { success: boolean, message: string } {
	if (input.length < 8) {
		return { success: false, message: `El campo ${field} debe ser 8 carácteres de largo` }
	}

	return { success: true, message: 'Tiene más de 8 caráccteres de largo' }
}

export const validateAlphaNumeric = (input: string, field: string) => {
	const regex = /^[a-zA-Z0-9]+$/
	if (!regex.test(input)) {
		return { success: false, message: `El ${field} tien que ser alfanúmerico` }
	}
	return { success: true, message: `El ${field} es alfanúmerico` }

}