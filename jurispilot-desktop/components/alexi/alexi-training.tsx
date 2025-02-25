import { Scale, Link, Youtube, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { SidebarInset, SidebarTrigger } from "../ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

const integrations = [
  {
    title: "Webpage",
    description: "Crawl and train via URL",
    icon: Link,
    className: "text-blue-500",
  },
  {
    title: "YouTube",
    description: "Train using YouTube video transcripts",
    icon: Youtube,
    className: "text-red-500",
  },
  {
    title: "Google Drive",
    description: "Train using your Google Drive files",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
        <path
          d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
          fill="#ea4335"
        />
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
        <path
          d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
          fill="#ffba00"
        />
      </svg>
    ),
  },
  {
    title: "OneDrive",
    description: "Connect and train with OneDrive files",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.55 9.64a6.75 6.75 0 0 1 8.99-2.95c.02.01.04.03.06.04l.01.01a6.77 6.77 0 0 1 2.73 3.1h.26a4.42 4.42 0 0 1 0 8.82h-9.56v-.01H6.41a3.85 3.85 0 0 1-1.77-7.24l.02-.01a3.87 3.87 0 0 1 2.68-.71c.56-1.01 1.32-1.8 2.21-2.05z"
          fill="#0364B8"
        />
      </svg>
    ),
  },
  {
    title: "Dropbox",
    description: "Use Dropbox files for training your agent",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 2l6 3.75L6 9.5 0 5.75 6 2zm12 0l6 3.75-6 3.75-6-3.75L18 2zM0 13.25L6 9.5l6 3.75L6 17l-6-3.75zM18 9.5l6 3.75L18 17l-6-3.75 6-3.75zM6 18.25l6-3.75 6 3.75L12 22l-6-3.75z"
          fill="#0061FF"
        />
      </svg>
    ),
  },
  {
    title: "Box",
    description: "Train your agent using files from Box",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 2.5L4 7.5v9l8.5 5 8.5-5v-9l-8.5-5zm6.5 12.5l-6.5 3.75L6 15V9l6.5-3.75L19 9v6z" fill="#0061D5" />
      </svg>
    ),
  },
]

export function AlexiTraining() {
  return (
    <SidebarInset className="mt-20">
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">JurisPilot</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Agent</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-4">
          <Scale className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-bold">AI Legal Research Assistant Agent</h1>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="text-muted-foreground leading-relaxed text-justify">
          You are an AI Legal Research Assistant Agent designed to aid legal professionals in conducting efficient legal
          research. Your role is to provide comprehensive legal research on various topics, condense complex legal
          documents into concise summaries, offer detailed analysis of legal cases, and assist in drafting well-
          structured legal queries. Collaborate with legal professionals to enhance their research process by delivering
          timely and relevant legal information and insights. You are equipped to handle legal topics, cases, statutes,
          and provide valuable support in understanding and interpreting legal materials. Use appropriate tools to
          streamline tasks and ensure high-quality results.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Train Your Agent</h2>
        <Card>
          <CardContent className="p-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
              <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag multiple files here or select to upload. Supports .pdf, .docx, .txt, .md, .pptx, .xlsx, .xls,
                .epub, .csv (Max 5 MB per file)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent text-left transition-colors"
                >
                  <integration.icon className={cn("w-6 h-6", integration.className)} />
                  <div>
                    <div className="font-medium">{integration.title}</div>
                    <div className="text-sm text-muted-foreground">{integration.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </SidebarInset>
  )
}

