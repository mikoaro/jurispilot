"use client";

import type * as React from "react";
import {
  BookOpen,
  Clock,
  FileText,
  Gavel,
  LayoutDashboard,
  Plus,
  Settings,
  StarsIcon,
  FileIcon,
  AudioLines,
  AudioLinesIcon,
  Handshake,
  Scale,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { TeamSwitcher } from "./team-switcher";
import { NavProjects } from "@/components/nav-projects";
import { useProjectSpaces } from "@/contexts/ProjectSpacesContext";
import { ScrollArea } from "./ui/scroll-area";
import { recentCases, recentDocuments } from "@/lib/sample-data";
import { Button } from "./ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "AI Assistant",
      url: "/ai-assistant",
      icon: StarsIcon,
    },
    {
      title: "Cases",
      url: "/cases",
      icon: Gavel,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Research",
      url: "/research",
      icon: BookOpen,
    },
    {
      title: "Agent",
      url: "/agent",
      icon: Handshake,
    },
    {
      title: "Legal AI",
      url: "/ai",
      icon: Scale,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "AI Voice",
      url: "/ai-voice",
      icon: AudioLinesIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { projectSpaces, documentAnalysisItems } = useProjectSpaces();
   const { state } = useSidebar()
  const isExpanded = state === "expanded"

  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url,
  }));

  return (
    <Sidebar collapsible="icon" {...props} className="mt-[93] bg-white">
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/mark.png" alt="logo" width="100" height="40" />
        </Link>
      </SidebarHeader>
      <ScrollArea className="flex-1 flex-col justify-between pb-10">
      <SidebarContent className={`${isExpanded ? "" : "items-center"}`}>
          <div className="flex items-center justify-between px-2 pr-12 border-b">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
              Project Spaces
            </SidebarGroupLabel>
            <button className="rounded-full p-1 bg-black text-white">
              <Plus className="h-3 w-3" />
            </button>
          </div>
           <TeamSwitcher teams={projectSpaces} />
         
          <NavMain items={navMainWithActive} />
          <div className="flex items-center justify-between px-2 pr-12 border-y">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
              Document Analysis
            </SidebarGroupLabel>
            <button className="rounded-full p-1 bg-black text-white">
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <NavProjects items={documentAnalysisItems} />
          <hr />
          {isExpanded && (
          <ScrollArea className="flex-1 px-5 pl-1">
            <div className="space-y-4 py-4">
              <div>
                <div className="text-sm font-medium flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Documents
                </div>
                <div className="space-y-1">
                  {recentDocuments.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      asChild
                    >
                      <Link href={doc.href}>
                        <div className="flex flex-col items-start">
                          <span className="text-xs truncate">
                            {doc.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <FileIcon className="h-3 w-3 mr-1" />
                            {doc.type}
                          </span>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Cases
                </div>
                <div className="space-y-1">
                  {recentCases.map((caseItem) => (
                    <Button
                      key={caseItem.id}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      asChild
                    >
                      <Link href={caseItem.href}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium truncate w-full">
                            {caseItem.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {caseItem.type}
                          </span>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
           )}
        </SidebarContent>
        
        {/* <SidebarRail /> */}
      </ScrollArea>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
