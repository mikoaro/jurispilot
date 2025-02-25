"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, LinkIcon } from "lucide-react"
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


interface DocumentActionsProps {
  document: {
    id: string
    name: string
    type: string
    content?: string
  }
  onDelete: (id: string) => void
}

export function DocumentActions({ document, onDelete }: DocumentActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareEmail, setShareEmail] = useState("")
  const { toast } = useToast()

  const handleDownload = useCallback(() => {
    if (typeof window === "undefined") {
      console.error("Download is not available in this environment")
      return
    }

    toast({
      title: "Downloading document",
      description: `${document.name} will be downloaded shortly.`,
    })

    window.requestAnimationFrame(() => {
      try {
        const dummyContent = document.content || `This is a sample ${document.type} file for ${document.name}`
        const blob = new Blob([dummyContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)

        const link = window.document.createElement("a")
        link.style.display = "none"
        link.href = url
        link.download = `${document.name}.${document.type.toLowerCase()}`

        window.document.body.appendChild(link)
        link.click()

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

  useEffect(() => {
    // This effect runs only on the client-side
    if (typeof window !== "undefined") {
      // The download function is now available
    }
  }, [])

  const handleShare = async () => {
    if (!shareEmail) return

    // In a real application, this would make an API call to share the document
    toast({
      title: "Document shared",
      description: `${document.name} has been shared with ${shareEmail}`,
    })

    setShareEmail("")
    setShowShareDialog(false)
  }

  const handleDelete = async () => {
    // In a real application, this would make an API call to delete the document
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
          <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowShareDialog(true)}>Share</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

