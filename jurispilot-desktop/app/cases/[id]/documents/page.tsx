"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Upload } from "lucide-react"
import Link from "next/link"
import { recentCases } from "@/lib/sample-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DocumentActions } from "@/components/documents/document-actions"
import { Toaster } from "@/components/ui/toaster"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploaded: string
}

const initialDocuments: Document[] = [
  {
    id: "DOC-001",
    name: "Initial Complaint",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2024-02-20",
  },
  {
    id: "DOC-002",
    name: "Evidence Exhibit A",
    type: "DOCX",
    size: "1.8 MB",
    uploaded: "2024-02-19",
  },
  {
    id: "DOC-003",
    name: "Witness Statement",
    type: "PDF",
    size: "3.2 MB",
    uploaded: "2024-02-18",
  },
]

export default function CaseDocumentsPage({ params }: { params: { id: string } }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)

  const caseData = recentCases.find((c) => c.id === params.id) || {
    id: params.id,
    title: "Case Documents",
    type: "Unknown",
  }

  const handleDeleteDocument = (documentId: string) => {
    setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== documentId))
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
                <BreadcrumbPage>Documents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    <div className="h-full px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cases">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{caseData.title}</h1>
            <p className="text-muted-foreground">Case Documents</p>
          </div>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {doc.name}
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.uploaded}</TableCell>
                  <TableCell>
                    <DocumentActions document={doc} onDelete={handleDeleteDocument} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Toaster />
    </div>
    </SidebarInset>
  )
}

