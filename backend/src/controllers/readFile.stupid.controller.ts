import path from "path"
import fs from "fs"

const readFileStupidController = async (req, res, next) => {
    try {
    // GET /uploads/../../.env
    const data = fs.readFileSync('uploads' + req.url)
    return res.send(data);
        const { filename } = req.params
        //res.set('X-Content-Type-Options', 'nosniff')
        console.log("This is the image path: ", "uploads/", filename)
        return res.send(path.resolve(`uploads/${filename}`))
    } catch (err) {
        return next(err)
    }

}

export default readFileStupidController