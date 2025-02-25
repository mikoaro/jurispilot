"use client"
import { FileDown, Folder } from "lucide-react"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"
import Image from "next/image"

export function NavProjects() {
  const pathname = usePathname()
  const { documentAnalysisItems } = useProjectSpaces()

  function isActive(url: string) {
    return pathname === url
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {documentAnalysisItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.url)}
              tooltip={item.title}
              className="data-[active=true]:bg-blue-500 data-[active=true]:text-white"
            >
              <Link href={item.url}>
                {/* <Image src={item.icon || "/placeholder.png"} alt="logo" width="40" height="40" className="rounded-lg" /> */}
                <Folder />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

