"use client";
import { use } from "react";
import {
  Home,
  PlaySquare,
  Plus,
  Bot,
  InfoIcon,
  SendHorizonal,
  Sparkles,
  FileUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PdfHeader from "@/components/pdf-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// This would typically come from your database
const agreements = [
  {
    id: "1",
    name: "Cloud Seeding Lease.pdf",
    parties:
      "SAN LUIS COUNTY FLOOD CONTROL AND WATER CONSERVATION DISTRICT, CITY OF ARROW",
    documentType: "Other",
    expirationDate: "2029/10/31",
    createdAt: "2023/10/31",
    status: "Active",
    description: "Agreement for cloud seeding operations and related services.",
  },
  {
    id: "2",
    name: "Invoice-Stellar Innovations Group.pdf",
    parties: "-",
    documentType: "Attachment",
    expirationDate: "2024/12/07",
    createdAt: "2023/12/07",
    status: "Pending",
    description:
      "Invoice for consulting services provided by Stellar Innovations Group.",
  },
  {
    id: "3",
    name: "Invoice_NexaTech Solutions.pdf",
    parties: "-",
    documentType: "Attachment",
    expirationDate: "-",
    createdAt: "2023/11/15",
    status: "Draft",
    description:
      "Invoice for software development services by NexaTech Solutions.",
  },
  {
    id: "4",
    name: "MEDICAL RECORDS CUSTODY AGREEMENT.docx",
    parties: "-",
    documentType: "Other",
    expirationDate: "-",
    createdAt: "2023/09/20",
    status: "Under Review",
    description: "Agreement for the custody and management of medical records.",
  },
  {
    id: "5",
    name: "MSA_Horizon Enterprises .pdf",
    parties: "Horizon Enterprises, Tally Inc.",
    documentType: "Msa",
    expirationDate: "2025/02/01",
    createdAt: "2023/02/01",
    status: "Active",
    description:
      "Master Service Agreement with Horizon Enterprises for ongoing services.",
  },
];

interface PageProps {
  params: {
    id: string;
  };
}

export default function importDetailsPage({ params }: PageProps) {
  // Properly unwrap the params Promise using React.use()
  const { id } = use(params);

  const agreement = agreements.find((a) => a.id === id);

  if (!agreement) {
    notFound();
  }

  return (
    <div className="flex h-[95vh] bg-background mt-24 w-full">
        <PdfHeader />
      {/* Sidebar */}
      {/* <div className="w-60 border-r bg-muted/20 p-4 space-y-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
            <Home className="h-5 w-5" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <PlaySquare className="h-5 w-5" />
            Video Tutorials
          </Button>
        </div>
        <Button className="w-full" variant="outline">
          Open File
        </Button>
        <div className="fixed bottom-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center">
              ?
            </span>
            Visit Support Center
          </Button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1">
      <ScrollArea className='flex-1 h-[94vh]'>
      <main className="p-6 bg-slate-200 h-screen mx-auto flex justify-center container">
          
      </main>
      </ScrollArea>
      </div>

      {/* Tabs Section */}    
      <div className="w-[500px] border-l bg-slate-50">
        <Tabs defaultValue="ai-assistant">
          <TabsList className='bg-slate-50 flex justify-between border-b rounded-none'>
            <TabsTrigger value="ai-assistant" className='rounded-none data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-2 px-4'> 
              <span className="font-semibold">AI Assistant</span>
            </TabsTrigger>
            
            <TabsTrigger value="format" className='rounded-none data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-2 px-4'>Format</TabsTrigger>
            <TabsTrigger value="automation" className='rounded-none data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-2 px-4'>Automation</TabsTrigger>
          </TabsList>

          {/* AI Assistant Tab Content */}
          <TabsContent value="ai-assistant" className='p-4 flex flex-col justify-between h-[79vh]'>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Bot size={24} className="mr-2" />
                  <span className="font-semibold mt-2">AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className='bg-white py-2 px-3 flex justify-between gap-3 rounded-md'>
                    <Sparkles className='text-blue-700' />
                  <Badge variant="ghost" className='border-none'>20</Badge>
                  <Button size="icon" variant="ghost" className='bg-blue-500 rounded-sm h-5 w-5'>
                    <Plus className="h-4 w-4 text-white" />
                  </Button>
                  </div>
                  <Button size="icon" variant="ghost">
                  <InfoIcon />
                  </Button>
                </div>
              </div>
 
              <div className="space-y-2 bg-slate-100 m-5 rounded-lg flex justify-center">
                <div className="flex items-center gap-2">
                <Sparkles className='text-blue-700' />
                  <span className="font-medium">Unlock access to AI Assistant.</span>
                  <Button size="lg" variant="Ghost" className='text-orange-400'>
                    Buy Now
                  </Button>
                </div>
              </div>

              <Card className="space-y-4 p-4">
                <p className="text-sm">Hello! I am your AI Assistant, here to assist you with any questions you may have.</p>
                <p className="text-sm text-muted-foreground">I can provide quick answers, guide you to additional information, summarize documents, and much more.</p>
                <Button className="" variant="outline">
                 <FileUp /> Start Now
                </Button>
              </Card>
            </div>
            
            {/* ChatBox */}
            <div>
              <Card>
              <Textarea className='h-[120px]' placeholder='Enter text to start chatting with the AI Assistant or enter "/" to access PDF Commands.' />
              <Button type='icon' className='absolute -mt-10 ml-[410px] bg-white text-gray-400'><SendHorizonal className='h-40 w-40' /></Button>
              </Card>
                <p className='text-center mt-3 text-gray-400'>AI responses serve as references. For more details, please visit Legal Notices</p>
            </div>
          </TabsContent>
          
          {/* Format Tab Content */}
          <TabsContent value="format" className='p-4'>Format Tab</TabsContent>
          {/* Automation Tab Content */}
          <TabsContent value="automation" className='p-4'>Automation Tab</TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
