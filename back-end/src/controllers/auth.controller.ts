// import { minLength } from "../helpers/validation.js"
import { validateLen, validateAlphaNumeric } from "../helpers/validation.js"
import express from "express"
import ENVIRONMENT from '../config/environment.js'
import supabase from '../config/supabaseClient/supabase.client.js'

export const loginController = async (req: express.Request, res: express.Response) => { 
    type valField = {
        message: string
        success: boolean
        fieldValue: string
    
    }
    
    type valFields = {
        password: valField[]
        name: valField[]
    }
    
    let valBody: valFields = {
        password: [],
        name: []
    }

    const { pass, name } = req.body

    const validationObject = [{
        field_name: "password",
        field_value: pass,
        validations: [
            validateLen,
            validateAlphaNumeric
        ]
    },
    {
        field_name: "name",
        field_value: name,
        validations: [
            validateAlphaNumeric,
        ]
    },
    ]

    let isRegisterError: boolean = false
    for ( let i = 0; i < Object.keys(validationObject).length; i++) {
        let field = validationObject[i]
        field.validations.forEach((validation) => {
            const {message, success } = validation(field.field_value, field.field_name)
            if (!success){
                valBody[field.field_name].push({
                    message: message,
                    success: success,
                    fieldValue: field.field_value
                })
                isRegisterError=true
                return
            }
        })
    }
    if (isRegisterError) {
        return res.send(valBody)
    }

    const {error} = await supabase
        .from('Users')
        .insert({
            name: name,
            pass: pass
        })
    if (error) {
        return res.send(error);
    }
    return res.send("created!!");

}