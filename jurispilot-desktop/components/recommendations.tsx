"use client"

import type { AIRecommendation } from "@/types/legal"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileText, Briefcase, Calendar } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from an AI service
const recommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "case",
    priority: "high",
    description: "Review upcoming deadline for Smith v. Johnson case filing",
    relatedItemId: "1",
    dateGenerated: "2024-02-09",
    aiExplanation:
      "The statute of limitations for filing the complaint in the Smith v. Johnson case is approaching. Based on the accident date and applicable law, the deadline is in 10 days. Immediate attention is required to ensure timely filing and protect the client's rights.",
  },
  {
    id: "2",
    type: "document",
    priority: "medium",
    description: "Update settlement agreement for Smith v. Johnson",
    relatedItemId: "2",
    dateGenerated: "2024-02-09",
    aiExplanation:
      "Recent negotiations have resulted in changes to the proposed settlement terms. The current draft needs to be updated to reflect the new agreed-upon compensation amount and additional clauses regarding future medical expenses.",
  },
  {
    id: "3",
    type: "task",
    priority: "high",
    description: "Prepare for TechCorp v. InnovateNow preliminary injunction hearing",
    relatedItemId: "3",
    dateGenerated: "2024-02-10",
    aiExplanation:
      "The preliminary injunction hearing for TechCorp v. InnovateNow is scheduled in 5 days. Based on the complexity of the patent claims and the potential impact on both parties, thorough preparation is crucial. Focus on strengthening arguments for irreparable harm and likelihood of success on the merits.",
  },
]

interface RecommendationsProps {
  limit?: number
}

export function Recommendations({ limit }: RecommendationsProps) {
  const displayedRecommendations = limit ? recommendations.slice(0, limit) : recommendations

  return (
    <div className="space-y-4">
      {displayedRecommendations.map((rec) => (
        <Link
          key={rec.id}
          href={`/${rec.type}s/${rec.relatedItemId}`}
          className="block space-y-2 p-4 rounded-lg hover:bg-muted border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {rec.type === "case" ? (
                <Briefcase className="h-5 w-5 text-muted-foreground" />
              ) : rec.type === "document" ? (
                <FileText className="h-5 w-5 text-muted-foreground" />
              ) : (
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <h3 className="font-medium text-lg">{rec.description}</h3>
            </div>
            <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>{rec.priority}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Generated {new Date(rec.dateGenerated).toLocaleDateString()}</span>
          </div>
          <p className="text-sm mt-2">{rec.aiExplanation}</p>
        </Link>
      ))}
    </div>
  )
}

