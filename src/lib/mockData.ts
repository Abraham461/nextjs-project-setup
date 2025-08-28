export interface Policy {
  id: string;
  type: string;
  coverage: string;
  premium: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired';
  policyNumber: string;
}

export interface Payment {
  id: string;
  policyId: string;
  amount: number;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  receiptUrl: string;
}

export interface Claim {
  id: string;
  policyId: string;
  description: string;
  amount: number;
  submissionDate: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  documents: string[];
}

export const mockPolicies: Policy[] = [
  {
    id: '1',
    type: 'Auto Insurance',
    coverage: 'Comprehensive Coverage',
    premium: 1200,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    policyNumber: 'AUTO-2024-001'
  },
  {
    id: '2',
    type: 'Home Insurance',
    coverage: 'Full Coverage',
    premium: 800,
    startDate: '2024-03-15',
    endDate: '2025-03-14',
    status: 'active',
    policyNumber: 'HOME-2024-002'
  },
  {
    id: '3',
    type: 'Health Insurance',
    coverage: 'Premium Plan',
    premium: 2400,
    startDate: '2023-12-01',
    endDate: '2024-11-30',
    status: 'pending',
    policyNumber: 'HEALTH-2023-003'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    policyId: '1',
    amount: 1200,
    date: '2024-01-01',
    method: 'Credit Card',
    status: 'completed',
    receiptUrl: '/receipts/receipt-1.pdf'
  },
  {
    id: '2',
    policyId: '2',
    amount: 800,
    date: '2024-03-15',
    method: 'Bank Transfer',
    status: 'completed',
    receiptUrl: '/receipts/receipt-2.pdf'
  },
  {
    id: '3',
    policyId: '3',
    amount: 2400,
    date: '2024-11-01',
    method: 'Credit Card',
    status: 'pending',
    receiptUrl: '/receipts/receipt-3.pdf'
  }
];

export const mockClaims: Claim[] = [
  {
    id: '1',
    policyId: '1',
    description: 'Minor fender bender in parking lot',
    amount: 1500,
    submissionDate: '2024-06-15',
    status: 'approved',
    documents: ['accident-report.pdf', 'photos.jpg']
  },
  {
    id: '2',
    policyId: '2',
    description: 'Water damage from burst pipe',
    amount: 3200,
    submissionDate: '2024-08-20',
    status: 'under_review',
    documents: ['damage-photos.jpg', 'repair-estimate.pdf']
  },
  {
    id: '3',
    policyId: '3',
    description: 'Emergency room visit',
    amount: 850,
    submissionDate: '2024-09-10',
    status: 'submitted',
    documents: ['medical-bills.pdf']
  }
];

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, ST 12345'
};

export const faqData = [
  {
    question: 'How do I file a claim?',
    answer: 'You can file a claim by visiting the Claims section in your dashboard. Fill out the claim form with details about the incident and upload any supporting documents or photos.'
  },
  {
    question: 'When is my premium due?',
    answer: 'Premium due dates vary by policy. You can check your specific due dates in the Policy Dashboard or Payment History section.'
  },
  {
    question: 'How can I update my personal information?',
    answer: 'Currently, personal information updates require contacting our customer service team. We are working on adding self-service options in future updates.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers for premium payments.'
  },
  {
    question: 'How long does claim processing take?',
    answer: 'Claim processing typically takes 5-10 business days for simple claims and up to 30 days for complex claims requiring investigation.'
  }
];
