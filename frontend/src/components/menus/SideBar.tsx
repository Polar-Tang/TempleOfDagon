import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { Products } from "@/types/products"
import CartMenu from "./CartMenu"
// import { Link } from "react-router-dom"
// import { Button } from "../ui/button"
import SidebarCloser from "@/components/buttons/SidebarCloser"
// import SidebarTrigger from "../buttons/SidebarTrigger"

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
      <SidebarGroup className="flex flex-row items-start justify-between">
          <div className="flex flex-col">
          <SidebarGroupLabel>Productos en el carrito</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CartMenu />
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
          </div>
          <SidebarCloser className="mt-2 mr-2" />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

