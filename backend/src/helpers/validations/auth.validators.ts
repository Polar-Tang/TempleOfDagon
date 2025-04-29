const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// return string truthy if the conditions aren't supplied

export const verifyString = (field_name: string, field_value: string) => {
    if(!(typeof(field_value) === 'string')){
        return field_name + ' debe ser un texto'
    }
    return ""
}
export const verifyMinLength = (field_name: string, field_value: string, minLength: number) => {
    if(!(field_value.length >= minLength)){
        return field_name + ' debe tener como minimo ' + minLength + ' caracteres'
    }
    return ""
}

export const verifyMaxLength = (field_name: string, field_value: string, maxLength: number) => {
    if(!(field_value.length <= maxLength)){
        return field_name + ' debe tener como minimo ' + maxLength + ' caracteres'
    }
    return ""

}

export const verifyNumber = (field_name: string, field_value: string) => {
    if(!(typeof field_value === 'number')){
        return field_name + ' debe ser un numero'
    }
    return ""
}

export const verifyEmail = (field_name: string, field_value: string) => {
    if(!(emailRegex.test(field_value))){
        return field_name + ' no cumple el formato email'
    }
    return ""
}