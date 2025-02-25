"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext"
import Image from "next/image"

export default function SettingsPage() {
  const {
    activeProjectSpace,
    updateProjectSpace,
    aiAssistantImage,
    updateAiAssistantImage,
    userImage,
    updateUserImage,
  } = useProjectSpaces()
  const [projectName, setProjectName] = useState(activeProjectSpace?.name || "")
  const [projectImage, setProjectImage] = useState<string>(activeProjectSpace?.logo || "")
  const [projectImagePrompt, setProjectImagePrompt] = useState<string>("")
  const [projectImageStorageId, setProjectImageStorageId] = useState<string>("")
  const [aiImagePrompt, setAiImagePrompt] = useState<string>("")
  const [aiImageStorageId, setAiImageStorageId] = useState<string>("")
  const [userImagePrompt, setUserImagePrompt] = useState<string>("")
  const [userImageStorageId, setUserImageStorageId] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (activeProjectSpace) {
      setProjectName(activeProjectSpace.name)
      setProjectImage(activeProjectSpace.logo)
    }
  }, [activeProjectSpace])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      if (activeProjectSpace) {
        updateProjectSpace(activeProjectSpace.id, { name: projectName, logo: projectImage })
      }
      updateAiAssistantImage(aiAssistantImage)
      updateUserImage(userImage)
      console.log("Saving changes:", {
        projectName,
        projectImage,
        projectImageStorageId,
        aiAssistantImage,
        aiImageStorageId,
        userImage,
        userImageStorageId,
      })
    } catch (error) {
      console.error("Error saving changes:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <SidebarInset className="flex-1 mt-20">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Project Spaces</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="mb-5 pb-5 flex items-center gap-4 border-b border-dotted">
              <Image
                src={projectImage || "/placeholder.png"}
                alt="Project thumbnail"
                width={100}
                height={100}
                objectFit="cover"
                className="rounded-md"
              />
              <h1 className="text-2xl font-semibold">{projectName || "New Project"}</h1>
            </div>
            <Label htmlFor="projectName">Project Space Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <Card className="rounded-3xl p-4 border-dashed">
            <h2 className="text-md font-bold mb-4">Project Space Image</h2>
            <GenerateThumbnail
              setImage={setProjectImage}
              setImagePrompt={setProjectImagePrompt}
              setImageStorageId={setProjectImageStorageId}
              image={projectImage}
              imagePrompt={projectImagePrompt}
            />
          </Card>

          <div className="flex justify-between gap-5">
            <Card className="rounded-3xl p-4 border-dashed w-full">
              <h2 className="text-md font-bold mb-4">AI Assistant Profile Image</h2>
              <GenerateThumbnail
                setImage={updateAiAssistantImage}
                setImagePrompt={setAiImagePrompt}
                setImageStorageId={setAiImageStorageId}
                image={aiAssistantImage}
                imagePrompt={aiImagePrompt}
              />
            </Card>

            <Card className="rounded-3xl p-4 border-dashed w-full">
              <h2 className="text-md font-bold mb-4">User Profile Image</h2>
              <GenerateThumbnail
                setImage={updateUserImage}
                setImagePrompt={setUserImagePrompt}
                setImageStorageId={setUserImageStorageId}
                image={userImage}
                imagePrompt={userImagePrompt}
              />
            </Card>
          </div>

          <div className="flex justify-end py-5">
            <Button type="submit" size="lg" disabled={isUploading}>
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </SidebarInset>
  )
}

