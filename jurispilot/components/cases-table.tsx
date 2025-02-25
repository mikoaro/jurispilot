"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CirclePlus, CloudUpload, Download, Search, Users, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
// import { Card, CardContent } from "@/components/ui/card";

interface Agreement {
  id: string;
  name: string;
  parties: string;
  documentType: "Other" | "Attachment" | "Msa";
  expirationDate: string;
  status: "Completed" | "Pending" | "Declined";
}

const initialAgreements: Agreement[] = [
  {
    id: "1",
    name: "Cloud Seeding Lease.pdf",
    parties:
      "SAN LUIS COUNTY FLOOD CONTROL AND WATER CONSERVATION DISTRICT, CITY OF ARROW",
    documentType: "Other",
    expirationDate: "2029/10/31",
    status:"Completed",
  },
  {
    id: "2",
    name: "Invoice-Stellar Innovations Group.pdf",
    parties: "-",
    documentType: "Attachment",
    expirationDate: "2024/12/07",
    status:"Completed",
  },
  {
    id: "3",
    name: "Invoice_NexaTech Solutions.pdf",
    parties: "-",
    documentType: "Attachment",
    expirationDate: "-",
    status:"Completed",
  },
  {
    id: "4",
    name: "MEDICAL RECORDS CUSTODY AGREEMENT.docx",
    parties: "-",
    documentType: "Other",
    expirationDate: "-",
    status:"Completed",
  },
  {
    id: "5",
    name: "MSA_Horizon Enterprises.pdf",
    parties: "Horizon Enterprises, Tally Inc.",
    documentType: "Msa",
    expirationDate: "2025/02/01",
    status:"Completed",
  },
];

export default function CasesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [agreements, setAgreements] = useState(initialAgreements);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expirationFilter, setExpirationFilter] = useState("All Dates")
  const [documentTypeFilter, setDocumentTypeFilter] = useState("All Types")

  const filteredAgreements = agreements.filter((agreement) => {
    const matchesSearch = agreement.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesExpiration =
      expirationFilter === "All Dates" || agreement.expirationDate.includes(expirationFilter)
    const matchesDocType =
      documentTypeFilter === "All Types" || agreement.documentType === documentTypeFilter
    return matchesSearch && matchesExpiration && matchesDocType
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newAgreement: Agreement = {
        id: (agreements.length + 1).toString(),
        name: selectedFile.name,
        parties: "-",
        documentType: "Other",
        expirationDate: "-",
      };
      setAgreements([...agreements, newAgreement]);
      setModalOpen(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Results from the Documents
          </p>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-600 flex items-center"
          onClick={() => setModalOpen(true)}
        >
          <CirclePlus className="mr-2" />
         Create Case
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">Total Documents</p>
                <h2 className="text-4xl font-semibold mb-2">5</h2>
                <p className="text-sm text-green-600">+20.1% from last month</p>
              </div>
              <Users className="text-gray-400 h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">Average Score</p>
                <h2 className="text-4xl font-semibold mb-2">65.00</h2>
                <p className="text-sm text-green-600">+180.1 basis points from last month</p>
              </div>
              <Activity className="text-gray-400 h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">High Risk Documents</p>
                <h2 className="text-4xl font-semibold mb-2">0</h2>
                <p className="text-sm text-green-600">+2.2% from last month</p>
              </div>
              <AlertTriangle className="text-gray-400 h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      

      {/* File Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[30vw] min-h-[30vh]">
          <div className="flex justify-end mb-4">
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

        <div className="p-14 pt-8 border-dashed border-2 border-gray-300 rounded-xl mx-5">
          <div className="text-black justify-center flex flex-col items-center py-10 font-extrabold">
            <CloudUpload className="size-20 text-blue-800" />
            <h1 className="text-lg text-blue-800">Choose a file</h1>
            
          </div>
            <label className="block border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile ? selectedFile.name : "Choose a file"}
            </label>
            {selectedFile && (
              <Button className="mt-4 w-full bg-blue-500" onClick={handleUpload}>
                Upload 1 file
              </Button>
            )}
          </div>
            </div>
            
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="">
          <Button className="bg-blue-500 text-white">
          <Download /> Export CSV
          </ Button>
        </div>
        <Select value={expirationFilter} onValueChange={setExpirationFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Expiration Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Dates">All Dates</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2029">2029</SelectItem>
          </SelectContent>
        </Select>
        <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Types">All Types</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Attachment">Attachment</SelectItem>
            <SelectItem value="Msa">MSA</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="text-primary">
          Refresh
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">NAME</TableHead>
              <TableHead className="font-medium">PARTIES</TableHead>
              <TableHead className="font-medium">DOCUMENT TYPE</TableHead>
              <TableHead className="font-medium">EXPIRATION DATE</TableHead>
              <TableHead className="w-[100px]">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgreements.map((agreement) => (
              <TableRow key={agreement.id}>
                <TableCell className="font-medium">{agreement.name}</TableCell>
                <TableCell>{agreement.parties}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      agreement.documentType === "Msa"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {agreement.documentType}
                  </Badge>
                </TableCell>
                <TableCell>{agreement.expirationDate}</TableCell>
                <TableCell>
                <Badge
                    variant="secondary"
                    className={
                      agreement.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-orage-100 text-orange-800"
                    }
                  >
                    {agreement.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 5 of 5</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
