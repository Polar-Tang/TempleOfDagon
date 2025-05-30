export type comment = {
    author: string,
    message: string,
    _id: string
    comments: response[],
    createdAt: string
    updatedAt: string
}

type response = {
    author: string,
    message: string,
    _id: string,
    createdAt?: string
    updatedAt?: string
}

export type commentsComponent = {
    comments?: comment[] | undefined, 
    product_id?: string,
    commentState: comment[] | undefined,
    setcommentState: React.Dispatch<React.SetStateAction<comment[]>>,


}