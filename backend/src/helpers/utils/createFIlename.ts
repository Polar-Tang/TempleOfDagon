import path from "path"

function createFilename(originalname: string) {
  const ext = path.extname(originalname).toLowerCase()
  console.log(originalname, " ")
  // simple check the name
  const allowedExtensions = ['.jpg', '.png', '.jpeg', ".html"]
  if (!allowedExtensions.includes(ext)) {
    console.log(originalname, "has ", ext)
    // the error is passed as next() to the next
    return new Error('Only image files are allowed!')
  }

  const uniqueId = Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9)
  // generate a file name
  const completeFileName = uniqueId + ext
  console.log("Complete file name:", completeFileName)
  return completeFileName
}
export default createFilename