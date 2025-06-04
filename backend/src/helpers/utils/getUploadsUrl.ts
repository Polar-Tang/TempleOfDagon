import ENVIRONMENT from "../../config/environment"

export const getUploadsUrl = (fileName: string) => { 
    return process.env.isDocker ? `${process.env.FRONTENDURL}/images/uploads/${fileName}` : `${process.env.BACKENDURL}/uploads/${fileName}`
}