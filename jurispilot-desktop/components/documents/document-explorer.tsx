"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"
import { DocumentExplorerActions } from "./document-explorer-actions"

interface Document {
  id: string
  name: string
  type: string
  size: string
  case: string
  lastModified: string
  status: string
  content?: string
  folder?: string
}

const initialDocuments: Document[] = [
  {
    id: "DOC-001",
    name: "Settlement Agreement - Smith vs Johnson",
    type: "PDF",
    size: "2.4 MB",
    case: "CASE-2024-001",
    lastModified: "2024-02-19",
    status: "Final",
    folder: "Contracts",
    content: `SETTLEMENT AGREEMENT AND RELEASE

This Settlement Agreement and Release (the "Agreement") is made and entered into as of February 19, 2024, by and between John Smith ("Plaintiff") and Johnson Corporation ("Defendant").

1. SETTLEMENT TERMS
The parties agree to the following terms...`,
  },
  {
    id: "DOC-002",
    name: "Due Diligence Report - Tech Corp",
    type: "DOCX",
    size: "1.8 MB",
    case: "CASE-2024-002",
    lastModified: "2024-02-18",
    status: "Draft",
    folder: "Legal Briefs",
  },
  {
    id: "DOC-003",
    name: "Williams Estate - Will",
    type: "PDF",
    size: "3.2 MB",
    case: "CASE-2024-003",
    lastModified: "2024-02-17",
    status: "Final",
    folder: "Court Documents",
  },
  {
    id: "DOC-004",
    name: "Property Survey Report",
    type: "PDF",
    size: "5.6 MB",
    case: "CASE-2024-004",
    lastModified: "2024-02-16",
    status: "Under Review",
    folder: "Evidence",
  },
  {
    id: "DOC-005",
    name: "Trust Agreement - Davidson Family",
    type: "DOCX",
    size: "1.5 MB",
    case: "CASE-2024-005",
    lastModified: "2024-02-15",
    status: "Draft",
    folder: "Contracts",
  },
]

export function DocumentExplorer() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.folder?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (documentId: string) => {
    setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== documentId))
  }

  const handleMove = (documentId: string, destination: string) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) => (doc.id === documentId ? { ...doc, folder: destination } : doc)),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search documents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Case</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Folder</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {doc.name}
              </TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>{doc.case}</TableCell>
              <TableCell>{doc.lastModified}</TableCell>
              <TableCell>{doc.status}</TableCell>
              <TableCell>{doc.folder || "—"}</TableCell>
              <TableCell>
                <DocumentExplorerActions document={doc} onDelete={handleDelete} onMove={handleMove} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

