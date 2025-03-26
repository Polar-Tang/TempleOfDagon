import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"


function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <FaCartShopping />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export default SidebarTrigger