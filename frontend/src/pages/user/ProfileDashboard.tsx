import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Edit, Save } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import type { profileType } from "@/types/ProfileTypes"
import FileUploadButton from "@/components/buttons/FileUploadButton"
import ImgComponent from "@/components/ImageComponent"


export const ProfileDashBoard = ({ isOwner, profileData, name }: { isOwner: boolean, setProfileData: React.Dispatch<React.SetStateAction<profileType>>, profileData: profileType, name: string }) => {
    const [isEditing, setIsEditing] = useState(false)
    console.log(profileData)


    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div className="w-80 min-w-80 border-r border-gray-800 bg-gray-950 p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{isOwner ? "Profile" : name}</h2>
                {isOwner &&
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleEdit}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                        {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>}
            </div>

            <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4 group">
                    <ImgComponent className="h-auto w-24 rounded-full object-cover"
                        src={`${profileData.image_url ? profileData.image_url : "https://github.com/shadcn.png"}`}
                        alt="Avatar"

                    />


                    {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full bg-black">
                            <FileUploadButton />
                        </div>
                    )}
                </div>
                <h3 className="text-lg font-semibold">{profileData.name}</h3>
            </div>

            <Separator className="my-4 bg-gray-800" />

            <div className="space-y-4 flex-1">
                <div>
                    <Label htmlFor="bio" className="text-gray-400 text-sm">
                        Bio
                    </Label>

                    <p className="mt-1 text-sm text-gray-300">{profileData.bio}</p>
                </div>

                <div>
                    <Label htmlFor="email" className="text-gray-400 text-sm">
                        Email
                    </Label>

                    <p className="mt-1 text-sm text-gray-300">{profileData.email}</p>

                </div>
            </div>

        </div>
    )
}