"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Info, BookOpen, FileText, Scale, PenTool, Upload, X, FileIcon, SendHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"

const actions = [
  {
    title: "Conduct Legal Research",
    icon: BookOpen,
  },
  {
    title: "Summarize Legal Documents",
    icon: FileText,
  },
  {
    title: "Provide Case Analysis",
    icon: Scale,
  },
  {
    title: "Draft Legal Queries",
    icon: PenTool,
  },
]

type FileUpload = {
  id: string
  name: string
  size: number
  progress: number
}

type Message = {
  role: "user" | "assistant"
  content: string
}

export function ProtegeTraining() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to your Legal Research training! Select an action to begin, then ask me anything about that topic.",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [files, setFiles] = useState<FileUpload[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleSend = () => {
    if (input.trim() && selectedAction) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const validTypes = [".pdf", ".doc", ".docx", ".txt"]
      return validTypes.some((type) => file.name.toLowerCase().endsWith(type))
    })

    const newUploads = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newUploads])

    // Simulate upload progress
    newUploads.forEach((upload) => {
      simulateUploadProgress(upload.id)
    })
  }

  const simulateUploadProgress = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
      )
      if (progress >= 100) {
        clearInterval(interval)
        // Add a message when upload is complete
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I've received the document${files.length > 1 ? "s" : ""}. Would you like me to summarize ${files.length > 1 ? "them" : "it"} now?`,
          },
        ])
      }
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Start a conversation</span>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select an action and ask questions to get insights based on your agent&apos;s knowledge.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[700px]">
         
          <ScrollArea className="flex-1 pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {actions.map((action) => (
              <Button
                key={action.title}
                variant={selectedAction === action.title ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center text-center"
                onClick={() => setSelectedAction(action.title)}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <span className="text-xs">{action.title}</span>
              </Button>
            ))}
          </div>

          {selectedAction === "Summarize Legal Documents" && (
            <div className="mb-4">
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-4 transition-colors",
                  isDragging ? "border-primary bg-primary/10" : "border-muted",
                  files.length > 0 && "border-solid",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your legal documents here, or click to select files
                    </p>
                    <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                      Select Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInput}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                        <FileIcon className="h-4 w-4 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          <Progress value={file.progress} className="h-1 mt-1" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(file.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Upload More Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 border p-1 rounded-xl">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedAction ? `Ask about ${selectedAction}...` : "Select an action to start"}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 min-h-32 border-none shadow-none"
              disabled={!selectedAction}
            />
            <Button className="mt-24 bg-white shadow-none" onClick={handleSend} disabled={!selectedAction || !input.trim()}>
              <SendHorizontal className="h-5 w-5 text-black" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}