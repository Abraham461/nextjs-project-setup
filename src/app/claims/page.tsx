'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { mockPolicies, mockClaims, Claim } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function ClaimsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPolicyId = searchParams.get('policy');

  const [claimForm, setClaimForm] = useState({
    policyId: selectedPolicyId || '',
    description: '',
    incidentDate: '',
    estimatedAmount: '',
    documents: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClaimForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClaimForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setClaimForm(prev => ({
      ...prev,
      documents: files
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!claimForm.policyId || !claimForm.description || !claimForm.incidentDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (claimForm.description.length < 10) {
      setError('Please provide a more detailed description (at least 10 characters)');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create FormData for file upload simulation
      const formData = new FormData();
      formData.append('policyId', claimForm.policyId);
      formData.append('description', claimForm.description);
      formData.append('incidentDate', claimForm.incidentDate);
      formData.append('estimatedAmount', claimForm.estimatedAmount);
      
      claimForm.documents.forEach((file, index) => {
        formData.append(`document_${index}`, file);
      });

      // Simulate API call
      const response = await fetch('/api/claims', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setClaimForm({
          policyId: '',
          description: '',
          incidentDate: '',
          estimatedAmount: '',
          documents: []
        });
        // Reset file input
        const fileInput = document.getElementById('documents') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error('Claim submission failed');
      }
    } catch (err) {
      setError('Failed to submit claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Claim['status']) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: Claim['status']) => {
    switch (status) {
      case 'submitted':
        return 25;
      case 'under_review':
        return 50;
      case 'approved':
        return 100;
      case 'rejected':
        return 100;
      default:
        return 0;
    }
  };

  const getStatusSteps = (status: Claim['status']) => {
    const steps = [
      { label: 'Submitted', completed: true },
      { label: 'Under Review', completed: status !== 'submitted' },
      { label: status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Processing', completed: status === 'approved' || status === 'rejected' }
    ];
    return steps;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Claims Management</h1>
              <p className="text-gray-600">Submit and track your insurance claims</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claim Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Claim</CardTitle>
              <CardDescription>
                Provide details about your claim and upload supporting documents
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {submitSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    Claim submitted successfully! You can track its progress below.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="policyId">Select Policy *</Label>
                  <Select 
                    value={claimForm.policyId} 
                    onValueChange={(value) => handleSelectChange('policyId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a policy" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPolicies.map((policy) => (
                        <SelectItem key={policy.id} value={policy.id}>
                          {policy.type} - {policy.policyNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Incident Date *</Label>
                  <Input
                    id="incidentDate"
                    name="incidentDate"
                    type="date"
                    value={claimForm.incidentDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedAmount">Estimated Claim Amount</Label>
                  <Input
                    id="estimatedAmount"
                    name="estimatedAmount"
                    type="number"
                    placeholder="0.00"
                    value={claimForm.estimatedAmount}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description of Incident *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide a detailed description of what happened..."
                    value={claimForm.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Minimum 10 characters. Be as detailed as possible.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documents">Supporting Documents</Label>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-sm text-gray-500">
                    Upload photos, receipts, reports, or other relevant documents (PDF, JPG, PNG, DOC)
                  </p>
                  {claimForm.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected files:</p>
                      <ul className="text-sm text-gray-600">
                        {claimForm.documents.map((file, index) => (
                          <li key={index}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Demo Mode:</strong> All claim submissions are simulated. 
                    Files are not actually uploaded in this demo environment.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Claim...' : 'Submit Claim'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Claims History & Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Claims</CardTitle>
                <CardDescription>
                  Track the status of your submitted claims
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {mockClaims.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No claims submitted yet</p>
                ) : (
                  <div className="space-y-6">
                    {mockClaims.map((claim) => {
                      const policy = mockPolicies.find(p => p.id === claim.policyId);
                      const steps = getStatusSteps(claim.status);
                      
                      return (
                        <div key={claim.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Claim #{claim.id}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {policy?.type} - Submitted {formatDate(claim.submissionDate)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(claim.status)}>
                              {claim.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-700">{claim.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{getStatusProgress(claim.status)}%</span>
                            </div>
                            <Progress value={getStatusProgress(claim.status)} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            {steps.map((step, index) => (
                              <div key={index} className={`text-center ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
                                <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                <span>{step.label}</span>
                              </div>
                            ))}
                          </div>
                          
                          {claim.amount > 0 && (
                            <div className="text-sm">
                              <span className="text-gray-600">Claim Amount: </span>
                              <span className="font-medium">{formatCurrency(claim.amount)}</span>
                            </div>
                          )}
                          
                          {claim.documents.length > 0 && (
                            <div className="text-sm">
                              <span className="text-gray-600">Documents: </span>
                              <span>{claim.documents.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
