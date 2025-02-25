import React from "react";
import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseList } from "@/components/case-list";
import { DocumentList } from "@/components/document-list";
import { Recommendations } from "@/components/recommendations";

export default function ConsolePage() {
  return (
    // <div className="flex flex-col min-h-screen">
    <SidebarInset className="mt-20">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Console Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5 px-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Active Cases</CardTitle>
            <CardDescription>Your current active cases</CardDescription>
          </CardHeader>
          <CardContent>
            <CaseList limit={5} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Recently modified documents</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentList limit={5} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Suggested actions and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <Recommendations limit={5} />
          </CardContent>
        </Card>
      </div>
      </div>
    </SidebarInset>
  );
}
