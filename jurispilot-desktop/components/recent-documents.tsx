import { FileText, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const documents = [
  {
    id: 1,
    name: "Smith vs Johnson - Settlement Agreement",
    type: "PDF",
    date: "2024-02-19",
  },
  {
    id: 2,
    name: "Corporate Merger - Due Diligence Report",
    type: "DOCX",
    date: "2024-02-18",
  },
  {
    id: 3,
    name: "Estate Planning - Trust Document",
    type: "PDF",
    date: "2024-02-17",
  },
]

export function RecentDocuments() {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <FileText className="h-6 w-6 text-blue-500" />
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-muted-foreground">
                {doc.type} • {doc.date}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

