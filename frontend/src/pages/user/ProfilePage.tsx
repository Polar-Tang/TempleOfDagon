import SecondNavbar from '@/components/SecondNavbar'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from "react"
import { Edit, Save, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import ProductGrid from "./ProductGrid"
import { Products } from '@/types/products'

type profileType = {
  name: string,
  bio: string,
  location: string,
  website: string,
  email: string,
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<profileType>({} as profileType)
  const [products, setProducts] = useState([] as Products)
  const [isOwner, setisOwner] = useState(false)

  const putNewDetails = async () => { 
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
      }
    })
    // const bodyRes = await responseHTTP.json()

  }

  const getProfileDetail = async (userName: string) => {
    const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userName}`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
      }
    })
    const bodyRes = await responseHTTP.json()
    setProfileData(bodyRes.response.payload.user)
    setProducts(bodyRes.response.payload.user.products)
    setisOwner(bodyRes.response.payload.user.isOwner)
    console.log(bodyRes.response.payload.isOwner, isOwner)
  }


  const { name } = useParams()
  if (!name) {
    return (
      <p>Not found</p>
    )
  }
  useEffect(() => {
    getProfileDetail(name)
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <SecondNavbar>
      {
        (Object.values(profileData).length !== 0) &&

        <div className="flex h-screen w-full overflow-hidden">
          {/* Left Sidebar - Profile Details */}
          <div className="w-80 min-w-80 border-r border-gray-800 bg-gray-950 p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{isOwner ? "Profile" : name}</h2>
              { isOwner &&
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
                <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700">
                  <img
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile avatar"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Upload className="h-4 w-4" />
                    </Button>
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
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="mt-1 bg-gray-900 border-gray-700 resize-none"
                    rows={4}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-300">{profileData.bio}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-400 text-sm">
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="mt-1 bg-gray-900 border-gray-700"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-300">{profileData.location ? profileData.location : "Location not set" }</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-400 text-sm">
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="mt-1 bg-gray-900 border-gray-700"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-300">{profileData.email}</p>
                )}
              </div>
            </div>

                {
                  isEditing && 
                  <Button className='w-full hover:cursor-pointer' onSubmit={putNewDetails}>
                    Submit changes
                  </Button>
                }

          </div>

          {/* Right Content - Products */}
          <div className="flex-1 overflow-y-auto bg-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">My Products</h1>
              <Button className="bg-white text-black hover:bg-gray-200">Add New Product</Button>
            </div>

            <ProductGrid products={products} seller_id={name}/>
          </div>
        </div>

      }

    </SecondNavbar>

  )
}
export default ProfilePage