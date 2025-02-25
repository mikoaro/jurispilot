"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Scale, History } from "lucide-react"

const recentSearches = [
  "Contract breach remedies in California",
  "Precedents for intellectual property disputes",
  "Real estate zoning regulations",
]

const suggestedTopics = ["Employment Law", "Corporate Law", "Intellectual Property", "Real Estate", "Family Law"]

export function ResearchAssistant() {
  const [query, setQuery] = useState("")

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your legal research query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        <Textarea placeholder="Add additional context or specific requirements..." className="min-h-[100px]" />
        <div className="flex gap-2">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Case Law
          </Button>
          <Button variant="outline">
            <Scale className="mr-2 h-4 w-4" />
            Statutes
          </Button>
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            Legal History
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription>Your latest research queries</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentSearches.map((search, i) => (
                <li key={i} className="text-sm cursor-pointer hover:text-primary">
                  {search}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Topics</CardTitle>
            <CardDescription>Popular legal research areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic, i) => (
                <Badge key={i} variant="secondary" className="cursor-pointer">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

