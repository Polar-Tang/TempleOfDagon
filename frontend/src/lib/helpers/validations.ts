const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// return string truthy if the conditions aren't supplied

export const verifyString = (field_name: string, field_value: string) => {
    if(!(typeof(field_value) === 'string')){
        return field_name + ' must be a text'
    }
    return ""
}
export const verifyMinLength = (field_name: string, field_value: string, minLength: number) => {
    if(!(field_value.length >= minLength)){
        return field_name + ' should have at least ' + minLength + ' characters'
    }
    return ""
}

export const verifyMaxLength = (field_name: string, field_value: string, maxLength: number) => {
    if(!(field_value.length <= maxLength)){
        return field_name + ' should have at least ' + maxLength + ' characters'
    }
    return ""

}

export const verifyNumber = (field_name: string, field_value: string) => {
    if(!(typeof field_value === 'number')){
        return field_name + ' must be a number'
    }
    return ""
}

export const verifyEmail = (field_name: string, field_value: string) => {
    if(!(emailRegex.test(field_value))){
        return field_name + " doesn't comply email format"
    }
    return ""
}