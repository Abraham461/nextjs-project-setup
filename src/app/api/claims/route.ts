import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const policyId = formData.get('policyId') as string;
    const description = formData.get('description') as string;
    const incidentDate = formData.get('incidentDate') as string;
    const estimatedAmount = formData.get('estimatedAmount') as string;
    
    // Validate required fields
    if (!policyId || !description || !incidentDate) {
      return NextResponse.json(
        { error: 'Missing required fields: policyId, description, and incidentDate are required' },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate incident date
    const incidentDateTime = new Date(incidentDate);
    const today = new Date();
    if (incidentDateTime > today) {
      return NextResponse.json(
        { error: 'Incident date cannot be in the future' },
        { status: 400 }
      );
    }

    // Process uploaded files
    const uploadedFiles: string[] = [];
    const entries = Array.from(formData.entries());
    
    for (const [key, value] of entries) {
      if (key.startsWith('document_') && value instanceof File) {
        // In a real application, you would upload to cloud storage
        // For demo, we just store the filename
        uploadedFiles.push(value.name);
      }
    }

    // Validate estimated amount if provided
    let claimAmount = 0;
    if (estimatedAmount) {
      claimAmount = parseFloat(estimatedAmount);
      if (isNaN(claimAmount) || claimAmount < 0) {
        return NextResponse.json(
          { error: 'Invalid estimated amount' },
          { status: 400 }
        );
      }
    }

    // Simulate claim processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock claim response
    const claimResponse = {
      success: true,
      claimId: `CLM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      claimNumber: `CLM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      policyId: policyId,
      status: 'submitted',
      description: description,
      incidentDate: incidentDate,
      estimatedAmount: claimAmount,
      submissionDate: new Date().toISOString(),
      documents: uploadedFiles,
      nextSteps: [
        'Your claim has been received and assigned a claim number',
        'Our claims adjuster will review your submission within 2-3 business days',
        'You will receive an email update when the status changes',
        'Additional documentation may be requested if needed'
      ],
      estimatedProcessingTime: '5-10 business days',
      contactInfo: {
        claimsHotline: '1-800-CLAIMS',
        email: 'claims@secureinsure.com'
      },
      message: 'Claim submitted successfully'
    };

    return NextResponse.json(claimResponse, { status: 201 });

  } catch (error) {
    console.error('Claims processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error during claim submission' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This could be used to fetch claim status or claim history
  return NextResponse.json(
    { 
      message: 'Claims API endpoint. Use POST to submit new claims.',
      endpoints: {
        'POST /api/claims': 'Submit a new claim',
        'GET /api/claims': 'Get claim information (not implemented in demo)'
      }
    },
    { status: 200 }
  );
}
