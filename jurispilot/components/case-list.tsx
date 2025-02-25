"use client"

import type { Case } from "@/types/legal"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, User } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from an API
const cases: Case[] = [
  {
    id: "1",
    caseNumber: "2024-001",
    title: "Smith v. Johnson",
    client: "John Smith",
    status: "active",
    priority: "high",
    dateOpened: "2024-01-15",
    documents: ["1", "2"],
    notes: ["1"],
    description: "Personal injury lawsuit following a car accident",
    assignedAttorney: "Jane Doe",
    opposingParty: "David Johnson",
    judge: "Hon. Michael Brown",
    courtLocation: "New York County Supreme Court",
  },
  {
    id: "2",
    caseNumber: "2024-002",
    title: "Estate of Williams",
    client: "Sarah Williams",
    status: "pending",
    priority: "medium",
    dateOpened: "2024-01-20",
    documents: ["3"],
    notes: ["2", "3"],
    description: "Probate proceedings for the estate of Thomas Williams",
    assignedAttorney: "Robert Green",
  },
  {
    id: "3",
    caseNumber: "2024-003",
    title: "TechCorp v. InnovateNow",
    client: "TechCorp Inc.",
    status: "active",
    priority: "high",
    dateOpened: "2024-02-01",
    documents: ["4", "5", "6"],
    notes: ["4", "5"],
    description: "Intellectual property dispute over patent infringement",
    assignedAttorney: "Emily Chen",
    opposingParty: "InnovateNow LLC",
    judge: "Hon. Patricia Lee",
    courtLocation: "U.S. District Court, Northern District of California",
  },
  {
    id: "4",
    caseNumber: "2024-004",
    title: "Green v. City of Metropolis",
    client: "Alice Green",
    status: "closed",
    priority: "low",
    dateOpened: "2023-11-10",
    dateClosed: "2024-02-15",
    documents: ["7", "8"],
    notes: ["6"],
    description: "Civil rights lawsuit against local police department",
    assignedAttorney: "Mark Johnson",
    opposingParty: "City of Metropolis",
    judge: "Hon. Sarah Thompson",
    courtLocation: "U.S. District Court, Eastern District of Metropolis",
  },
]

interface CaseListProps {
  limit?: number
  status?: "active" | "closed" | "pending"
}

export function CaseList({ limit, status }: CaseListProps) {
  const filteredCases = status ? cases.filter((case_) => case_.status === status) : cases

  const displayedCases = limit ? filteredCases.slice(0, limit) : filteredCases

  return (
    <div className="space-y-4">
      {displayedCases.map((case_) => (
        <Link
          key={case_.id}
          href={`/cases/${case_.id}`}
          className="block space-y-2 p-4 rounded-lg hover:bg-muted border"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{case_.title}</h3>
            <Badge variant={case_.priority === "high" ? "destructive" : "secondary"}>{case_.priority}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{case_.caseNumber}</span>
            <span className="mx-2">•</span>
            <User className="h-4 w-4 mr-1" />
            <span>{case_.client}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4 mr-1" />
            <span>Opened {new Date(case_.dateOpened).toLocaleDateString()}</span>
          </div>
          <p className="text-sm mt-2">{case_.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span className="font-semibold mr-2">Assigned:</span>
            <span>{case_.assignedAttorney}</span>
            {case_.opposingParty && (
              <>
                <span className="mx-2">•</span>
                <span className="font-semibold mr-2">Opposing:</span>
                <span>{case_.opposingParty}</span>
              </>
            )}
          </div>
          {case_.judge && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold mr-2">Judge:</span>
              <span>{case_.judge}</span>
            </div>
          )}
          {case_.courtLocation && (
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold mr-2">Court:</span>
              <span>{case_.courtLocation}</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

