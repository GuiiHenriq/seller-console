export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
};

export type Opportunity = {
  id: string;
  name: string;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  amount?: number;
  accountName: string;
  createdAt: string;
  leadId: string;
};

export type SortDirection = 'asc' | 'desc';

export type FilterState = {
  search: string;
  status: string[];
  sortBy: string;
  sortDirection: SortDirection;
};
