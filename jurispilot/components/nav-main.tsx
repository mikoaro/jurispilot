"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    icon?: LucideIcon;
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavItem[];
  pathname: string;
}

export function NavMain({ items, pathname }: NavMainProps) {
  const isActive = (url: string) => pathname.startsWith(url);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive(item.url)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isActive(item.url) ? "bg-blue-500 text-white" : ""}
                  >
                    {item.icon && React.createElement(item.icon)}
                    <span>{item.title}</span>
                    {hasSubItems && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={isActive(subItem.url) ? "bg-blue-500 text-white" : ""}
                          >
                            <Link href={subItem.url}>
                              {subItem.icon && React.createElement(subItem.icon)}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
