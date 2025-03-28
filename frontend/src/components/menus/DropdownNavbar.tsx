import { FaBars } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccordionDemo } from "./Acordion"


export function DropdownMenuCheckboxes() {
  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  // const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  // const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenu modal={false} >
      <DropdownMenuTrigger asChild>
        <Button className="flex justify-center items-center p-0 text-center" variant="outline">
          <FaBars className="h-25 w-full justify-center items-center p-0 text-center" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AccordionDemo />
        {/* 
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}