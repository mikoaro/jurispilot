"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Info, Send, BookOpen, FileText, Scale, PenTool } from "lucide-react"

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

export function ProtegeTraining() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to your Legal Research training! Select an action to begin, then ask me anything about that topic.",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const handleSend = () => {
    if (input.trim() && selectedAction) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      // Here you would typically send the message to your AI backend
      // along with the selectedAction, and then add the response to the messages
    }
  }

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Start a conversation</span>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select an action and ask questions to get insights based on your agent's knowledge.
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
          <div className="flex items-center gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedAction ? `Ask about ${selectedAction}...` : "Select an action to start"}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
              disabled={!selectedAction}
            />
            <Button onClick={handleSend} disabled={!selectedAction || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

