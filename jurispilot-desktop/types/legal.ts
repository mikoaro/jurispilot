export interface LegalDocument {
  id: string;
  title: string;
  type: "contract" | "brief" | "motion" | "transcript" | "other";
  dateCreated: string;
  lastModified: string;
  status: "active" | "archived" | "pending";
  priority: "high" | "medium" | "low";
  tags: string[];
  content: string;
  aiSummary?: string;
  author: string;
  relatedCaseId?: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  status: "active" | "closed" | "pending";
  priority: "high" | "medium" | "low";
  dateOpened: string;
  dateClosed?: string;
  documents: string[]; // Document IDs
  notes: string[]; // Note IDs
  description: string;
  assignedAttorney: string;
  opposingParty?: string;
  judge?: string;
  courtLocation?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  caseId?: string;
  dateCreated: string;
  lastModified: string;
  tags: string[];
  author: string;
}

export interface AIRecommendation {
  id: string;
  type: "case" | "document" | "task";
  priority: "high" | "medium" | "low";
  description: string;
  relatedItemId: string;
  dateGenerated: string;
  aiExplanation: string;
}
