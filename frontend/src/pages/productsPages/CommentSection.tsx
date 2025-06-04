import { commentsComponent } from "@/types/CommentsType"
import QASection from "./QASection"

const CommentSection = ({commentState, setcommentState, comments, product_id, desc}: commentsComponent) => {
    return (
        <div className="min-h-screen w-screen bg-black text-white">
            <main className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-4">
                        <QASection commentState={commentState} setcommentState={setcommentState} comments={comments} product_id={product_id} desc={desc} />
                    {/* <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    </div> */}
                </div>
            </main>
        </div>
    )
}

export default CommentSection