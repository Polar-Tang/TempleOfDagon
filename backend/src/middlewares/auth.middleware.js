import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.js"
import ResponseBuilder  from "../helpers/builders/response.builder.js"


const authMiddleware = (allowed_roles) => {
    const errStatusCode = 500

    return (req, res, next) => {
        try {
            const auth_header = req.headers['authorization']
            console.log(auth_header)
            if (!auth_header) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(errStatusCode)
                    .setMessage(`Algo salió mal`)
                    .setPayload({
                        message: "No hay token"
                    })
                    .build()
                return res.status(errStatusCode).json({ response })

            }
            const access_token = auth_header.split(" ")[1]

            if (!access_token) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(errStatusCode)
                    .setMessage(`Algo salió mal`)
                    .setPayload({
                        message: "Token malformado"
                    })
                    .build()
                return res.status(errStatusCode).json({ response })
            }

            try {
                const user_session_payload_decoded = jwt.verify(access_token, process.env.JWT_SECRET)
                if (!allowed_roles.includes(user_session_payload_decoded.role) || !user_session_payload_decoded) {
                    const response = new ResponseBuilder()
                        .setOk(false)
                        .setStatus(403)
                        .setMessage(`Algo salió mal`)
                        .setPayload({
                            message: "Operación no permitida"
                        })
                        .build()
                    return res.status(403).json({ response })
                }

                req.user = user_session_payload_decoded

                next()
            } catch (err) {
                console.log(err)
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setStatus(errStatusCode)
                    .setMessage(`Algo salió mal`)
                    .setPayload({
                        message: err.message
                    })
                    .build()
                return res.status(errStatusCode).json({ response })
            }

        } catch (err) {
            console.log(err)
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(errStatusCode)
            .setMessage(`Algo salió mal`)
            .setPayload({
                message: err.message
            })
            .build()
        return res.status(errStatusCode).json({ response })
        }
    }
}

export default authMiddleware