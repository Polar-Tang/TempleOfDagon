// import { minLength } from "../helpers/validation.js"
import { validateLen, validateAlphaNumeric } from "../helpers/validation.js"
import express from "express"

export const ping = async (req, res ) => {
    console.log("Is executing")
    res.sendStatus(200)
}

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

export const loginController = async (req: express.Request, res: express.Response) => { 
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



    for ( let i = 0; i < Object.keys(validationObject).length; i++) {
        let field = validationObject[i]
        field.validations.forEach((validation) => {
            const {message, success } = validation(field.field_value, field.field_name)
            if (!success){
                console.log("THe first one it's false ", success, " from ", field.field_name)
                valBody[field.field_name].push({
                    message: message,
                    success: success,
                    fieldValue: field.field_value
                })
                console.log(valBody)
            }
        })
    }
    return res.send(valBody)
}