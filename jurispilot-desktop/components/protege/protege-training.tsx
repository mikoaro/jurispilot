"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Info, BookOpen, FileText, Scale, PenTool, Upload, X, FileIcon, SendHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDropzone } from "react-dropzone"
import { Textarea } from "../ui/textarea"
import { VoiceInput } from "./voice-input"

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

interface FileUpload {
  name: string
  size: number
  type: string
}

type Message = {
  role: "user" | "assistant"
  content: string
}

export function ProtegeTraining({ aiAssistantImage, userImage }: { aiAssistantImage: string; userImage: string }) {
  // const { activeProjectSpace } = useProjectSpaces()
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
  // const [aiAssistantImage, setAiAssistantImage] = useState<string>("/client.png")
  // const [userImage, setUserImage] = useState<string>("/user.png")

  // useEffect(() => {
  //   // Fetch the AI assistant image from your backend or context
  //   // This is a placeholder, replace with actual logic to fetch the image
  //   const fetchAiAssistantImage = async () => {
  //     // const image = await fetchAiAssistantImageFromBackend();
  //     // setAiAssistantImage(image);
  //     setAiAssistantImage("/client.png")
  //   }
  //   fetchAiAssistantImage()

  //   const fetchUserImage = async () => {
  //     // const image = await fetchAiAssistantImageFromBackend();
  //     // setAiAssistantImage(image);
  //     setUserImage("/user.png")
  //   }
  //   fetchUserImage()
  // }, [])

  const handleSend = () => {
    if (input.trim() && selectedAction) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      // Here you would typically send the message to your AI backend
      // and then add the response to the messages
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }))
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f)),
        )
        if (progress >= 100) {
          clearInterval(interval)
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: `File "${file.name}" has been uploaded successfully. Would you like me to summarize it?`,
            },
          ])
        }
      }, 500)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
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
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-4 transition-colors",
                  isDragActive ? "border-primary bg-primary/10" : "border-muted",
                  files.length > 0 && "border-solid",
                )}
              >
                <input {...getInputProps()} />
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your legal documents here, or click to select files
                    </p>
                    <Button variant="outline">Select Files</Button>
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
                    <Button variant="outline" className="w-full mt-2" {...getRootProps()}>
                      Upload More Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.role === "user" ? userImage : aiAssistantImage} />
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

          <div className="flex items-center gap-2 mt-4 border-none p-1 rounded-xl">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedAction ? `Ask about ${selectedAction}...` : "Select an action to start"}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 min-h-32 border shadow-none"
              disabled={!selectedAction}
            />
            <div className="absolute right-4 mr-10 mb-5">
              <VoiceInput onTranscript={handleVoiceInput} />
              <Button
              variant="ghost"
                className="mt-24 ml-3 bg-white shadow-none"
                onClick={handleSend}
                disabled={!selectedAction || !input.trim()}
              >
                <SendHorizontal className="h-5 w-5 text-black" />
              </Button>
            </div>
           
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

