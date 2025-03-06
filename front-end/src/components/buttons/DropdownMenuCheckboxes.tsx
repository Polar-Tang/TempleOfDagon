// "use client"

// import * as React from "react"
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import { NavLink } from "react-router-dom"
// import { LoginPage } from "@/pages"

// type Checked = DropdownMenuCheckboxItemProps["checked"]

// export function DropdownMenuCheckboxes() {
//   const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
//   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
//   const [showPanel, setShowPanel] = React.useState<Checked>(false)

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">Login</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>
//           <Avatar>
//             <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuCheckboxItem
//           // checked={showStatusBar}
//           onCheckedChange={setShowStatusBar}
//         >
//           <NavLink to={"/login"} >
//             Login
//           </NavLink>
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           onCheckedChange={setShowActivityBar}
//           disabled
//         // checked={showActivityBar}
//         >
//           Profile
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           // checked={showPanel}
//           onCheckedChange={setShowPanel}
//         >
//           Logout
//           {/* move the line below */}
//         </DropdownMenuCheckboxItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
