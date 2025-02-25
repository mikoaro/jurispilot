"use client"

import { useParams } from "next/navigation"
import AgreementsTable from "@/components/agreements-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"
import { Separator } from "@radix-ui/react-separator"

export default function ImportPage() {
  const { id } = useParams()
  const { documentAnalysisItems } = useProjectSpaces()
  const currentDocument = documentAnalysisItems.find((item) => item.id === id)

  return (
    <SidebarInset className="mt-20">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/import">Documents Analysis</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentDocument?.title || "Document"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-5">
        <AgreementsTable documentId={id as string} />
      </div>
    </SidebarInset>
  )
}

