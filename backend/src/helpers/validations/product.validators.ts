export const verifyString = (field_name: string, field_value: string) => {
    if(!(typeof(field_value) === 'string')){
        return field_name + ' must be a text'
    }
    return ""
}

export const positiveNumber = (field_name: string, field_value: number) => {
    if(!(typeof(field_value) === 'number') && field_value > 0){
        return field_name + ' must be an integer greater than zero'
    }
    return ""
}