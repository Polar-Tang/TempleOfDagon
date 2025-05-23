export const verifyString = (field_name: string, field_value: string) => {
    if(!(typeof(field_value) === 'string')){
        return field_name + ' must be a text'
    }
    return ""
}

export const virifyPositiveNumber = (field_name: string, field_value: number): string => {
    const num = Number(field_value)
    console.log(num, typeof num)
    if(!(typeof(num) === 'number') && num < 0){
        return field_name + ' must be an integer greater than zero'
    }
    return ""
}