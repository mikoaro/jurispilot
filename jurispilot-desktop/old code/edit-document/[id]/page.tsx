"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { Separator } from "@radix-ui/react-dropdown-menu"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"
import Image from "next/image"

export default function EditDocumentsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { documentAnalysisItems, updateDocumentAnalysisItem } = useProjectSpaces()
  const [document, setDocument] = useState({ id: "", title: "", url: "", icon: "" })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const doc = documentAnalysisItems.find((item) => item.id === params.id)
    if (doc) {
      setDocument(doc)
      setImagePreview(doc.icon || null)
    }
  }, [params.id, documentAnalysisItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateDocumentAnalysisItem(document.id, { title: document.title, icon: document.icon })
    router.push(document.url)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setDocument((prev) => ({ ...prev, icon: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
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
                <BreadcrumbLink href="#">Document Analysis</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Document</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex h-screen w-full">
        <main className="flex-1 p-8">
          <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={document.title}
                onChange={(e) => setDocument((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Document Icon</Label>
              <Input id="icon" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Document icon preview"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </main>
      </div>
    </SidebarInset>
  )
}

