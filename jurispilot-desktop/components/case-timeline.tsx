import { Circle } from "lucide-react"

const timeline = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "Client meeting to discuss case details and strategy",
    date: "2024-02-19",
    status: "completed",
  },
  {
    id: 2,
    title: "Document Review",
    description: "AI-assisted analysis of case documents completed",
    date: "2024-02-18",
    status: "completed",
  },
  {
    id: 3,
    title: "Court Filing",
    description: "Preparation of initial court documents",
    date: "2024-02-20",
    status: "pending",
  },
]

export function CaseTimeline() {
  return (
    <div className="space-y-8">
      {timeline.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <Circle className={`h-2 w-2 ${item.status === "completed" ? "fill-primary" : "fill-muted"}`} />
            <div className="flex-1 w-[2px] bg-border" />
          </div>
          <div className="space-y-1 pb-8">
            <div className="flex items-center gap-2">
              <h4 className="font-medium leading-none">{item.title}</h4>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

