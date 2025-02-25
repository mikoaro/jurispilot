import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const cases = [
  {
    id: "CASE-2024-001",
    title: "Smith vs Johnson",
    type: "Civil Litigation",
    status: "Active",
    client: "John Smith",
    dateOpened: "2024-01-15",
    nextHearing: "2024-03-10",
  },
  {
    id: "CASE-2024-002",
    title: "Tech Corp Merger",
    type: "Corporate",
    status: "Active",
    client: "Tech Corp Inc.",
    dateOpened: "2024-01-20",
    nextHearing: "N/A",
  },
  {
    id: "CASE-2024-003",
    title: "Estate of Williams",
    type: "Probate",
    status: "Pending",
    client: "Sarah Williams",
    dateOpened: "2024-02-01",
    nextHearing: "2024-04-15",
  },
  {
    id: "CASE-2024-004",
    title: "Brown Property Dispute",
    type: "Real Estate",
    status: "Active",
    client: "Michael Brown",
    dateOpened: "2024-02-05",
    nextHearing: "2024-03-20",
  },
  {
    id: "CASE-2024-005",
    title: "Davidson Family Trust",
    type: "Trust & Estate",
    status: "Under Review",
    client: "Davidson Family",
    dateOpened: "2024-02-10",
    nextHearing: "2024-03-30",
  },
]

export function CaseList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Case ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Date Opened</TableHead>
          <TableHead>Next Hearing</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cases.map((case_) => (
          <TableRow key={case_.id}>
            <TableCell>{case_.id}</TableCell>
            <TableCell>{case_.title}</TableCell>
            <TableCell>{case_.type}</TableCell>
            <TableCell>
              <Badge
                variant={case_.status === "Active" ? "default" : case_.status === "Pending" ? "secondary" : "outline"}
              >
                {case_.status}
              </Badge>
            </TableCell>
            <TableCell>{case_.client}</TableCell>
            <TableCell>{case_.dateOpened}</TableCell>
            <TableCell>{case_.nextHearing}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/cases/${case_.id}`}>View Details</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/cases/${case_.id}/edit`}>Edit Case</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/cases/${case_.id}/documents`}>View Documents</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/cases/${case_.id}/timeline`}>Case Timeline</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

