import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  // SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { Products } from "@/types/products"
import CartMenu from "./CartMenu"
// import { Link } from "react-router-dom"
// import { Button } from "../ui/button"
import SidebarCloser from "@/components/buttons/SidebarCloser"
import { Button } from "../ui/button"
import ProductsCheckoutButton from "../buttons/ProductsCheckoutButton"
// import SidebarTrigger from "../buttons/SidebarTrigger"

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex flex-row items-start justify-between">
          <div className="flex flex-col">
            <SidebarGroupLabel>Products in cart</SidebarGroupLabel>
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
        <SidebarMenuButton asChild>
          <Button asChild variant="outline" className="w-full flex">
            <span className="text-sm flex text-center">
              <ProductsCheckoutButton/>
              </span>
          </Button>
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  )
}

