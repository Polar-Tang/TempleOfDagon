  import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { Products } from "@/types/products"
import CartMenu from "./CartMenu"
// import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CartMenu />
              </SidebarMenuItem>
              {/* {cartProducts && cartProducts.map((item) => (
                      <img src={item.image_url} alt={item.title} className="w-10 h-10 rounded-full" />
                      <div className="flex align-center" >
                      <p className="text-sm " >{item.title}</p>
                      <span className="text-sm text-gray-500 ">{item.price}</span>
                      </div>
                      </SidebarMenuItem>
                      ))} */}
                      <SidebarMenuButton asChild>
                        <Button asChild variant="outline" className="w-full">
                            <span className="text-sm">Ver todos los productos</span>
                            </Button>
                        </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

