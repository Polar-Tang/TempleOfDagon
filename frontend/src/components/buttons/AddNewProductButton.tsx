import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, useState } from "react"
import { Product } from "@/types/products"
import type { AlertProps } from "@/types/AlertTypes"
import { AlertDestructive } from "../AlertErrorComponent"

export function DialogDemo({ className }: { className: string }) {

    const [formState, setformState] = useState({} as Product)
    const [alertDataState, setAlertDataState] = useState({} as AlertProps)
    const [IsSendReq, setIsSendReq] = useState(false)
    const handleFileChange = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setformState(prev => ({
            ...prev,
            file: target.files ? target.files[0] : undefined
        }));
        console.log(formState)
    };

    const submitMultipartForm = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(formState)) {
            console.log(`${key}: ${value}`);
            if (formState.file && key === "file") {
                formData.append('file', formState.file)
                continue
            }
            formData.append(key, String(value))
        }


        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            }
        });

        const result = await response.json()
        setIsSendReq(true)
        let alertData: AlertProps = {
            title: result.response.message,
            description: result.response.payload.message,
            variant: "destructive"
        }
        if (result.response.ok) {
            alertData.variant = "default"
        }
        const timeoutId = setTimeout(() => {
            setAlertDataState(alertData)
            setIsSendReq(false)
        }, 2000)

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }

    }

    const handleSelectChange = (name: string, value: string | number) => {
        setformState({ ...formState, [name]: value })
        console.log(formState)

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        console.log(e.target)
        setformState({ ...formState, [name]: value })
        console.log(formState)

    }

    return (
        <Dialog>
            {IsSendReq && <AlertDestructive variant={alertDataState.variant} description={alertDataState.description} title={alertDataState.title} />}
            <DialogTrigger asChild>
                <Button variant="outline" className={className}>Add a new product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Product details</DialogTitle>
                    <DialogDescription>
                        Create your product here. Click submit when it's done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={submitMultipartForm} >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            name="title"
                            onChange={handleChange}
                            id="title" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            name="description"
                            onChange={handleChange}
                            className="col-span-3" placeholder="Tell us all the terrifying details about your product." />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            name="price"
                            onChange={handleChange}
                            id="price" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">a
                            Stock
                        </Label>
                        <Input
                            onChange={handleChange}
                            name="stock"
                            id="stock" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Select
                            value={formState.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">
                            Image
                        </Label>
                        <Input
                            onChange={handleFileChange}
                            className="col-span-3"
                            type="file"
                            accept="image/*"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" >Submit</Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}
