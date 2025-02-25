"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, LinkIcon, FolderIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DocumentExplorerActionsProps {
  document: {
    id: string
    name: string
    type: string
    content?: string
  }
  onDelete: (id: string) => void
  onMove: (id: string, destination: string) => void
}

const FOLDERS = ["Contracts", "Legal Briefs", "Court Documents", "Client Communications", "Evidence"]

export function DocumentExplorerActions({ document, onDelete, onMove }: DocumentExplorerActionsProps) {
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showMoveDialog, setShowMoveDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [shareEmail, setShareEmail] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("")
  const { toast } = useToast()

  const handleView = () => {
    setShowViewDialog(true)
  }

  const handleDownload = useCallback(() => {
    // Only proceed if we're in a browser environment
    if (typeof window === "undefined") {
      console.error("Download is not available in this environment")
      return
    }

    toast({
      title: "Downloading document",
      description: `${document.name} will be downloaded shortly.`,
    })

    // Use requestAnimationFrame to ensure we're in a render cycle
    window.requestAnimationFrame(() => {
      try {
        const dummyContent = document.content || `This is a sample ${document.type} file for ${document.name}`
        const blob = new Blob([dummyContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)

        // Create and configure link element
        const link = window.document.createElement("a")
        link.style.display = "none"
        link.href = url
        link.download = `${document.name}.${document.type.toLowerCase()}`

        // Append, click, and cleanup
        window.document.body.appendChild(link)
        link.click()

        // Delay cleanup to ensure download starts
        setTimeout(() => {
          window.document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          toast({
            title: "Download complete",
            description: `${document.name} has been downloaded successfully.`,
          })
        }, 100)
      } catch (error) {
        console.error("Error during document download:", error)

        toast({
          title: "Download failed",
          description: "There was an error downloading the document. Please try again.",
          variant: "destructive",
        })
      }
    })
  }, [document, toast])

  const handleShare = async () => {
    if (!shareEmail) return

    toast({
      title: "Document shared",
      description: `${document.name} has been shared with ${shareEmail}`,
    })

    setShareEmail("")
    setShowShareDialog(false)
  }

  const handleMove = () => {
    if (!selectedFolder) return

    onMove(document.id, selectedFolder)

    toast({
      title: "Document moved",
      description: `${document.name} has been moved to ${selectedFolder}`,
    })

    setSelectedFolder("")
    setShowMoveDialog(false)
  }

  const handleDelete = async () => {
    onDelete(document.id)

    toast({
      title: "Document deleted",
      description: `${document.name} has been deleted.`,
    })

    setShowDeleteDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowShareDialog(true)}>Share</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowMoveDialog(true)}>Move</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{document.name}</DialogTitle>
          </DialogHeader>
          <div className="min-h-[300px] max-h-[600px] overflow-auto p-4 bg-muted/50 rounded-lg">
            <pre className="whitespace-pre-wrap">
              {document.content || `This is a sample ${document.type} file for ${document.name}`}
            </pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button onClick={handleDownload}>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you want to share this document with.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={!shareEmail}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Document</DialogTitle>
            <DialogDescription>Select the destination folder for this document.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder">Destination Folder</Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  {FOLDERS.map((folder) => (
                    <SelectItem key={folder} value={folder}>
                      <div className="flex items-center gap-2">
                        <FolderIcon className="h-4 w-4" />
                        {folder}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMove} disabled={!selectedFolder}>
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{document.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

