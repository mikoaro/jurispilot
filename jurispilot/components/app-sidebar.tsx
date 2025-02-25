"use client"

import type * as React from "react"
import { AudioWaveform, Command, GalleryVerticalEnd, File, FileUp } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  StickyNote,
  Settings,
  ChevronDown,
  FileCodeIcon as FileContract,
  FilePlus2,
  Scale,
  FileSignature,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { usePathname } from "next/navigation"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/user.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Cases",
      url: "/app/cases",
      icon: Briefcase,
      items: [
        {
          title: "All Cases",
          url: "/app/cases",
        },
        {
          title: "Active Cases",
          url: "/app/cases/active",
        },
        {
          title: "Closed Cases",
          url: "/app/cases/closed",
        },
        {
          title: "Pending Cases",
          url: "/app/cases/pending",
        },
      ],
    },
    {
      title: "Documents",
      url: "/app/settings",
      icon: FileText,
      items: [
        {
          title: "All Documents",
          url: "/app/documents",
          icon: FileText,
        },
        {
          title: "Contracts",
          url: "/app/documents/contracts",
          icon: File,
        },
        {
          title: "Briefs",
          url: "/app/documents/briefs",
          icon: FilePlus2,
        },
        {
          title: "Motions",
          url: "/app/documents/motions",
          icon: Scale,
        },
        {
          title: "Transcripts",
          url: "/app/documents/transcripts",
          icon: FileSignature,
        },
      ],
    },
  ],
  navMain2: [
    {
      title: "Dashboard",
      url: "/app",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Notes",
      url: "/app/notes",
      icon: File,
      items: [],
    },
    {
      title: "Settings",
      url: "/app/notes",
      icon: File,
      items: [],
    },
  ],
}

const navigation = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Notes", href: "/app/notes", icon: StickyNote },
  { name: "Settings", href: "/app/settings", icon: Settings },
]

const documentTypes = [
  { name: "All Documents", href: "/app/documents", icon: FileText },
  { name: "Contracts", href: "/app/documents/contracts", icon: FileContract },
  { name: "Briefs", href: "/app/documents/briefs", icon: FilePlus2 },
  { name: "Motions", href: "/app/documents/motions", icon: Scale },
  { name: "Transcripts", href: "/app/documents/transcripts", icon: FileSignature },
  { name: "Document Import", href: "/app/documents/import", icon: FileUp },
]

const caseTypes = [
  { name: "All Cases", href: "/app/cases", icon: Briefcase },
  { name: "Active Cases", href: "/app/cases/active", icon: AlertCircle },
  { name: "Closed Cases", href: "/app/cases/closed", icon: CheckCircle2 },
  { name: "Pending Cases", href: "/app/cases/pending", icon: Clock },
  { name: "Documents", href: "/app/cases/documents", icon: FileText },
]

function NavItem({
  item,
  isNested = false,
}: { item: (typeof navigation)[0] | (typeof documentTypes)[0] | (typeof caseTypes)[0]; isNested?: boolean }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-x-3 rounded-md p-2 text-sm leading-6",
          "hover:bg-accent hover:text-accent-foreground",
          isNested && "pl-11",
          isActive && "bg-blue-500 text-white",
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    </li>
  )
}

function CollapsibleMenu({
  title,
  icon: Icon,
  items,
}: { title: string; icon: typeof FileText; items: typeof documentTypes | typeof caseTypes }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between -mx-2">
          <div className="flex items-center gap-x-3">
            <Icon className="h-5 w-5" />
            <span>{title}</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul role="list" className="mt-1 space-y-1">
          {items.map((item) => (
            <NavItem key={item.name} item={item} isNested />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="mt-[100px] h-[93vh]">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <nav className="flex flex-1 flex-col pt-5 mx-5">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
              <li className="">
                <CollapsibleMenu title="Cases" icon={Briefcase} items={caseTypes} />
              </li>
              <li>
                <CollapsibleMenu title="Documents" icon={FileText} items={documentTypes} />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

