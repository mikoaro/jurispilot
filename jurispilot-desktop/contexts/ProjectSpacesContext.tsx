"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

interface ProjectSpace {
  id: string
  name: string
  logo: string
  plan: string
}

interface DocumentAnalysisItem {
  id: string
  title: string
  url: string
  icon?: string
}

interface ProjectSpacesContextType {
  projectSpaces: ProjectSpace[]
  updateProjectSpace: (id: string, updates: Partial<ProjectSpace>) => void
  activeProjectSpace: ProjectSpace | null
  setActiveProjectSpace: (projectSpace: ProjectSpace) => void
  documentAnalysisItems: DocumentAnalysisItem[]
  updateDocumentAnalysisItem: (id: string, updates: Partial<DocumentAnalysisItem>) => void
  addDocumentAnalysisItem: (item: DocumentAnalysisItem) => void
  aiAssistantImage: string
  updateAiAssistantImage: (image: string) => void
  userImage: string
  updateUserImage: (image: string) => void
}

const ProjectSpacesContext = createContext<ProjectSpacesContextType | undefined>(undefined)

export const ProjectSpacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectSpaces, setProjectSpaces] = useState<ProjectSpace[]>([
    { id: "1", name: "Acme Inc", logo: "/project-1.jpg", plan: "Enterprise" },
    { id: "2", name: "Acme Corp.", logo: "/project 2.jpg", plan: "Startup" },
    { id: "3", name: "Evil Corp.", logo: "/project-3.jpg", plan: "Free" },
  ])
  const [activeProjectSpace, setActiveProjectSpace] = useState<ProjectSpace | null>(projectSpaces[0])
  const [documentAnalysisItems, setDocumentAnalysisItems] = useState<DocumentAnalysisItem[]>([
    { id: "1", title: "New Client 1", url: "/import/1", icon: "Folder" },
    { id: "2", title: "New Client 2", url: "/import/2", icon: "Folder" },
  ])
  const [aiAssistantImage, setAiAssistantImage] = useState<string>("/client.png")
  const [userImage, setUserImage] = useState<string>("/user.png")

  const updateProjectSpace = (id: string, updates: Partial<ProjectSpace>) => {
    setProjectSpaces((prevSpaces) => prevSpaces.map((space) => (space.id === id ? { ...space, ...updates } : space)))
    if (activeProjectSpace?.id === id) {
      setActiveProjectSpace((prevActive) => (prevActive ? { ...prevActive, ...updates } : null))
    }
  }

  const updateDocumentAnalysisItem = (id: string, updates: Partial<DocumentAnalysisItem>) => {
    setDocumentAnalysisItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const addDocumentAnalysisItem = (item: DocumentAnalysisItem) => {
    setDocumentAnalysisItems((prevItems) => [...prevItems, item])
  }

  const updateAiAssistantImage = (image: string) => {
    setAiAssistantImage(image)
  }
  const updateUserImage = (image: string) => {
    setUserImage(image)
  }

  return (
    <ProjectSpacesContext.Provider
      value={{
        projectSpaces,
        updateProjectSpace,
        activeProjectSpace,
        setActiveProjectSpace,
        documentAnalysisItems,
        updateDocumentAnalysisItem,
        addDocumentAnalysisItem,
        aiAssistantImage,
        updateAiAssistantImage,
        userImage,
        updateUserImage,
      }}
    >
      {children}
    </ProjectSpacesContext.Provider>
  )
}

export const useProjectSpaces = () => {
  const context = useContext(ProjectSpacesContext)
  if (context === undefined) {
    throw new Error("useProjectSpaces must be used within a ProjectSpacesProvider")
  }
  return context
}
