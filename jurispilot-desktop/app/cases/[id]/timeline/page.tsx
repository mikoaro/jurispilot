import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Circle } from "lucide-react"
import Link from "next/link"
import { recentCases } from "@/lib/sample-data"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const timeline = [
  {
    id: 1,
    title: "Case Filed",
    description: "Initial case documents submitted to court",
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: 2,
    title: "Initial Hearing",
    description: "Preliminary hearing scheduled with Judge Smith",
    date: "2024-02-20",
    status: "completed",
  },
  {
    id: 3,
    title: "Discovery Phase",
    description: "Document exchange and depositions",
    date: "2024-03-15",
    status: "pending",
  },
  {
    id: 4,
    title: "Mediation",
    description: "Scheduled mediation with opposing counsel",
    date: "2024-04-01",
    status: "pending",
  },
]

export default function CaseTimelinePage({ params }: { params: { id: string } }) {
  const caseData = recentCases.find((c) => c.id === params.id) || {
    id: params.id,
    title: "Case Timeline",
    type: "Unknown",
  }

  return (
    <SidebarInset className="mt-20">
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Cases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Timeline</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="h-full px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cases">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold">{caseData.title}</h1>
          <p className="text-muted-foreground">Case Timeline</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {timeline.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Circle className={`h-2 w-2 ${item.status === "completed" ? "fill-primary" : "fill-muted"}`} />
                  <div className="flex-1 w-[2px] bg-border" />
                </div>
                <div className="space-y-1 pb-8">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium leading-none">{item.title}</h4>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </SidebarInset>
  )
}

