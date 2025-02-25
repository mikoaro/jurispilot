"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Sparkles, MessageSquare, UploadCloud } from "lucide-react"

const aiFeatures = [
  {
    title: "Document Analysis",
    description: "AI-powered legal document review and analysis",
    icon: FileText,
  },
  {
    title: "Legal Research",
    description: "Intelligent case law and statute research",
    icon: Sparkles,
  },
  {
    title: "Contract Review",
    description: "Automated contract analysis and risk assessment",
    icon: MessageSquare,
  },
]

export function AIAssistant() {
  const [selectedTask, setSelectedTask] = useState("")

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <Select value={selectedTask} onValueChange={setSelectedTask}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI task" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="document-analysis">Document Analysis</SelectItem>
            <SelectItem value="legal-research">Legal Research</SelectItem>
            <SelectItem value="contract-review">Contract Review</SelectItem>
            <SelectItem value="case-summary">Case Summary</SelectItem>
          </SelectContent>
        </Select>
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Drag and drop files or click to upload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">PDF, DOCX, or TXT files up to 10MB</p>
            </div>
          </CardContent>
        </Card>
        <Textarea
          placeholder="Add specific instructions or requirements for the AI analysis..."
          className="min-h-[100px]"
        />
        <Button className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Start AI Analysis
        </Button>
      </div>
      <div className="space-y-4">
        {aiFeatures.map((feature, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <feature.icon className="h-5 w-5" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

