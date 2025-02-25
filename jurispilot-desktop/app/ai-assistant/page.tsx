"use client"

import { ProtegeTraining } from "@/components/protege/protege-training"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"

export default function ProtegePage() {
  const { aiAssistantImage, userImage } = useProjectSpaces()

  return (
    <SidebarInset className="mt-20">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">JurisPilot</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>AI Assistant</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="h-full px-5 space-y-6">
        <div>
          <h1 className="text-xl font-bold">Legal Research Protege</h1>
          <p className="text-muted-foreground">Your AI-powered legal research training companion</p>
        </div>
        <ProtegeTraining aiAssistantImage={aiAssistantImage} userImage={userImage} />
      </div>
    </SidebarInset>
  )
}

