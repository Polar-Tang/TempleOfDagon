import SecondNavbar from '@/components/SecondNavbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductGrid from "./ProductGrid"
import { Products } from '@/types/products'
import { ProfileDashBoard } from './ProfileDashboard'
import type {profileType} from "@/types/ProfileTypes"
import { DialogDemo } from '@/components/buttons/AddNewProductButton'





const ProfilePage = () => {
  const [profileData, setProfileData] = useState<profileType>({} as profileType)
  const [products, setProducts] = useState([] as Products)
  const [isOwnerState, setisOwnerState] = useState(false)



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
    setProducts(bodyRes.response.payload.user.productsFilter)
    setisOwnerState(bodyRes.response.payload.isOwner)
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


  console.log(profileData)
  return (
    <SecondNavbar>
      {
        (!profileData) ? <p>Not found</p>
        :
        <div className="flex h-screen w-full overflow-hidden">
          {/* Left Sidebar - Profile Details */}
          <ProfileDashBoard isOwner={isOwnerState} name={name} profileData={profileData} setProfileData={setProfileData}/>

          {/* Right Content - Products */}
          <div className="flex-1 overflow-y-auto bg-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">My Products</h1>
              { isOwnerState && <DialogDemo className="bg-white text-black hover:bg-gray-200"/> }
            </div>

            <ProductGrid products={products} isOwnerState={isOwnerState} seller_id={name} />
          </div>
        </div>

      }

    </SecondNavbar>

  )
}
export default ProfilePage

