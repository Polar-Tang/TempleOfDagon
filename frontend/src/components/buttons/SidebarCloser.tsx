// import { CartContext } from "@/context/CartContext";
// import { useContext } from "react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"
import { AiOutlineClose } from "react-icons/ai";


function SidebarCloser({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
        const { setOpen, toggleSidebar } = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7 z-1000 hover:cursor-pointer", className)}
      onClick={() => {
        setOpen(false)
        toggleSidebar()

      }}
      {...props}
    >
      <AiOutlineClose className="z-100 text-black"/>
      <span className="sr-only">Toggle Sidebar</span>

    </Button>
  )
}

export default SidebarCloser
