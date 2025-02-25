"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Card } from "@/components/ui/card"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"
import { Separator } from "@radix-ui/react-separator"

export default function EditDocumentsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { documentAnalysisItems, updateDocumentAnalysisItem, addDocumentAnalysisItem } = useProjectSpaces()
  const [image, setImage] = useState<string>("/placeholder.svg")
  const [imagePrompt, setImagePrompt] = useState<string>("")
  const [imageStorageId, setImageStorageId] = useState<string>("")
  const [documentName, setDocumentName] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (id === "new") {
      setDocumentName("")
      setImage("/placeholder.svg")
    } else {
      const item = documentAnalysisItems.find((item) => item.id === id)
      if (item) {
        setDocumentName(item.title)
        setImage(item.icon || "/placeholder.svg")
      }
    }
  }, [id, documentAnalysisItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    if (id === "new") {
      const newItem = {
        id: (documentAnalysisItems.length + 1).toString(),
        title: documentName,
        url: `/import/${documentAnalysisItems.length + 1}`,
        icon: image,
      }
      addDocumentAnalysisItem(newItem)
    } else {
      updateDocumentAnalysisItem(id as string, {
        title: documentName,
        icon: image,
      })
    }
    setIsUploading(false)
    router.push(`/import/${id === "new" ? documentAnalysisItems.length + 1 : id}`)
  }

  return (
    <SidebarInset className="mt-20">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/import">Documents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{id === "new" ? "New Document" : "Edit Document"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex h-screen w-full">
        <main className="flex-1 p-5 pt-0">
          <div className="mb-5 pb-5 flex items-center gap-4 border-b border-dotted">
            <Image
              src={image || "/placeholder.png"}
              alt="Document thumbnail"
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-md"
            />
            <h1 className="text-2xl font-semibold">{documentName || "New Document"}</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
              />
            </div>
            {/* <div className="space-y-2">
              <Card className="rounded-3xl p-4 border-dashed mt-7">
                <h2 className="text-md font-bold mb-4">Document Image</h2>
                <GenerateThumbnail
                  setImage={setImage}
                  setImagePrompt={setImagePrompt}
                  setImageStorageId={setImageStorageId}
                  image={image}
                  imagePrompt={imagePrompt}
                />
              </Card>
            </div> */}
            <div className="flex justify-end pb-5">
              <Button type="submit" size="lg" disabled={isUploading}>
                {id === "new" ? "Create Document" : "Save Changes"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </SidebarInset>
  )
}

