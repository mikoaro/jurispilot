"use client"

import type { LegalDocument } from "@/types/legal"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from an API
const documents: LegalDocument[] = [
  {
    id: "1",
    title: "Initial Complaint - Smith v. Johnson",
    type: "brief",
    dateCreated: "2024-01-15",
    lastModified: "2024-01-15",
    status: "active",
    priority: "high",
    tags: ["litigation", "civil", "personal injury"],
    content: "This is the initial complaint filed in the case of Smith v. Johnson...",
    author: "Jane Doe",
    relatedCaseId: "1",
    aiSummary:
      "Initial complaint detailing the circumstances of the car accident and injuries sustained by the plaintiff, John Smith.",
  },
  {
    id: "2",
    title: "Settlement Agreement Draft - Smith v. Johnson",
    type: "contract",
    dateCreated: "2024-01-20",
    lastModified: "2024-01-22",
    status: "pending",
    priority: "medium",
    tags: ["settlement", "agreement", "draft"],
    content: "SETTLEMENT AGREEMENT AND RELEASE\n\nThis Settlement Agreement and Release...",
    author: "Robert Green",
    relatedCaseId: "1",
    aiSummary:
      "Draft settlement agreement proposing terms for resolving the Smith v. Johnson case, including compensation and release of liability.",
  },
  {
    id: "3",
    title: "Will of Thomas Williams",
    type: "other",
    dateCreated: "2024-01-20",
    lastModified: "2024-01-20",
    status: "active",
    priority: "medium",
    tags: ["will", "estate", "probate"],
    content: "LAST WILL AND TESTAMENT OF THOMAS WILLIAMS\n\nI, Thomas Williams, being of sound mind...",
    author: "Robert Green",
    relatedCaseId: "2",
    aiSummary:
      "Last will and testament of Thomas Williams, detailing the distribution of his estate and appointing executors.",
  },
  {
    id: "4",
    title: "Patent Infringement Claim - TechCorp v. InnovateNow",
    type: "brief",
    dateCreated: "2024-02-01",
    lastModified: "2024-02-03",
    status: "active",
    priority: "high",
    tags: ["intellectual property", "patent", "litigation"],
    content: "COMPLAINT FOR PATENT INFRINGEMENT\n\nPlaintiff TechCorp Inc. hereby alleges...",
    author: "Emily Chen",
    relatedCaseId: "3",
    aiSummary:
      "Detailed complaint outlining TechCorp's allegations of patent infringement against InnovateNow, including specific patent claims and instances of alleged infringement.",
  },
]

interface DocumentListProps {
  limit?: number
}

export function DocumentList({ limit }: DocumentListProps) {
  const displayedDocuments = limit ? documents.slice(0, limit) : documents

  return (
    <div className="space-y-4">
      {displayedDocuments.map((doc) => (
        <Link
          key={doc.id}
          href={`/documents/${doc.id}`}
          className="block space-y-2 p-4 rounded-lg hover:bg-muted border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium text-lg">{doc.title}</h3>
            </div>
            <Badge variant={doc.priority === "high" ? "destructive" : "secondary"}>{doc.priority}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created {new Date(doc.dateCreated).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <User className="h-4 w-4 mr-1" />
            <span>{doc.author}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{doc.type}</span>
          </div>
          <p className="text-sm mt-2">{doc.aiSummary}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {doc.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

