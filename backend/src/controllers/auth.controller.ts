import Joi from 'joi'
import ResponseBuilder from '../helpers/builders/response.builder.js'
// import nodemailer from 'nodemailer'
import transportEmail from '../helpers/email.transporter.helpers.js'
import ENVIRONMENT from '../config/environment.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user.repository.js'
import express, { request, response } from "express"
import userType from '../helpers/types/user.type.ts'
import AppError from "../helpers/errors/app.error.js";

// const searchUserByEmail = (): (Document & {
//     name: string;
//     email: string;
//     password: string;
//     emailVerified: boolean;
//     timeStamp: NativeDate;
//     active: boolean;
//     role: string;
//     verificationToken?: string | null;
// }) | null => { 
//     // Your implementation here
// }

export const registerController = async (req: request, res: response, next) => {
    console.log(req.body)
    try {
        // VALIDATIONS OF THE BODY
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = schema.validate(req.body)
        if (error) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setPayload({
                error
            })
            .build()
        return res.status(400).json({ response })
        }
        const hashedPassword = await bcrypt.hash(value.password, 10)

        const user = {
            name: value.name,
            email: value.email,
            password: hashedPassword,
            emailVerified: false,
            verificationToken: ''
        }

        await UserRepository.register(user)
        // VERIFY TOKEN
        const validationToken = jwt.sign({
            email: value.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        })

        const redirectURL = `${process.env.BACKENDURL}/api/auth/verify-email/` + validationToken

        // SEND MAIL
        const mailOptions = {
            from: {
                name: "Froggy Market",
                address: process.env.EMAIL_USER
            },
            subject: 'Email verification',
            to: value.email,
            html: `
                 <h1>Verify Your Email</h1>
                <p>Please click the link below to verify your email </p>
                <a href=${redirectURL} >Verify</a>
                `,
            attachments: [
                {
                    filename: '/home/pull/labs/clases-backend/backend/images.jpeg',
                    contentType: 'image/jpeg'
                }
            ]
        }
        const result = transportEmail.sendMail(mailOptions)

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`OK`)
            .setPayload({
                messageSucess : `Enviamos un correo a: ${String(value.email)}`
            })
            .build()
        return res.status(200).json({ response })
    } catch (error) {

        if (error.code === 11000) {
            console.log(error.code)
            console.log(typeof error.code)
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`El email ya existe`)
                .setPayload({
                    detail: "El email ya existe!"
                })
                .build()
            return res.status(400).json({ response })
        } else {
            next(error)
        }
    }
}

export const verifyEmailController = async (req: request, res: response, next) => {
    try {
        const { validation_token } = req.params
        const payload = jwt.verify(validation_token, process.env.JWT_SECRET)
        console.log("Token tecibido: ", payload)
        const user_to_verify = await UserRepository.getByMail({ email: payload.email })
        if (!user_to_verify) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setPayload("Usuario no encontrado")
            .build()
            return res.status(400).json({ response })
        }
        user_to_verify.emailVerified = true
        await UserRepository.register(user_to_verify)

        res.redirect(`${process.env.FRONTENDURL}/login`)
    } catch (err) {
        next(err)
    }
}

export const loginController = async (req: request, res: response, next) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = loginSchema.validate(req.body)

        const user = await UserRepository.getByMail({ email: value.email })

        if (!user) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
                await console.log(typeof user)
            return res.status(400).json({ response })
        }


        const isValidPassword = await bcrypt.compare(value.password, user.password)

        
        if (!isValidPassword) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Invalid credentials`)
                .setPayload({
                    detail: "Bad credentials",
                })
                .build()
            return res.status(400).json({ response })
        }
        if (!user.emailVerified) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Please verify your email before logging in`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.status(400).json({ response })
        }

        const access_token = jwt.sign({
            user_id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Logged successfully!`)
            .setPayload({
                detail: access_token
            })
            .build()
        return res.status(200).json({ response })

    } catch (err) {
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })
    }

}


export const forgotPasswordController = async (req: request, res: response, next) => {
    try{
        const { email } = req.body

        const user = await UserRepository.getByMail({ email: email })
        if (!user) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.status(400).json({ response })
        }
    
        const reset_token = jwt.sign({
            user_id: user._id,
            name: user.name,
            email: user.email
        },
             process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })
        const redirectURL = `${process.env.BACKENDURL}/api/auth/recovery-password/${reset_token}`
    
    
        const mailOptions = {
            from: {
                name: "Froggy Market",
                address: process.env.EMAIL_USER
            },
            subject: 'Update your password',
            to: email,
            html: `
                <h1>Hello ${user.name}</h1>
                <p>CLick here and you could verify your password </p>
                <a href=${redirectURL} >Reset password</a>
                `,
            attachments: [
                {
                    filename: '/home/pull/labs/clases-backend/backend/images.jpeg',
                    contentType: 'image/jpeg'
                }
            ]
        }
        const result = transportEmail.sendMail(mailOptions)
    
        const response = new ResponseBuilder()
                .setOk(true)
                .setStatus(200)
                .setMessage(`Te hemos enviado un mail`)
                .setPayload({
                    detail: "Revisa tu correo electrónico, si no lo encuentras revisa en spam"
                })
                .build()
            return res.status(200).json({ response })
    } catch(err){
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })

    }
    
}

export const recoveryPasswordController = async (req: request, res: response, next) => { 
    try {
        const { reset_token } = req.params
        const { password } = req.body
        
        const virifiedToken = jwt.verify(reset_token, process.env.JWT_SECRET)
        
        if (!virifiedToken) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Invalid credentials`)
                .setPayload({
                    detail: "Bad credentials"
                })
                .build()
            return res.status(400).json({ response })
        }
        const user_to_verify = await UserRepository.getByMail({ email: virifiedToken.email })
        if (!user_to_verify) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
            return res.status(400).json({ response })
        }
        console.log(user_to_verify.password)
        console.log(password)

        console.log(user_to_verify.password == password)

        if (bcrypt.compareSync(password, user_to_verify.password)) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`La contraseña debe ser distinta de las anteriores`)
                .setPayload({
                    detail: "No se pueder reutilizar contraseñas"
                })
                .build()
            return res.status(400).json({ response })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        
        user_to_verify.password = hashedPassword
        await user_to_verify.save()

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Contraseña cambiada con éxito`)
            .setPayload({
                detail: "Ahora podrá conectarse con su nueva contrasena, " + user_to_verify.name
            })
            .build()
        return res.status(200).json({ response })
        

    } catch(error) {
        next(error)
    }
 }


export const logoutController = async (req, res, next) => {
   try {
       res.clearCookie('token');
       return res.status(200).json({ message: 'Logout successful' });
   } catch (error) {
       return next(new AppError('Ocurrió un error al cerrar sesión', 500));
   }
}




