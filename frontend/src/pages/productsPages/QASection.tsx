import { useState } from "react"
import { Badge } from "@/components/ui/badge"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Truck, RotateCcw, CreditCard, Shield, Reply } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { comment, commentsComponent } from "@/types/CommentsType"
import { CommentInputFormWithFeedback } from "./CommentInputFormWithFeedback"
import InputMessage from "@/components/InputMessage"
import { formatRelativeTime } from "@/lib/helpers/formatRelativeTime"
import DescriptionProductSection from "./DescriptionProductSection"

type DialogType = "shipping" | "returns" | "payment" | "warranty" | null

export default function QASection({ commentState, setcommentState, comments, product_id, desc}: commentsComponent) {
    const [openDialog, setOpenDialog] = useState<DialogType>(null)

    const dialogContent = {
        shipping: {
            title: "Costo y tiempo de envío",
            icon: <Truck className="w-5 h-5" />,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Envío gratis</h4>
                        <p className="text-sm text-gray-600">En compras superiores a $50.000</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Tiempos de entrega</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Capital Federal: 1-2 días hábiles</li>
                            <li>• GBA: 2-3 días hábiles</li>
                            <li>• Interior: 3-7 días hábiles</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Costos</h4>
                        <p className="text-sm text-gray-600">
                            El costo se calcula automáticamente según tu ubicación al finalizar la compra.
                        </p>
                    </div>
                </div>
            ),
        },
        returns: {
            title: "Devoluciones gratis",
            icon: <RotateCcw className="w-5 h-5" />,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Política de devoluciones</h4>
                        <p className="text-sm text-gray-600">Tenés 30 días para devolver tu producto sin costo adicional.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Condiciones</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• El producto debe estar en su empaque original</li>
                            <li>• No debe tener signos de uso</li>
                            <li>• Incluir todos los accesorios</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Proceso</h4>
                        <p className="text-sm text-gray-600">
                            Iniciá el proceso desde tu cuenta y te enviaremos las instrucciones.
                        </p>
                    </div>
                </div>
            ),
        },
        payment: {
            title: "Medios de pago y promociones",
            icon: <CreditCard className="w-5 h-5" />,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Medios de pago</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Tarjetas de crédito y débito</li>
                            <li>• Mercado Pago</li>
                            <li>• Transferencia bancaria</li>
                            <li>• Efectivo en puntos de pago</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Promociones vigentes</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 12 cuotas sin interés con tarjetas seleccionadas</li>
                            <li>• 15% off pagando con transferencia</li>
                            <li>• 2x1 en productos seleccionados</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        warranty: {
            title: "Garantía",
            icon: <Shield className="w-5 h-5" />,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Garantía del fabricante</h4>
                        <p className="text-sm text-gray-600">Todos nuestros productos incluyen garantía oficial del fabricante.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Duración</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Electrónicos: 12 meses</li>
                            <li>• Electrodomésticos: 12-24 meses</li>
                            <li>• Herramientas: 6-12 meses</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium">Cobertura</h4>
                        <p className="text-sm text-gray-600">
                            Cubre defectos de fabricación y fallas técnicas. No incluye daños por mal uso.
                        </p>
                    </div>
                </div>
            ),
        },
    }

    return (
        <div className="bg-gray-900 text-white p-6 min-h-screen">
            <DescriptionProductSection desc={desc}/>
            <h1 className="text-2xl font-medium">Q & A</h1>
            <Separator className="my-4" />
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-6">

                    <div className="space-y-4">
                        <h2 className="text-lg text-gray-300">¿Qué querés saber?</h2>

                        {/* Category badges */}
                        <div className="flex flex-wrap gap-3">
                            <Badge
                                variant="outline"
                                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer"
                                onClick={() => setOpenDialog("shipping")}
                            >
                                Costo y tiempo de envío
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer"
                                onClick={() => setOpenDialog("returns")}
                            >
                                Devoluciones gratis
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer"
                                onClick={() => setOpenDialog("payment")}
                            >
                                Medios de pago y promociones
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer"
                                onClick={() => setOpenDialog("warranty")}
                            >
                                Garantía
                            </Badge>
                        </div>
                    </div>
                </div>



                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Last questions</h3>

                    <div className="space-y-4">
                        <CommentsList setcommentState={setcommentState} comments={comments} />
                    </div>


                    <CommentInputFormWithFeedback commentState={commentState} setcommentState={setcommentState} product_id={product_id} />

                </div>

            </div>

            {/* Dialogs */}
            {Object.entries(dialogContent).map(([key, content]) => (
                <Dialog key={key} open={openDialog === key} onOpenChange={(open) => !open && setOpenDialog(null)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                {content.icon}
                                {content.title}
                            </DialogTitle>
                            <DialogDescription className="sr-only">Información sobre {content.title.toLowerCase()}</DialogDescription>
                        </DialogHeader>
                        {content.content}
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}


const CommentsList = ({ comments, setcommentState }: { comments: comment[] | undefined,setcommentState: React.Dispatch<React.SetStateAction<comment[]>> }) => {
   
    if (comments && comments.length > 0) {
        return (
            <div className="space-y-6">
                {comments.map((question) => (
                    <Comment key={question._id} setcommentState={setcommentState} comment={question} />
                ))}
            </div>
        );
    } else {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">💬</div>
                <p className="text-gray-400">No comments yet. Be the first one!</p>
            </div>
        );
    }
}
// Utility function to format relative time

const Comment = ({ comment, setcommentState }: { comment: comment, setcommentState: React.Dispatch<React.SetStateAction<comment[]>> }) => {
    const [toggleInput, settoggleInput] = useState(false)
    console.log(comment.createdAt)
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors" id={comment._id}>
            {/* Main Comment */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="text-white text-left font-medium text-sm">{comment.author}</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                {comment.createdAt && (
                                    <p className="text-xs text-gray-500 mt-1" title={`Posted: ${new Date(comment.updatedAt).toLocaleString()}`}>
                                        posted {formatRelativeTime(comment.createdAt)}
                                    </p>
                                )}
                            </div>
                            <Reply onClick={() => settoggleInput(prevState => !prevState)} className="ml-2" />
                        </div>
                    </div>
                </div>

                <div className="ml-11">
                    <p className="text-gray-100 leading-relaxed">{comment.message}</p>
                </div>
            </div>

            {/* Responses */}
            {comment.comments && comment.comments.length > 0 && (
                <div className="mt-4 ml-6 space-y-3 border-l-2 border-gray-700 pl-4">
                    {comment.comments.map((response, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                                {response.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-gray-300 font-medium text-sm">{response.author}</h5>
                                    <span className="text-gray-500 text-xs">•</span>
                                    <span className="text-gray-500 text-xs" title={response.createdAt ? new Date(response.createdAt).toLocaleString() : ''}>
                                        {response.createdAt && formatRelativeTime(response.createdAt)}
                                    </span>
                                </div>
                                <p className="text-gray-200 text-sm leading-relaxed">{response.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {toggleInput && 
            <InputMessage comment_id={comment._id} setcommentState={setcommentState} />
            }
        </div>
    )
}