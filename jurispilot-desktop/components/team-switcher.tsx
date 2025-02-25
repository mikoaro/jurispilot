"use client"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { projectSpaces, activeProjectSpace, setActiveProjectSpace } = useProjectSpaces()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <Image
                  src={activeProjectSpace?.logo || "/placeholder.png"}
                  alt="logo"
                  width="50"
                  height="40" 
                  className="bg-cover ml-2"
                />
             
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeProjectSpace?.name}</span>
                <span className="truncate text-xs">{activeProjectSpace?.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Project Spaces</DropdownMenuLabel>
            {projectSpaces.map((team, index) => (
              <DropdownMenuItem key={team.id} onClick={() => setActiveProjectSpace(team)} className="gap-2 p-2">
                
                  <Image src={team.logo || "/placeholder.png"} alt="logo" width="30" height="40" className="rounded-md" />
               
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

