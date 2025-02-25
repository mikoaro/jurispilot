import { DocumentList } from "@/components/document-list"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-dropdown-menu"

export default function BriefsPage() {
  return (
     <SidebarInset className="mt-20">
     <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
       <div className="flex items-center gap-2 px-4">
         <SidebarTrigger className="-ml-1" />
         <Separator className="mr-2 h-4" />
         <Breadcrumb>
           <BreadcrumbList>
             <BreadcrumbItem className="hidden md:block">
               <BreadcrumbLink href="#">Documents</BreadcrumbLink>
             </BreadcrumbItem>
             <BreadcrumbSeparator className="hidden md:block" />
             <BreadcrumbItem>
               <BreadcrumbPage>Briefs</BreadcrumbPage>
             </BreadcrumbItem>
           </BreadcrumbList>
         </Breadcrumb>
       </div>
     </header>
     <div className="px-5">
     <DocumentList />
     </div>
   </SidebarInset>
  )
}

