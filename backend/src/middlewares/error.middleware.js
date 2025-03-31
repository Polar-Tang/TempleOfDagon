import ResponseBuilder from "../helpers/builders/response.builder.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (err.isOperational) {
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(err.statusCode)
        .setMessage(`Algo salió mal`)
        .setPayload({
            message: err.message
        })
        .build()
    return res.status(err.statusCode).json({ response })
    }

    console.error('PANIC: ', err)

    const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(err.statusCode)
        .setMessage(`Algo salió mal`)
        .setPayload({
            message: "Ocurrió un error, intenta luego más tarde"
        })
        .build()
    return res.status(err.statusCode).json({ response })
}

export default errorHandlerMiddleware