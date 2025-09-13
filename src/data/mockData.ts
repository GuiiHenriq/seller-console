import { Lead, Opportunity } from '../types';

const firstNames = [
  'John',
  'Sarah',
  'Michael',
  'Emma',
  'David',
  'Lisa',
  'Robert',
  'Jennifer',
  'William',
  'Patricia',
  'James',
  'Elizabeth',
  'Richard',
  'Linda',
  'Thomas',
  'Barbara',
  'Charles',
  'Susan',
  'Joseph',
  'Margaret',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Brown',
  'Davis',
  'Wilson',
  'Anderson',
  'Taylor',
  'Martinez',
  'Lee',
  'White',
  'Harris',
  'Clark',
  'Lewis',
  'Walker',
  'Hall',
  'Young',
  'King',
  'Wright',
  'Lopez',
  'Hill',
];

const companies = [
  'Tech Solutions',
  'Digital Systems',
  'Global Innovations',
  'Smart Analytics',
  'Cloud Services',
  'Data Technologies',
  'Security Systems',
  'AI Solutions',
  'Software Corp',
  'Network Systems',
  'Web Platforms',
  'Mobile Tech',
  'Enterprise Solutions',
  'Digital Marketing',
  'IT Consulting',
  'DevOps Solutions',
  'Cloud Computing',
  'Cyber Security',
  'Big Data Corp',
  'IoT Systems',
];

const domains = ['com', 'tech', 'io', 'co', 'net'];

const sources = ['Website', 'LinkedIn', 'Referral', 'Conference', 'Cold Call'] as const;
const statuses = ['new', 'contacted', 'qualified', 'unqualified'] as const;

const generateMockLeads = (count: number): Lead[] => {
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(index / 5) % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const company = companies[index % companies.length];
    const domain = domains[index % domains.length];
    const companySlug = company.toLowerCase().replace(/\s+/g, '');
    const score = 35 + ((index * 17) % 65);
    const status = statuses[index % statuses.length];

    return {
      id: `lead-${index + 1}`,
      name: `${firstName} ${lastName}`,
      company: `${company} ${index % 2 ? 'Inc' : 'Ltd'}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companySlug}.${domain}`,
      source: sources[index % sources.length],
      score,
      status,
    };
  });
};

export const mockLeads: Lead[] = generateMockLeads(100);
export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'Enterprise Solution Deal',
    stage: 'proposal',
    amount: 50000,
    accountName: 'Tech Solutions Inc',
    createdAt: new Date().toISOString(),
    leadId: 'lead-1',
  },
];
